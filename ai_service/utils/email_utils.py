import smtplib
from email.mime.text import MIMEText

def send_application_email(to_email: str, subject: str, body: str):
    """
    Send a simulated email notification using SMTP (can be replaced with real service).
    """
    try:
        # Dummy email sender for simulation
        msg = MIMEText(body, "plain")
        msg["Subject"] = subject
        msg["From"] = "noreply@aijobagent.com"
        msg["To"] = to_email

        # 🧪 Simulate send (no real SMTP call for now)
        print(f"📨 Simulated email sent to {to_email}:\n{body}")

        # To integrate real SMTP:
        # with smtplib.SMTP("smtp.gmail.com", 587) as server:
        #     server.starttls()
        #     server.login("your_email@gmail.com", "your_password")
        #     server.send_message(msg)

        return True
    except Exception as e:
        print("❌ Email sending failed:", e)
        raise e
