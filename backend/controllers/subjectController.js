import Subject from "../models/Subject.js";

// CREATE
export const createSubject = async (req, res) => {
  try {
    const { name } = req.body;

    const subject = await Subject.create({
      name,
      userId: req.user._id, //  from token
    });

    return res.status(201).json({
      success: true,
      message: "Subject created successfully",
      data: subject,
    });
  } catch (error) {
    console.error("CREATE SUBJECT ERROR:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Subject already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// GET
export const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find({
      userId: req.user._id, //  filter by logged-in user
    });

    return res.json({
      success: true,
      message: "Subjects fetched successfully",
      count: subjects.length,
      data: subjects,
    });
  } catch (error) {
    console.error("GET ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching subjects",
    });
  }
};

// UPDATE
export const updateSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const subject = await Subject.findById(id);

    if (!subject || subject.userId.toString() !== req.user._id.toString()) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    }

    subject.name = name;
    await subject.save();

    return res.json({
      success: true,
      message: "Subject updated successfully",
      data: subject,
    });
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating subject",
    });
  }
};

// DELETE
export const deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;

    const subject = await Subject.findById(id);

    if (!subject || subject.userId.toString() !== req.user._id.toString()) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    }

    await subject.deleteOne();

    return res.json({
      success: true,
      message: "Subject deleted successfully",
      data: subject,
    });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Error deleting subject",
    });
  }
};


export const getSubjectById = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);

    if (!subject || subject.userId.toString() !== req.user._id.toString()) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: subject,
    });
  } catch (error) {
    console.error("GET SUBJECT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Error fetching subject",
    });
  }
};