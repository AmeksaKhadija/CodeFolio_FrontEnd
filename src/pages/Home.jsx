import React from "react";
import { useQuery } from "@apollo/client";
import {
  GET_USER_PROFILE,
  GET_COMPETENCES,
  GET_PROJETS,
  GET_EXPERIENCES,
} from "../api/queries";

const Home = () => {
  const {
    loading: loadingProfil,
    error: errorProfil,
    data: dataProfil,
  } = useQuery(GET_USER_PROFILE);
  const { data: dataCompetences } = useQuery(GET_COMPETENCES);
  const { data: dataProjets } = useQuery(GET_PROJETS);
  const { data: dataExperiences } = useQuery(GET_EXPERIENCES);

  if (loadingProfil) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Chargement du profil...</p>
        </div>
      </div>
    );
  }

  if (errorProfil) {
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

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section - Profil */}
        <div className="bg-gradient-to-r from-gray-900 to-black rounded-lg shadow-2xl p-8 mb-12 text-white">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {profil.photo && (
              <img
                src={profil.photo}
                alt={profil.prenom}
                className="w-32 h-32 rounded-full object-cover border-4 border-pink-300"
              />
            )}
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">
                {profil.prenom} {profil.nom}
              </h1>
              <p className="text-2xl text-pink-300 mb-4">{profil.titre}</p>
              <p className="text-gray-300 mb-4">{profil.bio}</p>
              <div className="flex flex-wrap gap-4 text-gray-400">
                {profil.email && (
                  <div className="flex items-center gap-2">
                    <span>📧</span>
                    <a
                      href={`mailto:${profil.email}`}
                      className="hover:text-pink-300 transition"
                    >
                      {profil.email}
                    </a>
                  </div>
                )}
                {profil.telephone && (
                  <div className="flex items-center gap-2">
                    <span>📱</span>
                    <a
                      href={`tel:${profil.telephone}`}
                      className="hover:text-pink-300 transition"
                    >
                      {profil.telephone}
                    </a>
                  </div>
                )}
                {profil.localisation && (
                  <div className="flex items-center gap-2">
                    <span>📍</span>
                    <span className="hover:text-white">
                      {profil.localisation}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Compétences */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            💡 Compétences
          </h2>
          {competences.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {competences.map((comp) => (
                <div
                  key={comp.id}
                  className="bg-gradient-to-br from-pink-50 to-gray-100 p-4 rounded-lg border-l-4 border-pink-400"
                >
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {comp.nom}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      {comp.categorie}
                    </span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`text-lg ${
                            star <= comp.niveau
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">Aucune compétence</p>
          )}
        </div>

        {/* Expériences */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            💼 Expériences
          </h2>
          {experiences.length > 0 ? (
            <div className="space-y-6">
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="bg-gradient-to-r from-pink-50 to-gray-50 p-6 rounded-lg border-l-4 border-pink-400"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {exp.poste}
                      </h3>
                      <p className="text-pink-600 font-semibold">
                        {exp.entreprise}
                      </p>
                    </div>
                    {exp.enCours && (
                      <span className="bg-pink-400 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        En cours
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    📅 {exp.dateDebut} - {exp.dateFin || "Maintenant"}
                  </p>
                  {exp.localisation && (
                    <p className="text-sm text-gray-600 mb-2">
                      📍 {exp.localisation}
                    </p>
                  )}
                  {exp.description && (
                    <p className="text-gray-700 mb-3">{exp.description}</p>
                  )}
                  {exp.competences && exp.competences.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {exp.competences.map((comp) => (
                        <span
                          key={comp.id}
                          className="bg-pink-200 text-gray-900 px-2 py-1 rounded text-sm"
                        >
                          {comp.nom}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">Aucune expérience</p>
          )}
        </div>

        {/* Projets */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">🚀 Projets</h2>
          {projets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projets.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-gradient-to-br from-gray-50 to-pink-50 p-6 rounded-lg border-l-4 border-pink-400 hover:shadow-lg transition"
                >
                  {proj.image && (
                    <img
                      src={proj.image}
                      alt={proj.titre}
                      className="w-full h-40 object-cover rounded mb-4"
                    />
                  )}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {proj.titre}
                  </h3>
                  <p className="text-gray-700 mb-3">{proj.description}</p>
                  <p className="text-sm text-gray-600 mb-3">
                    📅 {proj.dateDebut} {proj.dateFin && `- ${proj.dateFin}`}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {proj.technologies && proj.technologies.length > 0 && (
                      <>
                        {proj.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="bg-gray-300 text-gray-900 px-2 py-1 rounded text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </>
                    )}
                  </div>
                  <div className="flex gap-3 flex-wrap">
                    {proj.lienDemo && (
                      <a
                        href={proj.lienDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-black transition text-sm"
                      >
                        Voir la démo
                      </a>
                    )}
                    {proj.lienGithub && (
                      <a
                        href={proj.lienGithub}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition text-sm"
                      >
                        Voir le code
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">Aucun projet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
