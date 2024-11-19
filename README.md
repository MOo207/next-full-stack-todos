# Next.js Full Stack Todo Application

This is a full-stack Todo application built with **Next.js** and **Prisma**, styled with **Tailwind CSS**, and secured with **Next Auth** for authentication. The app supports **internationalization (i18n)**, allowing users to switch seamlessly between English and Arabic.

---

## 🚀 Features

- **User Authentication**: Register, log in, and log out securely.
- **Todo Management**: Create, edit, update, and delete todos with an optimized UI for a smoother experience.
- **Internationalization (i18n)**: Supports English and Arabic, enabling easy language switching.
- **Responsive Design**: Fully responsive for desktop and mobile.
- **Feedback and Error Handling**: Loading indicators and clear error messages for better user experience.

---

## 🛠️ Tech Stack

### Frontend:
- **Next.js**: React framework for server-side rendering and routing.
- **React**: Component-based UI development.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Zustand**: Lightweight state management library.
- **Next Intl**: For internationalization (i18n).

### Backend:
- **Prisma**: Type-safe ORM for database interactions.
- **Next Auth**: Authentication for user sessions.

### Database:
- **SQLite**: Default database (can switch to other Prisma-supported databases).

---

## 📋 Getting Started

### Prerequisites
Ensure the following are installed on your system:
- **Node.js** (version 14 or later)
- **npm** or **yarn**

---

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/next-full-stack-todos.git
   cd next-full-stack-todos

2. Install dependencies:

bash
Copy code
npm install
# or
yarn install
Set up environment variables: Create a .env file in the root of the project with the following:

env
Copy code
NEXTAUTH_SECRET=your_secret_here
DATABASE_URL="file:./dev.db"
Run database migrations:

bash
Copy code
npx prisma migrate dev --name init
Start the development server:

bash
Copy code
npm run dev
# or
yarn dev
Open your browser and navigate to:

arduino
Copy code
http://localhost:3000
📝 Usage
Register: Go to /auth/register to create a new account.
Login: Visit /auth/login to log in with your credentials.
Manage Todos: Access the main todos page to create, edit, update, or delete todos.
🤝 Contributing
Contributions are always welcome!

Submit a pull request.
Open an issue for bugs or feature requests.
📜 License
This project is licensed under the MIT License. See the LICENSE file for details.

⭐ Star this project on GitHub and share your feedback! 🚀
