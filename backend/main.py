from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import ollama

app = FastAPI(
    title="ZOL AI",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str


@app.get("/")
def home():
    return {
        "project": "ZOL AI",
        "version": "1.0.0",
        "status": "running"
    }


@app.post("/chat")
def chat(request: ChatRequest):

    response = ollama.chat(
        model="qwen2.5:3b",
        messages=[
            {
                "role": "user",
                "content": request.message
            }
        ]
    )

    return {
        "response": response["message"]["content"]
    }