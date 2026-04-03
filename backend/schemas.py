from pydantic import BaseModel
from datetime import datetime


class SessionCreate(BaseModel):
    duration: int
    pauses: int

class SessionResponse(BaseModel):
    id: int
    duration: int
    pauses: int
    created_at: datetime

    class Config:
        from_attributes = True