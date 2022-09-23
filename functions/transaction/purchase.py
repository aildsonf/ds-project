from datetime import datetime
from tokenize import Double
from functions.utils.numbers import generate    

def make_purchase(product_id, seller_id, seller_contact, buyer_id, quantity, value, discount):
    timestamp = str(datetime.now())
    transaction_id = generate(size=9)
    nfce_number = generate(size=15)
    
    #TODO: criar nota fiscal, registrar no BD e retornar para front

    return None