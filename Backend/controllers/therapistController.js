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
    const therapist = await therapistModel.findOne({ email }).select("+password");
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
export const therapistDashboard = async (req, res) => {
  try {
    const { therapistId } = req.body;
    const appointments = await appointmentModel.find({ therapistId });
    if (!appointments) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    let earnings = 0;
    appointments.map((item) => {
      if (item.isCompleted || item.payment) earnings += item.amount;
    });
    let patients = [];
    appointments.map((item) => {
      if (!patients.includes[item.userId]) patients.push(item.userId);
    });
    const dashBoardData = {
      earnings,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments: appointments.reverse().slice(0, 5)
    };
    res.status(200).json({ dashBoardData });
  } catch (error) {
    res.status(500).json({
      message: `An error occurred while getting data for Dashboard. ${error.message}`
    });
  }
};
export const therapistProfile = async (req, res) => {
  try {
    const { therapistId } = req.body;
    const profileData = await therapistModel.findById(therapistId);
    if (!profileData) {
      return res.status(404).json({ message: "Therapist not found" });
    }
    res.status(200).json({ profileData });
  } catch (error) {
    res.status(500).json({
      message: `An error occurred while getting data for Profile. ${error.message}`
    });
  }
};
export const updateTherapistProfile = async (req, res) => {
  try {
    const { therapistId, ...updateData } = req.body;
    if (!Object.keys(updateData).length) {
      return res.status(204).send();
    }
    const updatedTherapist = await therapistModel.findByIdAndUpdate(
      therapistId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedTherapist) {
      return res.status(404).json({ message: "Therapist not found." });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      updatedTherapist
    });
  } catch (error) {
    res.status(500).json({
      message: `Failed to update the therapist profile. ${error.message}`
    });
  }
};
