import { Schema, model } from "mongoose";
const FeedbackSchema = new Schema(
  {
    feedback: { type: String, required: true, maxlength: 200 },
    rating: { type: Number, required: true, min: 1, max: 5 },
    satisfaction: {
      type: String,
      enum: ["Satisfied", "Not Satisfied"],
      required: true
    },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const feedbackModel = model("Feedback", FeedbackSchema);
export default feedbackModel;
