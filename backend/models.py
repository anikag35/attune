from sqlalchemy import Column, Integer, DateTime
from datetime import datetime
from database import Base
from sqlalchemy.sql import func

class Session(Base):
    __tablename__ = "sessions"

    id = Column(Integer, primary_key=True, index=True)
    duration = Column(Integer, nullable=False)
    pauses = Column(Integer, nullable=False, default=0)
    created_at = Column(DateTime,server_default=func.now())