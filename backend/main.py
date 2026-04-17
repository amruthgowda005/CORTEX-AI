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
    """Basic text cleaning — remove extra spaces, special chars."""
    text = text.strip()
    text = re.sub(r"\s+", " ", text)
    text = re.sub(r"[^\w\s.,!?'-]", "", text)
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
