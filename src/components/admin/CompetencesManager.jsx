import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  CREATE_COMPETENCE,
  UPDATE_COMPETENCE,
  DELETE_COMPETENCE,
} from "../../api/mutations";

const CompetencesManager = ({ competences = [], onRefetch }) => {
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    nom: "",
    niveau: 1,
    categorie: "",
    icone: "",
  });

  const [createCompetence] = useMutation(CREATE_COMPETENCE, {
    onCompleted: () => onRefetch(),
  });
  const [updateCompetence] = useMutation(UPDATE_COMPETENCE, {
    onCompleted: () => onRefetch(),
  });
  const [deleteCompetence] = useMutation(DELETE_COMPETENCE, {
    onCompleted: () => onRefetch(),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateCompetence({
          variables: { id: editId, input: formData },
        });
        setEditId(null);
      } else {
        await createCompetence({
          variables: { input: formData },
        });
      }
      setFormData({ nom: "", niveau: 1, categorie: "", icone: "" });
      setShowForm(false);
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur: " + error.message);
    }
  };

  const handleEdit = (comp) => {
    setEditId(comp.id);
    setFormData({
      nom: comp.nom,
      niveau: comp.niveau,
      categorie: comp.categorie,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (
      window.confirm("Êtes-vous sûr de vouloir supprimer cette compétence ?")
    ) {
      try {
        await deleteCompetence({ variables: { id } });
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
          💡 Gérer Compétences
        </h2>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditId(null);
            setFormData({ nom: "", niveau: 1, categorie: "" });
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700"
        >
          {showForm ? "Annuler" : "+ Ajouter"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-6 p-4 bg-gray-50 rounded-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Nom"
              value={formData.nom}
              onChange={(e) =>
                setFormData({ ...formData, nom: e.target.value })
              }
              required
              className="border rounded px-3 py-2"
            />
            <select
              value={formData.niveau}
              onChange={(e) =>
                setFormData({ ...formData, niveau: parseInt(e.target.value) })
              }
              className="border rounded px-3 py-2"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  Niveau {n}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Catégorie"
              value={formData.categorie}
              onChange={(e) =>
                setFormData({ ...formData, categorie: e.target.value })
              }
              className="border rounded px-3 py-2"
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded font-semibold hover:bg-green-700"
          >
            {editId ? "Mettre à jour" : "Créer"}
          </button>
        </form>
      )}

      <div className="space-y-2">
        {competences.length > 0 ? (
          competences.map((comp) => (
            <div
              key={comp.id}
              className="flex justify-between items-center bg-gray-50 p-4 rounded"
            >
              <div>
                <h3 className="font-semibold">{comp.nom}</h3>
                <p className="text-sm text-gray-600">
                  Niveau {comp.niveau} • {comp.categorie}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(comp)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Éditer
                </button>
                <button
                  onClick={() => handleDelete(comp.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">Aucune compétence</p>
        )}
      </div>
    </div>
  );
};

export default CompetencesManager;
