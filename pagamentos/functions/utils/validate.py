import re

def credit_card_number(num):
    return bool(re.match("^[0-9]{4}\.[0-9]{4}\.[0-9]{4}\.[0-9]{4}$",num))

def card_verification_number(num):
    return bool(re.match("^[0-9]{3}$",num))

def cnpj(num):
    return bool(re.match("^[0-9]{2}\.[0-9]{3}\.[0-9]{4}/[0-9]{4}-[0-9]{2}$",num))

def cpf(num):
    return bool(re.match("^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}",num))

def contact(num):
    return bool(re.match("^\([0-9]{2}\) 9[0-9]{4}-[0-9]{4}$",num))