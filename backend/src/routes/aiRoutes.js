// backend/src/routes/aiRoutes.js
import express from "express";
import multer from "multer";
import { parseResume, matchJobs } from "../controllers/aiController.js";

const router = express.Router();
const upload = multer();




// ✅ Parse Resume Route
router.post("/parse-resume", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const parsed = await parseResumeAI(file.buffer);
    res.json(parsed);
  } catch (err) {
    console.error("Resume Parsing Error:", err);
    res.status(500).json({
      message: "Resume parsing failed",
      error: err.message,
    });
  }
});

// ✅ Match Jobs Route
router.post("/match-jobs", async (req, res) => {
  try {
    const { resumeText } = req.body;
    if (!resumeText) {
      return res.status(400).json({ message: "Missing resume text" });
    }

    const matches = await matchJobsAI(resumeText);
    res.json({ matches });
  } catch (err) {
    console.error("Job Matching Error:", err);
    res.status(500).json({
      message: "Job matching failed",
      error: err.message,
    });
  }
});

// ✅ Export for ES Modules
export default router;
