from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import re

app = FastAPI(title="Cortex AI API", version="1.0.0")

# Allow frontend to call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ReviewRequest(BaseModel):
    review: str


class ReviewResponse(BaseModel):
    review: str
    cleaned_text: str
    sentiment: str


def clean_text(text: str) -> str:
    """Enhanced preprocessing: lowercase, space removal, and emoji stripping."""
    # 1. Convert to lowercase
    text = text.lower()
    
    # 2. Remove emojis and non-ascii characters
    # This is a robust way to strip most emojis while keeping standard text
    text = text.encode('ascii', 'ignore').decode('ascii')
    
    # 3. Remove characters that aren't basic symbols or alphanumerics
    text = re.sub(r"[^\w\s.,!?'-]", "", text)
    
    # 4. Collapse extra spaces and strip
    text = re.sub(r"\s+", " ", text).strip()
    
    return text


@app.get("/")
def root():
    return {"message": "Cortex AI API is running 🚀", "version": "1.0.0"}


@app.post("/analyze", response_model=ReviewResponse)
def analyze_review(payload: ReviewRequest):
    cleaned = clean_text(payload.review)
    return ReviewResponse(
        review=payload.review,
        cleaned_text=cleaned,
        sentiment="pending",
    )
