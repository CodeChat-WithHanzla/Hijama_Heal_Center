import therapistModel from "../models/therapist.model.js";
import appointmentModel from "../models/appointment.model.js";
export const changeAvailability = async (req, res) => {
  try {
    const { _id } = req.body;
    const therapist = await therapistModel.findById(_id);
    if (!therapist) {
      return res.status(404).json({
        message: "Therapist with this id not found"
      });
    }
    therapist.available = !therapist.available;
    await therapist.save();
    return res.status(200).json({
      message: "Therapist availability updated successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: `An error occurred while fetching therapists. ${error.message}`
    });
  }
};
export const allTherapists = async (req, res) => {
  try {
    const therapists = await therapistModel
      .find()
      .select(["-password", "-email"]);
    res.status(200).json({ therapists });
  } catch (error) {
    res.status(500).json({
      message: `An error occurred while fetching therapists. ${error.message}`
    });
  }
};
export const loginTherapists = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and Password required." });
    const therapist = await therapistModel.findOne({ email });
    if (!therapist)
      return res.status(404).json({ message: "Therapist not found" });
    const isMatch = await therapist.isPasswordCorrect(password);
    if (isMatch) {
      const token = await therapist.generateToken();
      return res.status(200).json({ token });
    } else {
      return res.status(401).json({ message: "Invalid Password." });
    }
  } catch (error) {
    res.status(500).json({
      message: `An error occurred while login Therapists. ${error.message}`
    });
  }
};
export const therapistAppointments = async (req, res) => {
  try {
    const { therapistId } = req.body;
    if (!therapistId) {
      return res.status(404).json({ message: "Therapist Id required!" });
    }
    const appointments = await appointmentModel.find({ therapistId });
    res.status(200).json({ appointments });
  } catch (error) {
    res.status(500).json({
      message: `An error occurred while getting Therapist's Appointments. ${error.message}`
    });
  }
};
export const appointmentComplete = async (req, res) => {
  try {
    const { therapistId, appointmentId } = req.body;
    const appointment = await appointmentModel.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    if (appointment.therapistId !== therapistId) {
      return res.status(403).json({ message: "Unauthorized action" });
    }
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      isCompleted: true
    });

    return res.status(200).json({ message: "Appointment Completed" });
  } catch (error) {
    res.status(500).json({
      message: `An error occurred while completing the appointment. ${error.message}`
    });
  }
};
export const appointmentCancel = async (req, res) => {
  try {
    const { therapistId, appointmentId } = req.body;
    const appointment = await appointmentModel.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    if (appointment.therapistId !== therapistId) {
      return res.status(403).json({ message: "Unauthorized action" });
    }
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true
    });

    return res.status(200).json({ message: "Appointment Cancelled" });
  } catch (error) {
    res.status(500).json({
      message: `An error occurred while cancelling the appointment. ${error.message}`
    });
  }
};
