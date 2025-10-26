import axios from "axios";

export const parseResumeAI = async (fileBuffer) => {
  const res = await axios.post(
    "http://localhost:8000/ai/parse-resume/",
    { file: fileBuffer },
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return res.data;
};

export const matchJobsAI = async (resumeText) => {
  const res = await axios.post("http://localhost:8000/ai/match-jobs/", { resume_text: resumeText });
  return res.data.matches;
};
