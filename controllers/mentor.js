import Mentor from "../models/mentor.js";
import Student from "../models/student.js";

// ! Task 1
// CREATE MENTOR
export const createMentor = async (req, res) => {
  try {
    const { name, email } = req.body;
    // checking the name for falsy values
    if (!name || !email) {
      return res
        .status(400)
        .json({ error: "Name and Email fields are required" });
    }

    // checking for existing mentor
    const existingMentor = await Student.findOne({ name });
    if (existingMentor) {
      return res.status(400).json({ error: "Mentor name exists already" });
    }

    const newMentor = new Mentor(req.body);
    await newMentor.save();
    res.status(200).json({ message: "New mentor created", data: newMentor });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

// GET ALL MENTORS
export const getAllMentors = async (req, res) => {
  try {
    const allMentors = await Mentor.find();
    res.status(200).json({
      message: "All Mentors data fetched successfully",
      data: allMentors,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

// GET MENTOR BY ID
export const getMentorById = async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.id);
    if (!mentor) {
      return res.status(404).json({ message: "Mentor not found" });
    }
    res
      .status(200)
      .json({ message: "Mentor data fetched successfully", data: mentor });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

// DELETE MENTOR BY ID
export const deleteMentor = async (req, res) => {
  try {
    const deletedMentor = await Mentor.findByIdAndDelete(req.params.id);
    if (!deletedMentor) {
      return res.status(404).json({ message: "Mentor not found" });
    }
    res
      .status(200)
      .json({ message: "Mentor deleted successfully", data: deletedMentor });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

// UPDATE MENTOR BY ID
export const updateMentorById = async (req, res) => {
  try {
    const mentorId = req.params.id;
    const updatedMentor = await Mentor.updateOne(
      { _id: mentorId },
      { ...req.body }
    );
    if (!updatedMentor.matchedCount === 0) {
      return res.status(404).json({ message: "Mentor not found" });
    }

    const mentor = await Mentor.findById(mentorId);

    res
      .status(200)
      .json({ message: "Mentor updated successfully", data: mentor });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

// ! Task 3
// Assign Student to mentor
export const assignStudentToMentor = async (req, res) => {
  try {
    const { studentName, mentorName } = req.params;
    // Find the mentor by name
    const mentor = await Mentor.findOne({ name: mentorName });
    if (!mentor) {
      return res.status(404).json({ error: "Mentor not found" });
    }

    // Find the student by name
    const student = await Student.findOne({ name: studentName });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Updating the mentor and student documents with respective data
    mentor.students.push(student._id);
    student.mentor = mentor._id;

    // Save the changes
    await mentor.save();
    await student.save();

    res
      .status(200)
      .json({ message: "Student assigned to mentor successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error", error });
  }
};

//  ! Task 5
//Fetching student details by using Mentor name
export const getMentorStudents = async (req, res) => {
  try {
    const mentorId = req.params.mentorId;
    const mentor = await Mentor.findById(mentorId).populate("students");
    if (!mentor) {
      return res.status(404).json({ message: "Mentor not found" });
    }
    res.json({
      message: `Students of a mentor ${mentor.name} fetched Successfully`,
      data: mentor,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
