from fastapi import APIRouter

from routes.transactionroutes import transaction_routes

api_router = APIRouter()

api_router.include_router(transaction_routes)

