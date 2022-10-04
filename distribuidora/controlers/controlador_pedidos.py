import ast
import csv
import threading
import pika


# Pedido = [cnpj(int), [(barcode(str), quantidade(int)], status]
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
        # ouve
        # receiver
        # connects to the broker
        credentials = pika.PlainCredentials('guest', 'guest')
        # rabbitmq
        connection = pika.BlockingConnection(pika.ConnectionParameters('localhost', 5672, '/', credentials))
        channel = connection.channel()

        # verifica se ja foi declarado, se não cria
        channel.exchange_declare(exchange="Distribuidora", exchange_type="direct", durable=True)
        channel.queue_declare(queue="Pedidos", durable=True)
        channel.queue_bind(queue="Pedidos", exchange="Distribuidora", routing_key="PeA")

        # channel.basic_consume(queue="Pedidos", on_message_callback=self.callback, auto_ack=True)
        # try:
        #     channel.start_consuming()
        # except KeyboardInterrupt:
        #     channel.stop_consuming()
        for message in channel.consume("Pedidos", inactivity_timeout=1, auto_ack=True):
            if self.stopped():
                break
            if message:
                method, properties, body = message
                if body:
                    self.processar_pedido(body)

    # def callback(self, ch, method, properties, body):
    #     body = body.decode('utf-8')
    #     pedido = ast.literal_eval(body)
    #     pedido = [pedido[0], pedido[1], "Solicitado"]
    #     print(pedido)
    #     self._adicionar_pedido(pedido)

    def processar_pedido(self, body):
        body = body.decode('utf-8')
        pedido = ast.literal_eval(body)
        pedido = [str(pedido[0]), str(pedido[1]), pedido[2], "Solicitado"]
        # pedido = dict(body)
        # pedido = [pedido['pedido_id'], pedido['cnpj'], pedido['produtos'], "Solicitado"]
        self._adicionar_pedido(pedido)
