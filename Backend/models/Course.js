import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    lectureTitle: {
      type: String,
      required: true,
    },
    CRN: {
      type: String,
      required: true,
      unique: true,
    },
    instructor: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    buildingNumber: {
      type: String,
      required: true,
    },
    campus: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    weekdays: {
      type: [String],
      required: true,
    },
    term: {
      type: String,
      enum: ["Fall", "Summer", "Spring"],
      required: true,
    },
    classType: {
      type: String,
      enum: ["Face to Face", "Online"],
      required: true,
    },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
export default Course;
