# 🎓 LearnHub – MERN Stack Learning Management System

LearnHub is a full-stack Learning Management System (LMS) built using MongoDB, Express.js, React.js, and Node.js. It allows students to browse and enroll in courses, instructors to create and manage courses, and administrators to manage the platform.

## ✨ Features

- 🔐 JWT-based authentication with Bcrypt password hashing
- 👥 Role-based access control: Admin, Instructor, and Student
- 📚 Course management (Create, Read, Update, Delete)
- 🎯 Course enrollment and progress tracking
- 🛡️ Protected frontend routes and backend middleware
- 🎨 Responsive UI using React Bootstrap
- ⚡ RESTful API built with Express.js
- 🗄️ MongoDB database with Mongoose
- 📊 Separate dashboards for students, instructors, and administrators

## 🛠️ Technology Stack

| Component | Technology |
|---|---|
| Frontend | React.js |
| Routing | React Router |
| UI Library | React Bootstrap, Bootstrap 5 |
| HTTP Client | Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| ODM | Mongoose |
| Authentication | JWT |
| Password Security | Bcrypt |
| Environment Configuration | dotenv |

## 📁 Project Structure

```text
learnhub/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── courseController.js
│   │   ├── enrollmentController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── roleMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Course.js
│   │   └── Enrollment.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── courseRoutes.js
│   │   ├── enrollmentRoutes.js
│   │   └── userRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── CourseCard.js
│   │   │   └── ProtectedRoute.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Courses.js
│   │   │   ├── CourseDetail.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── StudentDashboard.js
│   │   │   ├── InstructorDashboard.js
│   │   │   └── AdminDashboard.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or later; a supported LTS version is recommended)
- npm
- MongoDB Community Server or MongoDB Atlas
- Git (optional)

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd learnhub
```

### 2. Set Up the Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/learnhub
JWT_SECRET=replace_with_a_strong_random_secret
JWT_EXPIRES_IN=7d
```

Replace the JWT secret with a strong, private value. Ensure MongoDB is running or configure the connection string for MongoDB Atlas.

### 3. Start the Backend

```bash
npm run dev
```

The backend API will run at:

`http://localhost:5000`

Ensure your `package.json` defines the `dev` script, typically using Nodemon.

### 4. Set Up the Frontend

Open a second terminal:

```bash
cd frontend
npm install
```

Configure the backend API URL in `src/services/api.js`:

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
```

Adjust the token key if your authentication implementation uses a different name.

### 5. Start the Frontend

```bash
npm start
```

The frontend will run at:

`http://localhost:3000`

Keep both servers running while using the application.

## 👥 User Roles and Permissions

| Role | Permissions |
|---|---|
| Student | Browse courses, enroll in courses, and track progress |
| Instructor | Create and manage courses according to authorization rules |
| Admin | Manage platform resources and access administrative features |

New users should receive an approved default role. Administrator accounts should be created through a secure administrative process. Do not allow users to assign themselves the admin role through public registration.

## 📡 REST API Endpoints

These are the intended endpoints; ensure your backend routes implement the paths and permissions listed here.

### Authentication

| Method | Endpoint | Access |
|---|---|---|
| POST | `/api/auth/register` | Public |
| POST | `/api/auth/login` | Public |
| GET | `/api/auth/profile` | Authenticated users |

### Courses

| Method | Endpoint | Access |
|---|---|---|
| GET | `/api/courses` | Public |
| GET | `/api/courses/:id` | Public |
| POST | `/api/courses` | Instructor/Admin |
| PUT | `/api/courses/:id` | Authorized Instructor/Admin |
| DELETE | `/api/courses/:id` | Authorized Instructor/Admin |

Instructors should only modify or delete their own courses unless they have administrator privileges.

### Enrollments

| Method | Endpoint | Access |
|---|---|---|
| POST | `/api/enrollments/enroll` | Authenticated Student |
| GET | `/api/enrollments/my-courses` | Authenticated Student |
| PUT | `/api/enrollments/:id/progress` | Enrolled Student |

The backend should verify enrollment ownership and validate progress values between `0` and `100`.

## 🗄️ Database Models

### User

| Field | Type | Description |
|---|---|---|
| name | String | User's name |
| email | String | Unique email address |
| password | String | Hashed password |
| role | String | `admin`, `instructor`, or `student` |
| timestamps | Date | Automatically managed creation and update dates |

### Course

| Field | Type | Description |
|---|---|---|
| title | String | Course title |
| description | String | Course description |
| instructor | ObjectId | Reference to a User |
| category | String | Course category |
| price | Number | Course price, defaulting to `0` |

### Enrollment

| Field | Type | Description |
|---|---|---|
| student | ObjectId | Reference to a User |
| course | ObjectId | Reference to a Course |
| progress | Number | Learning progress from `0` to `100` |
| timestamps | Date | Enrollment creation and update dates |

Configure required fields, references, validation rules, and appropriate indexes in the Mongoose schemas.

## 🔐 Authentication and Security

