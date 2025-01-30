import therapistModel from "../models/therapist.model.js";
export const changeAvailability = async (req, res) => {
  try {
    const { _id } = req.body;
    const therapist = await therapistModel.findById(_id);
    if (!therapist) {
      return res.status(404).json({
        message: "Therapist with this id not found",
      });
    }
    therapist.available = !therapist.available;
    await therapist.save();
    return res.status(200).json({
      message: "Therapist availability updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: `An error occurred while fetching therapists. ${error.message}`,
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
      message: `An error occurred while fetching therapists. ${error.message}`,
    });
  }
};
