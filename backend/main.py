from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session as DBSession
import models, schemas
from database import engine, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


@app.get("/")
def health_check():
    return {"status": "ok"}


@app.post("/sessions", response_model=schemas.SessionResponse)
def create_session(
    session: schemas.SessionCreate,
    db: DBSession = Depends(get_db)
):
    new_session = models.Session(
        duration=session.duration,
        pauses=session.pauses,
    )
    db.add(new_session)
    db.commit()
    db.refresh(new_session)
    return new_session


@app.get("/sessions", response_model=list[schemas.SessionResponse])
def get_sessions(db: DBSession = Depends(get_db)):
    sessions = db.query(models.Session).all()
    return sessions