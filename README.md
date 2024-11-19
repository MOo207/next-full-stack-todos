
# Next.js Full Stack Todo Application

This is a full-stack Todo application built with **Next.js**, **Prisma**, and **PostgreSQL**, styled with **Tailwind CSS**, and secured with **NextAuth.js** for authentication. The app leverages **server actions** for optimized backend interactions and supports **internationalization (i18n)**, allowing users to seamlessly switch between English and Arabic.

---

## 🚀 Features

- **User Authentication**: Secure login and logout functionality using NextAuth.js.
- **Todo Management**: Create, update, delete, and view todos with a modern UI.
- **Server Actions**: Fast and efficient backend updates without the need for WebSocket integration.
- **Internationalization (i18n)**: Dual-language support (English and Arabic) powered by next-intl.
- **Responsive Design**: Fully optimized for both desktop and mobile screens.
- **Error Handling**: Clear error messages and feedback for better user experience.
- **PostgreSQL Database**: Robust and scalable database support using Prisma.

---

## 🛠️ Tech Stack

### Frontend:
- **Next.js**: React framework for server-side rendering and routing.
- **React**: Component-based UI development.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Zustand**: Lightweight state management library.
- **next-intl**: For internationalization (i18n).

### Backend:
- **Prisma**: Type-safe ORM for database interactions.
- **NextAuth.js**: Authentication for user sessions.

### Database:
- **PostgreSQL**: Production-ready relational database.

---

## 📂 File Structure

```
src/
├── app/                      # Main application folder
│   ├── [locale]/             # Localization-specific routes
│   │   └── auth/             # Authentication pages (login, etc.)
│   │   └── todos/            # Todo management pages
│   ├── actions/              # Server-side actions for backend operations
│   ├── api/                  # API route handlers
│   ├── components/           # Reusable UI components (Form, Input, Button, etc.)
│   ├── lib/                  # Utilities (Prisma client, zod schemas, etc.)
│   ├── services/             # Backend services (e.g., authentication, todo operations)
│   ├── store/                # Zustand state management
│   ├── layout.tsx            # Application layout
│   ├── globals.css           # Global styles
│   └── page.tsx              # Main application entry point
├── prisma/                   # Prisma schema and migrations
│   ├── schema.prisma         # Prisma database schema
│   └── migrations/           # Prisma migration files
├── public/                   # Public assets
├── dockerfile                # Dockerfile for containerization
├── .env.example              # Example environment variables
└── README.md                 # Project documentation
```

---

## 📋 Getting Started

### Prerequisites
Ensure the following are installed on your system:
- **Node.js** (version 14 or later)
- **npm** or **yarn**
- **PostgreSQL** (version 13 or later)

---

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/MOo207/next-full-stack-todos.git
   cd next-full-stack-todos
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the root directory with the following:
     ```
     NEXTAUTH_SECRET=your_secret_here
     NEXTAUTH_URL=http://localhost:3000
     DATABASE_URL=postgresql://username:password@localhost:5432/your_database
     ```

4. Set up the database:
   - Run Prisma migrations:
     ```bash
     npx prisma migrate dev --name init
     ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open the application:
   - Navigate to [http://localhost:3000](http://localhost:3000).

---

## 🧪 Running Tests

1. **Unit Tests**:
   - Run backend unit tests:
     ```bash
     npm run test
     ```

2. **E2E Tests**:
   - Run Cypress for end-to-end testing:
     ```bash
     npm run cypress
     ```

---

## 📦 Deployment with Docker

1. **Build the Docker Image**:
   ```bash
   docker build -t nextjs-todos-app .
   ```

2. **Run the Docker Container**:
   ```bash
   docker run -p 3000:3000 --env-file .env nextjs-todos-app
   ```

3. **With Docker Compose**:
   - Use the provided `docker-compose.yml` to set up both the app and PostgreSQL:
     ```bash
     docker-compose up --build
     ```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:
- Submit pull requests for new features or bug fixes.
- Open issues for suggestions or feedback.

---

## 📜 License

This project is licensed under the MIT License. See the LICENSE file for more details.

---

⭐ If you found this project helpful, give it a star on GitHub!

