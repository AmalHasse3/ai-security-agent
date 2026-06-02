from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()


app.add_middleware(
CORSMiddleware,
allow_origins=["*"],
allow_credentials=True,
allow_methods=["*"],
allow_headers=["*"],
)

# Request model

class LogRequest(BaseModel):
    log: str

@app.get("/")
def home():
    return {
        "message": "AI Security Agent Backend Running"
    }

@app.post("/analyze")
def analyze_log(data: LogRequest):
    log = data.log.lower()

    severity = "Low"
    threat = "No major threat detected"
    recommendation = "Continue monitoring"

    if "failed login" in log:
        severity = "High"
        threat = "Possible brute force attack"
        recommendation = "Block suspicious IP and enable MFA"

    elif "malware" in log:
        severity = "Critical"
        threat = "Malware activity detected"
        recommendation = "Isolate infected system immediately"

    elif "unauthorized" in log:
        severity = "Medium"
        threat = "Unauthorized access attempt"
        recommendation = "Review account permissions"

    elif "phishing" in log:
        severity = "High"
        threat = "Potential phishing attempt detected"
        recommendation = "Warn users and block malicious sender"

    elif "suspicious ip" in log:
        severity = "Medium"
        threat = "Suspicious IP activity detected"
        recommendation = "Investigate IP reputation and block access"

    return {
        "severity": severity,
        "threat": threat,
        "recommendation": recommendation,
    }
