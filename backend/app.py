from fastapi import FastAPI, HTTPException, Response
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import List
import os

app = FastAPI()

class Model(BaseModel):
    id: str
    name: str
    description: str
    demo_picture: str

models = [
    Model(id="1", name="Model 1", description="Description of Model 1", demo_picture="model1.png"),
    Model(id="2", name="Model 2", description="Description of Model 2", demo_picture="model2.png"),
    # Add more models here
]

# Endpoint to get list of models
@app.get("/models", response_model=List[Model])
async def get_models():
    return models

# Endpoint to download model by id
@app.get("/download/{model_id}")
async def download_model(model_id: str):
    model_path = f"models/{model_id}.pth"  # Assuming models are stored in 'models' directory
    if os.path.exists(model_path):
        return FileResponse(path=model_path, filename=f"model_{model_id}.pth")
    else:
        raise HTTPException(status_code=404, detail="Model not found")
