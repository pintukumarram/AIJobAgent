from fastapi import APIRouter, UploadFile, File
import spacy

router = APIRouter()
nlp = spacy.load("en_core_web_sm")

@router.post("/")
async def parse_resume(file: UploadFile = File(...)):
    text = (await file.read()).decode("utf-8")
    doc = nlp(text)
    skills = [ent.text for ent in doc.ents if ent.label_ in ["ORG", "PRODUCT", "SKILL"]]
    experience = [sent.text for sent in doc.sents if "year" in sent.text.lower()]
    return {"skills": list(set(skills)), "experience": experience[:5]}
