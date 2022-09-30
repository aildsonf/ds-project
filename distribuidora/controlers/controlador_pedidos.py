import ast
import csv
import random
import threading
import time


# Pedido = [id(int), solicitante(string), [(produto_id(int), quantidade(int)], status, valor]
# status = "Solicitado"/"Espera"/"Enviado"
class ControladorDePedidos:
    def __init__(self):
        self._pedidos = self._carregar_pedidos()
        self._log = self._carregar_log()
        self._stop = threading.Event()

    # carrega os pedidos do csv, cria se não existir
    def _carregar_pedidos(self):
        f = open("pedidos.csv", "a")
        f.close()
        pedidos = []
        with open("pedidos.csv", "r") as file:
            csvreader = csv.reader(file)
            for row in csvreader:
                row[2] = ast.literal_eval(row[2])
                pedidos.append(row)

        return pedidos

    # carrega o log de pedidos realizados do csv, cria se não existir
    def _carregar_log(self):
        f = open("log.csv", "a")
        f.close()
        log = []
        with open("log.csv", "r") as file:
            csvreader = csv.reader(file)
            for row in csvreader:
                log.append(row)
        return log

    # escreve a lista de pedidos e o log nos respectivos csv'
    def salvar(self):
        with open("pedidos.csv", "w") as file:
            writer = csv.writer(file)
            writer.writerows(self._pedidos)
            # for pedido in self.pedidos:
            #     file.write("{}\n".format(pedido))
        with open("log.csv", "w") as file:
            writer = csv.writer(file)
            writer.writerows(self._log)

    # adiciona o pedido a lista de pedidos em andamento
    def _adicionar_pedido(self, pedido):
        self._pedidos.append(pedido)
        self.salvar()

    # remove o pedido a lista de pedidos em andamento
    def remover_pedido(self, pedido):
        self._pedidos.pop(pedido)
        self.salvar()

    # finaliza o pedido, adiciona o pedido ao log e remove da lista de pedidos em andamento
    def finalizar_pedido(self, pedido):
        self._log.append(pedido)
        self._pedidos.remove(pedido)
        self.salvar()

    # envia um pedido para o fim da lista
    def to_last(self):
        self._pedidos = self._pedidos[1:] + [self._pedidos[0]]

    # lista todos os pedidos em andamento
    def listar_pedidos(self):
        return self._pedidos

    # lista todos os pedidos finalizados
    def listar_log(self):
        return self._log

    def has_pedido(self):
        if self._pedidos:
            return self._pedidos[0]
        return None

    # ativa a condição de parada da thread
    def stop(self):
        self._stop.set()

    # verifica a condição de parada da thread
    def stopped(self):
        return self._stop.isSet()

    # thread de recebimento de pedidos
    # recebe o pedido e adiciona a lista de pedidos em andamento
    def start(self):
        while not self.stopped():
            # ouve
            # # receiver
            # # connects to the broker
            # connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'), )
            # channel = connection.channel()
            #
            # # verifica se ja foi declarado, se não cria
            # channel.queue_declare(queue="Pedidos", durable=True)
            #
            # channel.basic_consume(queue="Pedidos", on_message_callback=callback, auto_ack=True)
            # channel.start_consuming()
            #
            # # stop consuming?
            # channel.start_consuming()
            choices = [[123798, "IBN", [(1, 10), (2, 10)], "Solicitado"], [846512, "Ebit", [(1, 50), (2, 80)], "Solicitado"], [641235, "Nikel", [(1, 90), (2, 60)], "Solicitado"], [984132, "Microhard", [(1, 30), (2, 70)], "Solicitado"]]
            pedido = random.choice(choices)
            self._adicionar_pedido(pedido)
            time.sleep(60)

    # def callback(ch, method, properties, body):
    #     # trata a string(mensagem) e retorna o pedido
    #     pass
