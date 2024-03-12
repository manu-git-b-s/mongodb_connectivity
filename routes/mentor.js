import express from "express";
import {
  assignStudentToMentor,
  createMentor,
  deleteMentor,
  getAllMentors,
  getMentorById,
  getMentorStudents,
  updateMentorById,
} from "../controllers/mentor.js";

const router = express.Router();

router.get("/", getAllMentors);
router.get("/:id", getMentorById);
router.delete("/:id", deleteMentor);
router.post("/create-mentor", createMentor);
router.put("/update-mentor/:id", updateMentorById);
router.get("/get-all-students/:mentorId", getMentorStudents);
router.put("/assign-student/:mentorName/:studentName", assignStudentToMentor);
export default router;
