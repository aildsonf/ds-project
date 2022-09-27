import functions.invoice.generate as generate_invoice 
import functions.utils.validate as validate

from functions.utils.errorhandling import send_error

def make_purchase(item_dict):
    
    '''if item_dict['payment_type'] == 'Boleto':
        
        ticket_numer = str(generate(size=16))+str(generate(size=16))+str(generate(size=16))'''
    
    if not (validate.credit_card_number(item_dict['credit_card_number']) and validate.card_verification_number(item_dict['cvv'])):
        send_error(500, "Erro em dados do cartão de crédito. Pagamento rejeitado!")
    
    if item_dict['buyer_id'] != 'Não informado' and not (validate.cpf(item_dict['buyer_id']) or validate.cnpj(item_dict['buyer_id']))   :
        item_dict['buyer_id'] = "Não informado"

    invoice = generate_invoice.from_purchase(item_dict)

    return invoice
