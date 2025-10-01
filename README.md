```markdown
# 🏡 Zentro - Real Estate Application Backend

Zentro is a backend service for a modern **real estate application**, built with **Node.js**, **Express.js**, and **MongoDB (Mongoose)**.  
It powers the core functionalities of the Zentro platform such as property management, user authentication, and API endpoints for the frontend.

---

## 📁 Project Structure
```

zentro-server/
├── src/
│ ├── config/ # Database connection & environment configs
│ ├── controllers/ # Business logic & request handlers
│ ├── middlewares/ # Authentication, error handling, etc.
│ ├── models/ # Mongoose schemas and models
│ ├── routes/ # API routes
│ ├── app.js # Express application setup
│ └── index.js # Entry point of the backend server
├── .env # Environment variables (not committed)
├── .gitignore # Git ignore rules
├── package.json # Dependencies and scripts
├── vercel.json # Vercel deployment config
└── README.md # Project documentation

````

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/rafiqmia65/zentro-server.git
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Environment Variables

Create a `.env` file in the root directory and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4. Run the Server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

Server will start at:
👉 `http://localhost:5000`

---

## 📦 Scripts

| Command       | Description                       |
| ------------- | --------------------------------- |
| `npm run dev` | Run the server with nodemon       |
| `npm start`   | Run the server in production mode |

---

## 🛠️ Tech Stack

- **Node.js** – JavaScript runtime
- **Express.js** – Web framework
- **MongoDB** – Database
- **Mongoose** – ODM for MongoDB
- **dotenv** – Environment variables
- **cors** – CORS middleware

---

## 🧭 Future Enhancements

- 🔐 JWT-based authentication
- 🏡 Property listing CRUD operations
- 📊 Admin dashboard APIs
- 📍 Advanced search and filtering
- 💳 Payment integration

---

## 👨‍💻 Team Zentro

| Role           | Name / GitHub Profile                                |
| -------------- | ---------------------------------------------------- |
| 🧠 Team Leader | [Arun Roy](https://github.com/ArunRoy404)            |
| 🤝 Co-Leader   | [Md Rafiq Mia](https://github.com/rafiqmia65)        |
| 👨‍💻 Member      | [Abdul Al Roman](https://github.com/Abdulal-Roman09) |

---

## 🌿 Team Workflow (Branching Guide)

To keep our code clean and avoid conflicts, **every team member must work on a separate branch** instead of directly pushing to `main`.

### 🪄 Step-by-Step Guide:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/rafiqmia65/zentro-server.git
   ```

2. **Create a new branch for your task:**

   ```bash
   git checkout -b feature/your-task-name
   ```

3. **Make changes and commit:**

   ```bash
   git add .
   git commit -m "feat: add your feature name"
   ```

4. **Push your branch to GitHub:**

   ```bash
   git push origin feature/your-task-name
   ```

5. **Create a Pull Request (PR):**

   - Go to the GitHub repo and create a PR from your branch into `main`.
   - The team leader will review and merge the PR after approval.

💡 **Tip:** Always pull the latest changes from `main` before starting new work:

```bash
git checkout main
git pull origin main
```

---

## 📜 License

This project is licensed under the **ISC License**.

---

💡 **Zentro** — A modern backend solution for real estate platforms.

```
