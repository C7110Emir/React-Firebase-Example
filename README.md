# FireBlog App

Project aims to create a FireBlog App. See deployed project: *https://milestone-e32b4.firebaseapp.com/* and *https://fireablog-app.netlify.app*

### In the project, following assets are used:

- Reactjs, React ContextAPI, React Protected Routs,
- CSS, Semantic-UI-React,
- Form validation with Formik-Yup,
- User authentication with Firebase, Gmail-login,
- React-toastify to alert successful operations and errors.
- Firebase storage for images,
- Firebase database for blog posts,
- Firebase hosting for deployment,

<img src="https://res.cloudinary.com/hamazon/image/upload/v1623616428/FireApp.png" alt="page" />

## Project Skeleton

```011 - FireBlog App (folder)
|
|----readme.md         # Description of the project
├── public
│     └── index.html
├── src
│    ├── app-router
│    │       ├── AppRouter.js
│    │       └── PrivateRouter.js
│    ├── components
│    │       ├── BlogCard.js
│    │       ├── Footer.js
│    │       └── Navbar.js
│    ├── contexts
│    │       ├── AuthContextProvider.js
│    │       └── BlogContext.js
│    ├── helpers
│    │       ├── firebase.js
│    │       ├── firestore.js
│    │       └── toastify.js
│    ├── pages
│    │       ├── About.js
│    │       ├── Dashboard.js
│    │       ├── Details.js
│    │       ├── Login.js
│    │       ├── NewBlog.js
│    │       ├── Profile.js
│    │       ├── Register.js
│    │       └── UpdateBlog.js
│    ├── App.js
│    ├── App.css
│    ├── index.js
│    └── index.css
├── .env
├── package.json
└── yarn.lock
```
