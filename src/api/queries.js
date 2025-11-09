import { gql } from "@apollo/client";

export const GET_USER_PROFILE = gql`
  query GetUserProfile {
    getProfil {
      id
      nom
      prenom
      titre
      bio
      email
      telephone
      localisation
      photo
    }
  }
`;

export const GET_COMPETENCES = gql`
  query GetCompetences {
    getCompetences {
      id
      nom
      niveau
      categorie
    }
  }
`;

export const GET_PROJETS = gql`
  query GetProjets {
    getProjets {
      id
      titre
      description
      image
      lienDemo
      lienGithub
      technologies
      dateDebut
      dateFin
      competences {
        id
        nom
      }
    }
  }
`;

export const GET_EXPERIENCES = gql`
  query GetExperiences {
    getExperiences {
      id
      poste
      entreprise
      description
      localisation
      dateDebut
      dateFin
      enCours
      competences {
        id
        nom
      }
    }
  }
`;