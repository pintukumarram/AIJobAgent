import { parseResumeAI, matchJobsAI, autoApplyAI } from "../utils/aiServiceClient.js";

/**
 * Upload and parse resume using AI service
 */
export const parseResume = async (req, res) => {
  try {
    const file = req.file;
    const parsedData = await parseResumeAI(file.buffer);
    res.json(parsedData);
  } catch (error) {
    res.status(500).json({ message: "AI Resume parsing failed", error: error.message });
  }
};

/**
 * Match jobs based on resume text
 */
export const matchJobs = async (req, res) => {
  try {
    const { resumeText } = req.body;
    const matches = await matchJobsAI(resumeText);
    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: "AI Job matching failed", error: error.message });
  }
};

/**
 * Auto-apply for job
 */
export const autoApply = async (req, res) => {
  try {
    const data = req.body;
    const result = await autoApplyAI(data);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "AI Auto Apply failed", error: error.message });
  }
};
