from datetime import datetime
import functions.utils.numbers as numbers_generation 

def from_purchase(purchase_details):

    timestamp = datetime.strftime(datetime.now(), "%d/%m/%Y %H:%M:%S")

    transaction_id = numbers_generation.transaction_id(timestamp)
    number_nfce = numbers_generation.generate(size=9)
    auth_protocol = numbers_generation.generate(size=15)

    payment_details = {
        "total_quantity": 0,
        "products_total": 0.0,
        "discount": 0.0,
        "paying_value": 0.0,
        "payment_type": purchase_details["payment_type"],
        "paid_value": 0.0
    }

    for item in purchase_details["products"]:

        payment_details["total_quantity"] += item["quantity"]
        payment_details["products_total"] += item["quantity"]*item["product_value"]
        payment_details["discount"] += item["discount"]
        payment_details["paying_value"] += item["total_value"]
        payment_details["paid_value"] += item["total_value"]

    invoice = {
        "seller":{
            "name": purchase_details["seller_name"],
            "id": purchase_details["seller_id"],
            "address": purchase_details["seller_address"],
            "contact": purchase_details["seller_contact"]
        },
        "buyer_id": purchase_details["buyer_id"],
        "provider_name": purchase_details["provider"],
        "products": purchase_details["products"],
        "payment": payment_details,
        "status": "Efetuada",
        "transaction_id": transaction_id,
        "number_nfce": number_nfce,
        "auth_protocol": auth_protocol,
        "timestamp": timestamp
    }

    return invoice