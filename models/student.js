import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    course: { type: String, required: true },
    mentor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mentor",
      default: null,
    },
  },
  {
    versionKey: false,
  }
);

const student = mongoose.model("Student", StudentSchema);

export default student;
