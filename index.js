import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./database/config.js";
import mentorRoutes from "./routes/mentor.js";
import studentRoutes from "./routes/student.js";

const app = express();
const port = process.env.PORT;
dotenv.config();

// MIDDLEWARES
app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.status(200).send(`
    <h1 style="text-align:center;padding:10px;background-color:#333;color:#fff">Welcome to Mentor Student Management task</h1>
    <ul>
  <li>
  <h3>POST: Use the endpoint to <span style="background-color:yellow">/api/mentor/create-mentor</span> to create a new mentor</h3>
  </li>
  <li>
  <h3>POST: Use the endpoint to <span style="background-color:yellow">/api/student/create-student</span> to create a new student</h3>
  </li>
  <li>
  <h3>PUT: Change the endpoint to <span style="background-color:yellow">/api/mentor/assign-student/:mentorName/:studentName</span> to Assign a student to a mentor</h3>
  </li>
  <li>
  <h3>PUT: Change the endpoint to <span style="background-color:yellow">/api/student/assign-student/:studentName/:mentorName</span> Assign or Change Mentor for particular Studen</h3>
  </li>
  <li>
  <h3>Get: Change the endpoint to <span style="background-color:yellow">/api/mentor/get-all-students/:mentorId</span>to show all students for a particular mentor</h3>
  </li>
  <li>
  <h3>Get: Change the endpoint to <span style="background-color:yellow">/api/student/get-previous-mentor/:studentId</span> to show the previously assigned mentor for a particular student</h3>
  </li>
  </ul> `);
});

app.use("/api/mentor", mentorRoutes);
app.use("/api/student", studentRoutes);

app.listen(port, () => {
  console.log(`App is runing on the port -`, port);
});
