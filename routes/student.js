import express from "express";
import {
  changeMentorForStudent,
  createStudent,
  deleteStudent,
  getAllStudents,
  getPreviousMentor,
  getStudentById,
  updateStudentById,
} from "../controllers/student.js";

const router = express.Router();

router.get("/", getAllStudents);
router.get("/:id", getStudentById);
router.delete("/:id", deleteStudent);
router.post("/create-student", createStudent);
router.put("/update-student/:id", updateStudentById);
router.put(
  "/change-mentor/:studentName/:newMentorName",
  changeMentorForStudent
);
router.get("/get-previous-mentor/:studentId", getPreviousMentor);
export default router;
