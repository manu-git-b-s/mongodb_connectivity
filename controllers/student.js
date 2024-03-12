import Student from "../models/student.js";
import Mentor from "../models/mentor.js";

// ! Task 2
// CREATE STUDENT
export const createStudent = async (req, res) => {
  try {
    const { name, email, course } = req.body;
    if (!name || !email || !course) {
      return res
        .status(400)
        .json({ error: "Name,email and course fields are required" });
    }
    const existingStudent = await Student.findOne({ name });
    if (existingStudent) {
      return res.status(400).json({ error: "Student Name exists already" });
    }

    const newStudent = new Student(req.body);
    await newStudent.save();
    res
      .status(200)
      .json({ message: "Student created successfully", data: newStudent });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET ALL STUDENTS
export const getAllStudents = async (req, res) => {
  try {
    const allStudents = await Student.find();
    res.status(200).json({
      message: "All student data fetched successfully",
      data: allStudents,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET STUDENT BY ID
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res
      .status(200)
      .json({ message: "Student data fetched successfully", data: student });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE STUDENT BY ID
export const deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res
      .status(200)
      .json({ message: "Student deleted successfully", data: deletedStudent });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// UPDATE STUDENT BY ID
export const updateStudentById = async (req, res) => {
  try {
    const studentId = req.params.id;
    const updatedMentor = await Student.updateOne(
      { _id: studentId },
      { ...req.body }
    );
    if (!updatedMentor.matchedCount === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    const mentor = await Student.findById(studentId);

    res
      .status(200)
      .json({ message: "Student updated successfully", data: mentor });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// ! Task 4
// Assign OR CHANGE MENTOR FOR STUDENT
export const changeMentorForStudent = async (req, res) => {
  try {
    const { studentName, newMentorName } = req.params;

    //Finding the Student by Name
    const student = await Student.findOne({ name: studentName });
    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }

    // Finding the new mentor by name
    const newMentor = await Mentor.findOne({ name: newMentorName });
    if (!newMentor) {
      return res.status(404).json({ message: "New mentor not found." });
    }

    if (student.mentor) {
      // If the student already has a mentor, remove the student from the old mentor's list
      await Mentor.findByIdAndUpdate(
        student.mentor,
        { $pull: { students: student._id } },
        { new: true }
      );
    }

    student.mentor = newMentor._id;
    await student.save();

    // Add the student to the new mentor's list
    const updatedMentor = await Mentor.findByIdAndUpdate(
      newMentor._id,
      { $addToSet: { students: student._id } },
      { new: true }
    );

    res.json({
      message: "Mentor changed successfully",
      student,
      newMentor: updatedMentor,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error", error });
  }
};

// ! Task 6
//Showing Previous Mentor details
export const getPreviousMentor = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const student = await Student.findById(studentId).populate("mentor");
    res.json({
      data: student.mentor,
      message: "Previous mentor data fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error", error });
  }
};
