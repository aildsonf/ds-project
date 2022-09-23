from datetime import datetime
from random import random
from random import seed 

def generate(size: int):
    seed(datetime.now().timestamp())
    
    return str(random())[2:(size+2)]
