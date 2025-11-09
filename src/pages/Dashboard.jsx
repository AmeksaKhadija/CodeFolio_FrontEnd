import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_USER_PROFILE,
  GET_COMPETENCES,
  GET_PROJETS,
  GET_EXPERIENCES,
} from "../api/queries";
import { useAuth } from "../hooks/useAuth";
import ProfileManager from "../components/admin/ProfileManager";
import CompetencesManager from "../components/admin/CompetencesManager";
import ProjetsManager from "../components/admin/ProjetsManager";
import ExperiencesManager from "../components/admin/ExperiencesManager";
import {
  DELETE_COMPETENCE,
  DELETE_PROJET,
  DELETE_EXPERIENCE,
} from "../api/mutations";

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("view");

  const {
    loading: loadingProfil,
    error: errorProfil,
    data: dataProfil,
  } = useQuery(GET_USER_PROFILE, { fetchPolicy: "network-only" });
  const { data: dataCompetences, refetch: refetchCompetences } = useQuery(
    GET_COMPETENCES,
    { fetchPolicy: "network-only" }
  );
  const { data: dataProjets, refetch: refetchProjets } = useQuery(GET_PROJETS, {
    fetchPolicy: "network-only",
  });
  const { data: dataExperiences, refetch: refetchExperiences } = useQuery(
    GET_EXPERIENCES,
    { fetchPolicy: "network-only" }
  );

  const refetch = () => {
    refetchCompetences();
    refetchProjets();
    refetchExperiences();
  };

  const [deleteCompetence] = useMutation(DELETE_COMPETENCE, {
    onCompleted: () => refetch(),
  });
  const [deleteProjet] = useMutation(DELETE_PROJET, {
    onCompleted: () => refetch(),
  });
  const [deleteExperience] = useMutation(DELETE_EXPERIENCE, {
    onCompleted: () => refetch(),
  });

  if (loadingProfil) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (errorProfil) {
    console.error("GraphQLError details:", {
      message: errorProfil.message,
      graphQLErrors: errorProfil.graphQLErrors,
      networkError: errorProfil.networkError,
    });
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Erreur</h2>
          <p className="text-gray-700">{errorProfil.message}</p>
        </div>
      </div>
    );
  }

  const profil = dataProfil?.getProfil || {};
  const competences = dataCompetences?.getCompetences || [];
  const projets = dataProjets?.getProjets || [];
  const experiences = dataExperiences?.getExperiences || [];

  const displayName =
    `${profil.prenom || ""} ${profil.nom || ""}`.trim() || "Utilisateur";

  const handleDeleteCompetence = async (id) => {
    if (
      window.confirm("Êtes-vous sûr de vouloir supprimer cette compétence ?")
    ) {
      try {
        await deleteCompetence({ variables: { id } });
      } catch (err) {
        console.error("Erreur de suppression:", err);
        alert("Erreur: " + err.message);
      }
    }
  };

  const handleDeleteProjet = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) {
      try {
        await deleteProjet({ variables: { id } });
      } catch (err) {
        console.error("Erreur de suppression:", err);
        alert("Erreur: " + err.message);
      }
    }
  };

  const handleDeleteExperience = async (id) => {
    if (
      window.confirm("Êtes-vous sûr de vouloir supprimer cette expérience ?")
    ) {
      try {
        await deleteExperience({ variables: { id } });
      } catch (err) {
        console.error("Erreur de suppression:", err);
        alert("Erreur: " + err.message);
      }
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Profil */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-start gap-6 mb-6">
            {profil.photo ? (
              <img
                src={profil.photo}
                alt={displayName}
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-3xl font-bold">
                {profil.prenom?.[0]}
                {profil.nom?.[0]}
              </div>
            )}
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                {displayName}
              </h1>
              <p className="text-xl text-blue-600 font-semibold mb-3">
                {profil.titre}
              </p>
              <p className="text-gray-600 text-lg mb-4">{profil.bio}</p>
              <div className="flex gap-4 flex-wrap mb-3">
                {profil.email && (
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600 font-semibold">Email:</span>
                    <a
                      href={`mailto:${profil.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {profil.email}
                    </a>
                  </div>
                )}
                {profil.telephone && (
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600 font-semibold">Tél:</span>
                    <a
                      href={`tel:${profil.telephone}`}
                      className="text-blue-600 hover:underline"
                    >
                      {profil.telephone}
                    </a>
                  </div>
                )}
              </div>
              {profil.localisation && (
                <p className="text-gray-600 mb-3">📍 {profil.localisation}</p>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="border-t pt-6 flex gap-4 flex-wrap">
            <button
              onClick={() => setActiveTab("profil")}
              className={`px-4 py-2 rounded font-semibold transition ${
                activeTab === "profil"
                  ? "bg-gray-900 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              👤 Profil
            </button>
            <button
              onClick={() => setActiveTab("view")}
              className={`px-4 py-2 rounded font-semibold transition ${
                activeTab === "view"
                  ? "bg-gray-900 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              📊 Aperçu
            </button>
            <button
              onClick={() => setActiveTab("competences")}
              className={`px-4 py-2 rounded font-semibold transition ${
                activeTab === "competences"
                  ? "bg-gray-900 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              💡 Compétences
            </button>
            <button
              onClick={() => setActiveTab("projets")}
              className={`px-4 py-2 rounded font-semibold transition ${
                activeTab === "projets"
                  ? "bg-gray-900 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              🚀 Projets
            </button>
            <button
              onClick={() => setActiveTab("experiences")}
              className={`px-4 py-2 rounded font-semibold transition ${
                activeTab === "experiences"
                  ? "bg-gray-900 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              💼 Expériences
            </button>
          </div>
        </div>

        {/* Contenu des tabs */}
        {activeTab === "profil" && (
          <ProfileManager
            profil={profil}
            onRefetch={() => {
              refetchCompetences();
              refetchProjets();
              refetchExperiences();
            }}
          />
        )}

        {activeTab === "view" && (
          <div className="space-y-8">
            {/* Compétences */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                💡 Compétences ({competences.length})
              </h2>
              {competences.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {competences.map((comp) => (
                    <div
                      key={comp.id}
                      className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-800">
                          {comp.nom}
                        </h3>
                        <button
                          onClick={() => handleDeleteCompetence(comp.id)}
                          className="text-red-600 hover:text-red-800 text-sm font-bold"
                        >
                          ✕
                        </button>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="bg-blue-200 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                          Niveau {comp.niveau}
                        </span>
                        <span className="text-xs text-gray-600">
                          {comp.categorie}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  Aucune compétence
                </p>
              )}
            </div>

            {/* Expériences */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                💼 Expériences ({experiences.length})
              </h2>
              {experiences.length > 0 ? (
                <div className="space-y-4">
                  {experiences.map((exp) => (
                    <div
                      key={exp.id}
                      className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border-l-4 border-green-500"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold text-gray-800">
                            {exp.poste}
                          </h3>
                          <p className="text-green-700 font-semibold">
                            {exp.entreprise}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDeleteExperience(exp.id)}
                          className="text-red-600 hover:text-red-800 font-bold"
                        >
                          ✕
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {exp.dateDebut} - {exp.dateFin || "Actuel"}
                      </p>
                      {exp.description && (
                        <p className="text-gray-700 text-sm">
                          {exp.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  Aucune expérience
                </p>
              )}
            </div>

            {/* Projets */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                🚀 Projets ({projets.length})
              </h2>
              {projets.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projets.map((projet) => (
                    <div
                      key={projet.id}
                      className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
                    >
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-gray-800">
                            {projet.titre}
                          </h3>
                          <button
                            onClick={() => handleDeleteProjet(projet.id)}
                            className="text-red-600 hover:text-red-800 font-bold"
                          >
                            ✕
                          </button>
                        </div>
                        <p className="text-gray-700 text-sm mb-3">
                          {projet.description}
                        </p>
                        <p className="text-xs text-gray-600">
                          {projet.dateDebut} - {projet.dateFin || "Actuel"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">Aucun projet</p>
              )}
            </div>
          </div>
        )}

        {activeTab === "competences" && (
          <CompetencesManager competences={competences} onRefetch={refetch} />
        )}
        {activeTab === "projets" && (
          <ProjetsManager projets={projets} onRefetch={refetch} />
        )}
        {activeTab === "experiences" && (
          <ExperiencesManager experiences={experiences} onRefetch={refetch} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
