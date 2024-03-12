# Student Mentor Management System

The Student-Mentor Management System is designed to facilitate the management of mentors and students within an educational Institution.

## API Endpoints

### Student Routes

- `POST /api/student/create-student`: Create a new student.
- `GET /api/student/`: Get all students.
- `GET /api/student/:id`: Get student by Id.
- `DELETE /api/student/:id`: Delete student by Id.
- `PUT /api/student/update-student/:id`: Update a student by id.
- `PUT /api/student//change-mentor/:studentName/:newMentorName"`: Change mentor for a student.
- `GET /api/student/get-previous-mentor/:studentId`: Get the previous mentor for a student.

### Mentor Routes

- `POST /api/mentor/create-mentor`: Create a new mentor.
- `GET /api/mentor/`: Get all mentors.
- `GET /api/mentor/:id`: Get mentor by Id.
- `DELETE /api/mentor/:id`: Delete mentor by Id.
- `PUT /api/mentor/update-mentor/:id`: Update mentor by Id.
- `GET /api/mentor/get-all-students/:mentorId`: Get All students of a mentor.
- `PUT /api/mentor/assign-student/:mentorName/:studentName`: Assign students to a mentor.

## Technologies Used

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **dotenv**
- **cors**
