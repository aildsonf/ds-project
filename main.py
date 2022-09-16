from multiprocessing import allow_connection_pickling
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import routes.base as base_routes

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=['*'],
    allow_headers=['*']
)

app.include_router(base_routes.api_router)

@app.get("/")
async def root():
    return {"message": "Hello World"}