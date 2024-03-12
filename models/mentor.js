import mongoose from "mongoose";

const mentorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  },
  {
    versionKey: false,
  }
);

const Mentor = mongoose.model("Mentor", mentorSchema);

export default Mentor;
