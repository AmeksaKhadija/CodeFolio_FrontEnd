# Codefolio React App

This is a React application that consumes a GraphQL API from Codefolio. The application is structured to provide a seamless user experience with authentication and routing.

## Features

- **GraphQL API Integration**: Fetch data from the Codefolio GraphQL API using Apollo Client.
- **Authentication**: Secure routes and manage user authentication using JWT.
- **Routing**: Navigate between different pages using React Router.
- **Responsive Design**: Styled using TailwindCSS for a modern and responsive UI.

## Project Structure

```
codefolio-react-app
├── public
│   └── index.html
├── src
│   ├── index.tsx
│   ├── App.tsx
│   ├── apollo
│   │   └── client.ts
│   ├── api
│   │   └── queries.ts
│   ├── components
│   │   ├── common
│   │   │   └── ProtectedRoute.tsx
│   │   └── ui
│   │       └── Header.tsx
│   ├── pages
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── Dashboard.tsx
│   │   └── Profile.tsx
│   ├── routes
│   │   └── index.tsx
│   ├── context
│   │   └── AuthContext.tsx
│   ├── services
│   │   └── auth.ts
│   ├── hooks
│   │   └── useAuth.ts
│   ├── utils
│   │   └── token.ts
│   ├── styles
│   │   ├── globals.css
│   │   └── tailwind.css
│   └── types
│       └── index.d.ts
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── .gitignore
└── README.md
```

## Getting Started

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd codefolio-react-app
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Run the application**:
   ```
   npm start
   ```

4. **Open your browser**:
   Navigate to `http://localhost:3000` to view the application.

## Technologies Used

- React
- TypeScript
- Apollo Client
- GraphQL
- React Router
- TailwindCSS
- JWT for authentication

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes. 

## License

This project is licensed under the MIT License.# CodeFolio_FrontEnd
