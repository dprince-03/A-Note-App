# A-Note-App

A full-featured Notes App built with Node.js, Express, MongoDB, and Passport.js for authentication. This application allows users to create, read, update, delete, and search through their personal notes with a clean, responsive interface.

## 🚀 Features

- **User Authentication**: Secure login using Google OAuth 2.0
- **CRUD Operations**: Create, Read, Update, and Delete notes
- **Search Functionality**: Search through notes by title or content
- **Pagination**: Efficient handling of large numbers of notes
- **Responsive Design**: Mobile-friendly interface using Bootstrap
- **Session Management**: Persistent user sessions with MongoDB store
- **Security**: Rate limiting, CORS, and secure cookie handling
- **Modern UI**: Clean, intuitive interface with EJS templating

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Passport.js with Google OAuth 2.0
- **Templating**: EJS with Express EJS Layouts
- **Session Storage**: connect-mongo
- **Security**: bcrypt, express-rate-limit, CORS
- **Frontend**: Bootstrap 5, Custom CSS
- **Development**: Nodemon for hot reloading

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v14 or higher)
- npm (comes with Node.js)
- MongoDB (local installation or MongoDB Atlas account)
- Google OAuth credentials (Client ID and Client Secret)

## 🔧 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/dprince-03/A-Note-App.git
   cd A-Note-App
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env` file in the root directory and add the following variables:
   ```env
   MONGODB_URL=mongodb://localhost:27017/
   # OR for MongoDB Atlas:
   # MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/

   SESSION_SECRET=your-super-secret-session-key-here

   # Google OAuth Credentials
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

4. **Google OAuth Setup:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URIs: `http://localhost:8050/google/callback`
   - Copy Client ID and Client Secret to your `.env` file

## 🚀 Running the Application

### To start project
```bash
npm run dev
```
This starts the server with nodemon for automatic restarts on file changes.

### or
```bash
npm start
```

The application will be available at `http://localhost:8050`

## 📖 Usage

1. **Homepage**: Visit the landing page and click "Try Notes, it's FREE!" to authenticate with Google
2. **Dashboard**: After authentication, you'll be redirected to your personal dashboard
3. **Create Notes**: Click "+ New Note" to create a new note with title and content
4. **View Notes**: Click on any note card to view its full content
5. **Edit Notes**: Use the edit functionality to update existing notes
6. **Delete Notes**: Remove notes you no longer need
7. **Search**: Use the search feature to find specific notes
8. **Logout**: Click logout to end your session

## 📁 Project Structure

```
A-Note-App/
├── server/
│   ├── server.js                 # Main application entry point
│   └── src/
│       ├── config/
│       │   └── db.config.js      # Database connection configuration
│       ├── controllers/
│       │   ├── appPages.controllers.js    # Public page controllers
│       │   ├── auth.controllers.js        # Authentication controllers
│       │   └── dashboard.controllers.js   # Dashboard/note controllers
│       ├── middleware/
│       │   └── auth.middleware.js         # Authentication middleware
│       ├── models/
│       │   ├── notes.models.js            # Note data model
│       │   └── user.models.js             # User data model
│       └── routes/
│           ├── appPages.routes.js         # Public routes
│           ├── auth.routes.js             # Authentication routes
│           └── dashboard.routes.js        # Dashboard routes
├── views/                      # EJS templates
│   ├── layouts/                # Layout templates
│   ├── partials/               # Reusable components
│   ├── dashboard/              # Dashboard pages
│   └── *.ejs                   # Public pages
├── public/                     # Static assets
│   ├── css/                    # Stylesheets
│   └── img/                    # Images
├── package.json                # Dependencies and scripts
├── .env                        # Environment variables (create this)
└── README.md                   # Project documentation
```

## 🔒 Security Features

- **Rate Limiting**: Prevents abuse with request rate limiting
- **CORS**: Configured for secure cross-origin requests
- **Secure Cookies**: HttpOnly cookies for session management
- **Session Security**: Secure session handling with MongoDB store
- **Input Validation**: Proper validation of user inputs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Credits

This project was built following the tutorial by [The Net Ninja](https://www.youtube.com/c/TheNetNinja) on YouTube.

**Tutorial Link**: [Node.js, Express & MongoDB Notes App](https://www.youtube.com/watch?v=BDo1lgaZuII&list=PL-oyFSB1BovJdlWJV1-0IK5C_SI4JLA9W&index=20&t=11554s&pp=iAQB)

## 📞 Support

If you have any questions or issues, please open an issue on GitHub or contact the repository owner.

---

**Happy Note Taking! 📝**
