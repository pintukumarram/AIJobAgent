import axios from "axios";

const AI_SERVICE_BASE_URL = process.env.AI_SERVICE_URL || "http://127.0.0.1:8000";

/**
 * Send resume to AI microservice for parsing
 */
export const parseResumeAI = async (fileBuffer) => {
  try {
    const formData = new FormData();
    formData.append("file", fileBuffer, "resume.pdf");

    const response = await axios.post(`${AI_SERVICE_BASE_URL}/ai/parse-resume`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error) {
    console.error("Error calling parseResumeAI:", error.message);
    throw new Error("AI resume parsing failed");
  }
};

/**
 * Match jobs using resume text
 */
export const matchJobsAI = async (resumeText) => {
  try {
    const response = await axios.post(`${AI_SERVICE_BASE_URL}/ai/match-jobs`, {
      resumeText,
    });
    return response.data;
  } catch (error) {
    console.error("Error calling matchJobsAI:", error.message);
    throw new Error("AI job matching failed");
  }
};

/**
 * Automatically apply to a job
 */
export const autoApplyAI = async (applicationData) => {
  try {
    const response = await axios.post(`${AI_SERVICE_BASE_URL}/ai/auto-apply/`, applicationData);
    return response.data;
  } catch (error) {
    console.error("Error calling autoApplyAI:", error.message);
    throw new Error("AI auto apply failed");
  }
};
