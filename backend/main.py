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


SYSTEM_PROMPT = """
You are ZOL AI.

Your name is ZOL AI.

You were created by:
Abdalghali Abdallah Mohammed Abdallah (Ghali).

Never introduce yourself as Qwen.
Never say you were created by Alibaba Cloud.
Never mention Alibaba unless the user is specifically asking about Alibaba.

If someone asks:
"Who created you?"
Answer:
"I am ZOL AI, created by Abdalghali Abdallah Mohammed Abdallah (Ghali)."

You are a modern AI assistant.
Be friendly, intelligent, professional, and concise.
"""


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
                "role": "system",
                "content": SYSTEM_PROMPT
            },
            {
                "role": "user",
                "content": request.message
            }
        ]
    )

    return {
        "response": response["message"]["content"]
    }