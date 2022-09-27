from typing import List, Optional
from fastapi import APIRouter
from pydantic import BaseModel

import functions.transaction.purchase as purchase_transaction
import functions.transaction.cancel as cancel_transaction

transaction_routes = APIRouter()

class product_info(BaseModel):
    product_id: int
    quantity: int
    product_name: str
    product_value: float
    discount: float
    total_value: float

class purchase_info(BaseModel):
    seller_name: str
    seller_id: str
    seller_address: str
    seller_contact: str
    buyer_id: Optional[str] = "Não informado"
    provider: str
    products: List[product_info]
    payment_type: str = "Cartão de crédito"
    credit_card_number: str
    cvv: str

class purchase_canceling_info(BaseModel):
    number_nfce: str
    client_email: str

@transaction_routes.post("/purchase/cancel")
async def cancel_purchase_transaction(item: purchase_canceling_info):
    item_dict = item.dict()
    return cancel_transaction.cancel_purchase(item_dict["number_nfce"], item_dict["client_email"])

@transaction_routes.post("/purchase/buy")
async def make_purchase_transaction(item: purchase_info):
    item_dict = item.dict()
    return purchase_transaction.make_purchase(item_dict)