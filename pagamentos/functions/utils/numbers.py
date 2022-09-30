from datetime import datetime
from random import random
from random import seed 

def generate(size: int):
    seed(datetime.now().timestamp())
    
    return str(random())[2:(size+2)]

def transaction_id(timestamp):
    id = ""
    for item in timestamp:
        if item in "0123456789":
            id += item
    return id
