import os
import threading
import time
from controlers.controlador_estoque import ControladorDeEstoque
from controlers.controlador_pedidos import ControladorDePedidos


# classe central de controle de execução
# executa a thread principal
class Gerenciador:
    # instancia os controladores de pedidos e estoque
    # estabelece o controlador de parada da thread
    def __init__(self):
        self._pedidos = ControladorDePedidos()
        self._estoque = ControladorDeEstoque()
        self._stop = threading.Event()

    # recebe um pedido(lista)
    # checa se possui estoque de todos os produtos listados no pedido
    # se não está em falta, retira os prdutos listados do estoque e envia a carga/pedido
    # se está em falta, solicita reestoque dos produtos se o pedido já não está esperando pelo reestoque
    def _tratar_pedido(self, pedido):
        em_falta = False
        for produto in pedido[2]:
            if not self._estoque.has_estoque(produto[0], produto[1]):
                em_falta = True
        if not em_falta:
            for produto in pedido[2]:
                self._estoque.retirar_produto(produto[0], produto[1])
            # envia o pedido/proodutos
            pedido[3] = "Enviado"
            # # sender
            # # connects to the broker
            # connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
            # channel = connection.channel()
            #
            # # verifica se ja foi declarado, se não cria
            # channel.exchange_declare(exchange="Distribuidora", exchange_type="direct", durable=True)
            # channel.queue_declare(queue="Pedidos", durable=True)
            # # channel.queue_bind(queue="Pedidos", exchange="Distribuidora", routing_key="PeA")
            #
            # channel.basic_publish(exchange="Distribuidora", routing_key="PeA", body='[(1, 100)]',
            #                       properties=pika.BasicProperties(delivery_mode=pika.spec.PERSISTENT_DELIVERY_MODE))
            self._pedidos.finalizar_pedido(pedido)
        else:
            if pedido[3] != "Espera":
                for produto in pedido[2]:
                    # Se não possui estoque do produto faz o reestoque de 100 unidades do produto
                    if not self._estoque.has_estoque(produto[0], produto[1]):
                        produto = self._estoque.buscar_produto(produto[0])
                        if produto: print("Não possui estoque suficiente do produto \"{0}\" id {1} para realizar o pedido {2}".format(produto[1], produto[0], pedido[0]))
                pedido[3] = "Espera"
                self._pedidos.salvar()
            self._pedidos.to_last()

    # recebe o id do prdoduto(int), e a quantidade(int)
    # solicita o reestoque de um produto
    def reestoque(self, produto_id, qtd):

        # faz o pagamento antes de adicionar ao estoque
        ...

        self._estoque.add_produto(produto_id, qtd)

    # ativa a condição de parada da thread
    def stop(self):
        self._stop.set()

    # verifica a condição de parada da thread
    def stopped(self):
        return self._stop.isSet()

    # thread principal
    # inicia a thread de controle de pedidos
    # trata um pedido/compra, se existir, na lista de pedidos solicitados
    # quando encerrado(stopped), fecha o estoque
    def start(self):
        t2 = threading.Thread(target=self._pedidos.start)
        t2.start()
        while not self.stopped():
            pedido = self._pedidos.has_pedido()
            if pedido:
                self._tratar_pedido(pedido)
            time.sleep(2)
        self._estoque.close()
        self._pedidos.stop()

    def main(self):
        while True:
            os.system('clear')
            print("- MENU - \nPressione\n"
                  "P - para listar os Pedidos\n"
                  "E - para listar o Estoque\n"
                  "L - para o log\n"
                  "N - para Adicionar um novo Produto\n"
                  "R - para Reestoque\n"
                  "S - para Sair")
            x = input()
            if x != 'S' and x != 's':
                if x == 'P' or x == 'p':
                    print("Pedidos:\n")
                    [print(i) for i in self._pedidos.listar_pedidos()]
                    print("Pressione algo para continuar")
                    input()
                elif x == 'E' or x == 'e':
                    print("Estoque:\n")
                    [print(i) for i in self._estoque.listar_produtos()]
                    print("Pressione algo para continuar")
                    input()
                elif x == 'L' or x == 'l':
                    print("Log:\n")
                    [print(i) for i in self._pedidos.listar_log()]
                    print("Pressione algo para continuar")
                    input()
                elif x == 'N' or x == 'n':
                    print("Digite o nome do produto: ")
                    nome = input()
                    print("Digite a quantidade: ")
                    qtd = input()
                    print("Digite o preço: R$")
                    preco = input()
                    self._estoque.add_novo_produto(nome, qtd, preco)
                elif x == 'R' or x == 'r':
                    print("Digite o id do produto: ")
                    produto_id = input()
                    print("Digite a quantidade: ")
                    qtd = input()
                    self.reestoque(produto_id, qtd)
            else:
                break