LearnHub uses JWT-based authentication and Bcrypt password hashing.

1. The user registers or logs in.
2. The backend validates the credentials.
3. Passwords are stored as hashes, not plaintext.
4. The backend issues a signed JWT.
5. The frontend sends the token with protected API requests.
6. Backend middleware verifies the token and checks permissions.

Protected requests should include this header:

```http
Authorization: Bearer <your_token>
```

| Middleware | Purpose |
|---|---|
| `protect` | Verifies authentication and attaches the authenticated user to the request |
| `authorize(...roles)` | Restricts access to specified roles |

Example:

```javascript
router.post(
  '/',
  protect,
  authorize('instructor', 'admin'),
  createCourse
);
```

Use ownership checks as well as role checks. Frontend route protection alone is not sufficient to secure sensitive operations.

## 🎨 Frontend Pages and Routes

| Path | Page | Access |
|---|---|---|
| `/` | Home | Public |
| `/courses` | Course Listing | Public |
| `/courses/:id` | Course Details | Public |
| `/login` | Login | Public |
| `/register` | Registration | Public |
| `/student` | Student Dashboard | Student |
| `/instructor` | Instructor Dashboard | Instructor/Admin |
| `/admin` | Admin Dashboard | Admin |

Ensure these paths and access rules match your React Router configuration.

### Key Components

- **AuthContext.js:** Manages authentication state and functions such as login, register, and logout.
- **ProtectedRoute.js:** Restricts page access based on authentication and role.
- **CourseCard.js:** Displays course information in a reusable card.
- **api.js:** Provides a shared Axios client for backend communication.
- **Navbar.js:** Displays navigation links based on authentication status and role.

## 🧪 Testing with Postman

### 1. Register a User

Send a `POST` request to:

`http://localhost:5000/api/auth/register`

Example JSON body (adjust fields to match your controller):

```json
{
  "name": "Test Student",
  "email": "student@example.com",
  "password": "StrongPassword123"
}
```

### 2. Log In

Send a `POST` request to:

`http://localhost:5000/api/auth/login`

Use the registered credentials and copy the JWT returned by the API.

### 3. Test a Protected Route

Add this header in Postman:

```http
Authorization: Bearer <your_token>
```

Test the profile endpoint or another protected route.

### 4. Test Course Management

1. Log in as an instructor.
2. Create a course.
3. Retrieve the course list.
4. Update the course.
5. Verify that unauthorized users cannot modify or delete it.

### 5. Test Enrollment

1. Log in as a student.
2. Enroll in an available course.
3. Retrieve enrolled courses.
4. Update progress.
5. Verify that progress validation works correctly.

## ✅ Manual Testing Checklist

- [ ] Register a student account.
- [ ] Log in successfully.
- [ ] Browse courses and open course details.
- [ ] Enroll in a course.
- [ ] View enrolled courses on the student dashboard.
- [ ] Update course progress.
- [ ] Log in as an instructor.
- [ ] Create and manage instructor-owned courses.
- [ ] Verify instructors cannot modify other instructors' courses.
- [ ] Log in as an administrator.
- [ ] Verify administrative permissions.
- [ ] Confirm unauthorized users cannot access restricted resources.
- [ ] Log out and verify authentication state is cleared.

## ⚠️ Error Handling

| HTTP Status | Meaning |
|---|---|
| 400 | Invalid request or validation error |
| 401 | Authentication required or token invalid |
| 403 | User lacks permission |
| 404 | Requested resource not found |
| 500 | Unexpected server error |

Return consistent JSON error responses. Do not expose secrets, database details, or stack traces to users in production.

## 📦 Main Dependencies

### Backend

```text
express
mongoose
dotenv
cors
bcryptjs
jsonwebtoken
```

Development dependency:

```text
nodemon
```

### Frontend

```text
react
react-dom
react-router-dom
axios
react-bootstrap
bootstrap
```

Install the dependencies required by your actual implementation and check the `package.json` files.

## 🚀 Deployment

### Backend

1. Deploy the Express API to a compatible Node.js hosting service.
2. Configure the production MongoDB connection string.
3. Set required environment variables, including `PORT`, `MONGO_URI`, and `JWT_SECRET`.
4. Configure CORS to allow the deployed frontend's origin.
5. Start the server using `npm start`.
6. Enable HTTPS and production logging.

### Frontend

The React application can be deployed to Vercel, Netlify, or another compatible static hosting provider.

Typical Create React App settings:

- **Build command:** `npm run build`
- **Output directory:** `build`

Configure the frontend API URL to point to the deployed backend instead of `localhost`. Use environment-specific configuration for production.

## 📄 License

This project is intended for educational and learning purposes. Add an explicit open-source license if you plan to distribute it publicly.

## 🎯 Project Summary

LearnHub is a MERN Stack Learning Management System featuring authentication, role-based access, course management, student enrollment, and progress tracking. This README contains the project overview, setup instructions, project structure, API reference, testing guidance, and deployment notes for both the frontend and backend.
