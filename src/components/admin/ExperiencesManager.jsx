import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  CREATE_EXPERIENCE,
  UPDATE_EXPERIENCE,
  DELETE_EXPERIENCE,
} from "../../api/mutations";

const ExperiencesManager = ({ experiences = [], onRefetch }) => {
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    poste: "",
    entreprise: "",
    description: "",
    localisation: "",
    dateDebut: "",
    dateFin: "",
    enCours: false,
    competences: [],
  });

  const [createExperience] = useMutation(CREATE_EXPERIENCE, {
    onCompleted: () => onRefetch(),
  });
  const [updateExperience] = useMutation(UPDATE_EXPERIENCE, {
    onCompleted: () => onRefetch(),
  });
  const [deleteExperience] = useMutation(DELETE_EXPERIENCE, {
    onCompleted: () => onRefetch(),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const input = {
        poste: formData.poste,
        entreprise: formData.entreprise,
        description: formData.description,
        dateDebut: formData.dateDebut,
        dateFin: formData.dateFin || null,
        enCours: formData.enCours,
        localisation: formData.localisation || null,
        competences: formData.competences || [],
      };

      if (editId) {
        await updateExperience({
          variables: { id: editId, input },
        });
        setEditId(null);
      } else {
        await createExperience({
          variables: { input },
        });
      }
      setFormData({
        poste: "",
        entreprise: "",
        description: "",
        localisation: "",
        dateDebut: "",
        dateFin: "",
        enCours: false,
        competences: [],
      });
      setShowForm(false);
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur: " + error.message);
    }
  };

  const handleEdit = (exp) => {
    setEditId(exp.id);
    setFormData({
      poste: exp.poste,
      entreprise: exp.entreprise,
      description: exp.description || "",
      localisation: exp.localisation || "",
      dateDebut: exp.dateDebut,
      dateFin: exp.dateFin || "",
      enCours: exp.enCours || false,
      competences: exp.competences?.map((c) => c.id) || [],
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (
      window.confirm("Êtes-vous sûr de vouloir supprimer cette expérience ?")
    ) {
      try {
        await deleteExperience({ variables: { id } });
      } catch (error) {
        console.error("Erreur de suppression:", error);
        alert("Erreur: " + error.message);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          💼 Gérer Expériences
        </h2>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditId(null);
            setFormData({
              poste: "",
              entreprise: "",
              description: "",
              localisation: "",
              dateDebut: "",
              dateFin: "",
              enCours: false,
              competences: [],
            });
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700"
        >
          {showForm ? "Annuler" : "+ Ajouter"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-6 p-4 bg-gray-50 rounded-lg space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Poste"
              value={formData.poste}
              onChange={(e) =>
                setFormData({ ...formData, poste: e.target.value })
              }
              required
              className="border rounded px-3 py-2"
            />
            <input
              type="text"
              placeholder="Entreprise"
              value={formData.entreprise}
              onChange={(e) =>
                setFormData({ ...formData, entreprise: e.target.value })
              }
              required
              className="border rounded px-3 py-2"
            />
          </div>
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows="3"
            required
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="Localisation"
            value={formData.localisation}
            onChange={(e) =>
              setFormData({ ...formData, localisation: e.target.value })
            }
            className="w-full border rounded px-3 py-2"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              value={formData.dateDebut}
              onChange={(e) =>
                setFormData({ ...formData, dateDebut: e.target.value })
              }
              required
              className="border rounded px-3 py-2"
            />
            <input
              type="date"
              value={formData.dateFin}
              onChange={(e) =>
                setFormData({ ...formData, dateFin: e.target.value })
              }
              className="border rounded px-3 py-2"
            />
          </div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.enCours}
              onChange={(e) =>
                setFormData({ ...formData, enCours: e.target.checked })
              }
              className="w-4 h-4"
            />
            <span>Actuellement en cours</span>
          </label>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded font-semibold hover:bg-green-700"
          >
            {editId ? "Mettre à jour" : "Créer"}
          </button>
        </form>
      )}

      <div className="space-y-2">
        {experiences.length > 0 ? (
          experiences.map((exp) => (
            <div
              key={exp.id}
              className="flex justify-between items-center bg-gray-50 p-4 rounded"
            >
              <div className="flex-1">
                <h3 className="font-semibold">{exp.titre}</h3>
                <p className="text-sm font-medium text-gray-700">
                  {exp.entreprise}
                </p>
                <p className="text-sm text-gray-600">{exp.description}</p>
                <p className="text-sm text-gray-500">
                  {exp.dateDebut} - {exp.dateFin || "Actuel"}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(exp)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Éditer
                </button>
                <button
                  onClick={() => handleDelete(exp.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">Aucune expérience</p>
        )}
      </div>
    </div>
  );
};

export default ExperiencesManager;
