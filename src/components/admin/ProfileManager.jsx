import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_PROFIL } from "../../api/mutations";
import { GET_USER_PROFILE } from "../../api/queries";

const ProfileManager = ({ profil, onRefetch }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    titre: "",
    bio: "",
    email: "",
    telephone: "",
    localisation: "",
    photo: "",
  });

  useEffect(() => {
    if (profil) {
      setFormData({
        nom: profil.nom || "",
        prenom: profil.prenom || "",
        titre: profil.titre || "",
        bio: profil.bio || "",
        email: profil.email || "",
        telephone: profil.telephone || "",
        localisation: profil.localisation || "",
        photo: profil.photo || "",
      });
    }
  }, [profil]);

  const [updateProfil] = useMutation(UPDATE_PROFIL, {
    refetchQueries: [{ query: GET_USER_PROFILE }],
    awaitRefetchQueries: true,
    onCompleted: () => {
      onRefetch();
      setShowForm(false);
      alert("Profil mis à jour avec succès!");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const input = {
        nom: formData.nom,
        prenom: formData.prenom,
        titre: formData.titre,
        bio: formData.bio,
        email: formData.email,
        telephone: formData.telephone || null,
        localisation: formData.localisation || null,
        photo: formData.photo || null,
      };

      await updateProfil({
        variables: { input },
      });
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur: " + error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">👤 Modifier Profil</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-gray-900 text-white px-4 py-2 rounded font-semibold hover:bg-black transition"
        >
          {showForm ? "Annuler" : "✏️ Éditer"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-6 p-6 bg-pink-50 rounded-lg space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Prénom
              </label>
              <input
                type="text"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-pink-400"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nom
              </label>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-pink-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Titre / Profession
            </label>
            <input
              type="text"
              name="titre"
              value={formData.titre}
              onChange={handleChange}
              placeholder="ex: Développeur Full Stack"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-pink-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="4"
              placeholder="Décrivez-vous..."
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-pink-400"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-pink-400"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Téléphone
              </label>
              <input
                type="tel"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-pink-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Localisation
            </label>
            <input
              type="text"
              name="localisation"
              value={formData.localisation}
              onChange={handleChange}
              placeholder="ex: Paris, France"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-pink-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              URL Photo de Profil
            </label>
            <input
              type="url"
              name="photo"
              value={formData.photo}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-pink-400"
            />
            {formData.photo && (
              <img
                src={formData.photo}
                alt="Aperçu"
                className="mt-2 w-24 h-24 rounded-full object-cover border-2 border-pink-400"
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-pink-400 text-white px-4 py-3 rounded font-semibold hover:bg-pink-500 transition"
          >
            Enregistrer les modifications
          </button>
        </form>
      )}

      {!showForm && profil && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex flex-col md:flex-row gap-6">
            {profil.photo && (
              <img
                src={profil.photo}
                alt={profil.prenom}
                className="w-24 h-24 rounded-full object-cover border-2 border-pink-400"
              />
            )}
            <div className="flex-1">
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Nom:</span> {profil.prenom}{" "}
                {profil.nom}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Titre:</span> {profil.titre}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Email:</span> {profil.email}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Téléphone:</span>{" "}
                {profil.telephone || "N/A"}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Localisation:</span>{" "}
                {profil.localisation || "N/A"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileManager;
