from fastapi import APIRouter, HTTPException
import pickle
import os

router = APIRouter()

# ✅ Resolve absolute paths safely
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, "models", "job_model.pkl")
VECTORIZER_PATH = os.path.join(BASE_DIR, "models", "vectorizer.pkl")

# ✅ Safe model loading
try:
    with open(MODEL_PATH, "rb") as f:
        model = pickle.load(f)
    with open(VECTORIZER_PATH, "rb") as f:
        vectorizer = pickle.load(f)
except Exception as e:
    print("⚠️ Model loading error:", e)
    model = None
    vectorizer = None


@router.post("/")
def match_jobs(data: dict):
    """
    Match resume text with job descriptions using trained ML model.
    """
    resume_text = data.get("resumeText", "")

    if not model or not vectorizer:
        raise HTTPException(status_code=500, detail="Model not loaded properly")

    if not resume_text.strip():
        raise HTTPException(status_code=400, detail="Missing resume text")

    try:
        # Vectorize input text
        X = vectorizer.transform([resume_text])
        prediction = model.predict(X)[0]

        return {"match": prediction}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Matching failed: {str(e)}")
