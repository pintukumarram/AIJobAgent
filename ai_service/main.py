from fastapi import FastAPI
from routers import parse_resume, match_jobs, auto_apply

app = FastAPI(title="AI JobAgent Service", version="1.0")

app.include_router(parse_resume.router, prefix="/ai/parse-resume", tags=["Resume"])
app.include_router(match_jobs.router, prefix="/ai/match-jobs", tags=["Matching"])
app.include_router(auto_apply.router, prefix="/ai/auto-apply", tags=["Automation"])

@app.get("/")
def root():
    return {"message": "AI microservice running 🚀"}
