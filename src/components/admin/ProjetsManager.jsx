import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  CREATE_PROJET,
  UPDATE_PROJET,
  DELETE_PROJET,
} from "../../api/mutations";

const ProjetsManager = ({ projets = [], onRefetch }) => {
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    titre: "",
    description: "",
    image: "",
    lienDemo: "",
    lienGithub: "",
    technologies: "",
    dateDebut: "",
    dateFin: "",
    competences: [],
  });

  const [createProjet] = useMutation(CREATE_PROJET, {
    onCompleted: () => onRefetch(),
  });
  const [updateProjet] = useMutation(UPDATE_PROJET, {
    onCompleted: () => onRefetch(),
  });
  const [deleteProjet] = useMutation(DELETE_PROJET, {
    onCompleted: () => onRefetch(),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Parse technologies string into array
      const technologiesArray = formData.technologies
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      const input = {
        titre: formData.titre,
        description: formData.description,
        technologies: technologiesArray,
        dateDebut: formData.dateDebut,
        image: formData.image || null,
        lienDemo: formData.lienDemo || null,
        lienGithub: formData.lienGithub || null,
        dateFin: formData.dateFin || null,
        competences: formData.competences || [],
      };

      if (editId) {
        await updateProjet({
          variables: { id: editId, input },
        });
        setEditId(null);
      } else {
        await createProjet({
          variables: { input },
        });
      }
      setFormData({
        titre: "",
        description: "",
        image: "",
        lienDemo: "",
        lienGithub: "",
        technologies: "",
        dateDebut: "",
        dateFin: "",
        competences: [],
      });
      setShowForm(false);
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur: " + error.message);
    }
  };

  const handleEdit = (proj) => {
    setEditId(proj.id);
    setFormData({
      titre: proj.titre,
      description: proj.description,
      image: proj.image || "",
      lienDemo: proj.lienDemo || "",
      lienGithub: proj.lienGithub || "",
      technologies: Array.isArray(proj.technologies)
        ? proj.technologies.join(", ")
        : "",
      dateDebut: proj.dateDebut,
      dateFin: proj.dateFin || "",
      competences: proj.competences?.map((c) => c.id) || [],
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) {
      try {
        await deleteProjet({ variables: { id } });
      } catch (error) {
        console.error("Erreur de suppression:", error);
        alert("Erreur: " + error.message);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">🚀 Gérer Projets</h2>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditId(null);
            setFormData({
              titre: "",
              description: "",
              image: "",
              lienDemo: "",
              lienGithub: "",
              technologies: "",
              dateDebut: "",
              dateFin: "",
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
          <input
            type="text"
            placeholder="Titre du projet"
            value={formData.titre}
            onChange={(e) =>
              setFormData({ ...formData, titre: e.target.value })
            }
            required
            className="w-full border rounded px-3 py-2"
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows="3"
            className="w-full border rounded px-3 py-2"
            required
          />
          <input
            type="text"
            placeholder="Technologies (ex: React, Node.js, GraphQL)"
            value={formData.technologies}
            onChange={(e) =>
              setFormData({ ...formData, technologies: e.target.value })
            }
            className="w-full border rounded px-3 py-2"
            required
          />
          <input
            type="url"
            placeholder="Lien démo (https://...)"
            value={formData.lienDemo}
            onChange={(e) =>
              setFormData({ ...formData, lienDemo: e.target.value })
            }
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="url"
            placeholder="Lien GitHub (https://...)"
            value={formData.lienGithub}
            onChange={(e) =>
              setFormData({ ...formData, lienGithub: e.target.value })
            }
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="url"
            placeholder="URL Image"
            value={formData.image}
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.value })
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
              className="border rounded px-3 py-2"
              required
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
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded font-semibold hover:bg-green-700"
          >
            {editId ? "Mettre à jour" : "Créer"}
          </button>
        </form>
      )}

      <div className="space-y-2">
        {projets.length > 0 ? (
          projets.map((proj) => (
            <div
              key={proj.id}
              className="flex justify-between items-center bg-gray-50 p-4 rounded"
            >
              <div className="flex-1">
                <h3 className="font-semibold">{proj.titre}</h3>
                <p className="text-sm text-gray-600">{proj.description}</p>
                {proj.lien && (
                  <a
                    href={proj.lien}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Voir le projet
                  </a>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(proj)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Éditer
                </button>
                <button
                  onClick={() => handleDelete(proj.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">Aucun projet</p>
        )}
      </div>
    </div>
  );
};

export default ProjetsManager;
