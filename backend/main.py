from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.responses import JSONResponse
import os
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

project_id = os.getenv("PROJECT_ID")
location = os.getenv("LOCATION")
database_url = os.getenv("DATABASE_URL")

app = FastAPI()

database = Database(database_url)

origins = [
    "http://localhost:3000", 
]

app.add_middleware(DBSessionMiddleware, db_url=database_url)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)


@app.get("/")
def root():
    return {"message": "Hello World"}


@app.on_event("startup")
async def startup_db_client():
    await database.connect()


@app.on_event("shutdown")
async def shutdown_db_client():
    await database.disconnect()


