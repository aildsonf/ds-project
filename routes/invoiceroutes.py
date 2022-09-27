from fastapi import APIRouter
from pydantic import BaseModel

import functions.invoice.generate as generateinvoice

invoice_routes = APIRouter()

class InvoiceInfo(BaseModel):
    timestamp: str

@invoice_routes.post("/invoice/generate")
async def generate_invoice(item: InvoiceInfo):
    item_dict = item.dict()
    return generate_invoice()