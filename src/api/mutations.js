import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $email: String!, $password: String!) {
    login(username: $username, email: $email, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

// Compétences
export const CREATE_COMPETENCE = gql`
  mutation CreateCompetence($input: CompetenceInput!) {
    createCompetence(input: $input) {
      id
      nom
      niveau
      categorie
    }
  }
`;

export const UPDATE_COMPETENCE = gql`
  mutation UpdateCompetence($id: ID!, $input: CompetenceInput!) {
    updateCompetence(id: $id, input: $input) {
      id
      nom
      niveau
      categorie
    }
  }
`;

export const DELETE_COMPETENCE = gql`
  mutation DeleteCompetence($id: ID!) {
    deleteCompetence(id: $id) {
      id
    }
  }
`;

// Projets
export const CREATE_PROJET = gql`
  mutation CreateProjet($input: ProjetInput!) {
    createProjet(input: $input) {
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

export const UPDATE_PROJET = gql`
  mutation UpdateProjet($id: ID!, $input: ProjetInput!) {
    updateProjet(id: $id, input: $input) {
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

export const DELETE_PROJET = gql`
  mutation DeleteProjet($id: ID!) {
    deleteProjet(id: $id) {
      id
    }
  }
`;

// Expériences
export const CREATE_EXPERIENCE = gql`
  mutation CreateExperience($input: ExperienceInput!) {
    createExperience(input: $input) {
      id
      poste
      entreprise
      description
      localisation
      competences {
        id
        nom
      }
      dateDebut
      dateFin
      enCours
    }
  }
`;

export const UPDATE_EXPERIENCE = gql`
  mutation UpdateExperience($id: ID!, $input: ExperienceInput!) {
    updateExperience(id: $id, input: $input) {
      id
      poste
      entreprise
      description
      localisation
      competences {
        id
        nom
      }
      dateDebut
      dateFin
      enCours
    }
  }
`;

export const DELETE_EXPERIENCE = gql`
  mutation DeleteExperience($id: ID!) {
    deleteExperience(id: $id) {
      id
    }
  }
`;
