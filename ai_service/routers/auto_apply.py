from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from utils.email_utils import send_application_email

router = APIRouter()

# ✅ Define input structure
class ApplicationRequest(BaseModel):
    name: str
    email: str
    job_title: str
    company: str
    resume_text: str


@router.post("/")
def auto_apply(request: ApplicationRequest):
    """
    Automatically apply to a job using resume data.
    (This simulates sending an email or submission.)
    """
    try:
        # Simulate AI analysis of job matching
        if "python" in request.resume_text.lower():
            status = "Highly Matched ✅"
        else:
            status = "Moderately Matched ⚙️"

        # Simulate sending an email
        send_application_email(
            to_email=request.email,
            subject=f"Application for {request.job_title} at {request.company}",
            body=f"""
Hello {request.name},

Your application for **{request.job_title}** at **{request.company}** has been submitted successfully.

AI Match Result: {status}

Best regards,  
AI JobAgent 🤖
"""
        )

        return {"message": "Application submitted successfully", "status": status}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Auto apply failed: {str(e)}")
