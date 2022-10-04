import os
import threading
import time
# from fastapi import FastAPI
import pika
from tkinter import *

from controlers.controlador_estoque import ControladorDeEstoque
from controlers.controlador_pedidos import ControladorDePedidos

# app = FastAPI()

# classe central de controle de execução
# executa a thread principal
class Gerenciador:
    # instancia os controladores de pedidos e estoque
    # estabelece o controlador de parada da thread
    def __init__(self, master=None):
        self._pedidos = ControladorDePedidos()
        self._estoque = ControladorDeEstoque()
        self._stop = threading.Event()

        # #GUI
        # master.title(string='SD')
        # master.geometry('700x400')
        # self.menu = PanedWindow(master)
        # self.menu.pack()
        #
        # # self.m0 = Frame(master)
        # self.m0 = PanedWindow(master)
        # self.m0.pack()
        # self.m1 = PanedWindow(master, orient=VERTICAL)
        # self.m2 = PanedWindow(master, orient=VERTICAL)
        # self.m3 = PanedWindow(master, orient=VERTICAL)
        #
        # self.bottom = Frame(master)
        # self.bottom.pack(side=BOTTOM)
        #
        # # Menu options
        #
        # self.m_home = Button(self.menu)
        # self.m_home["text"] = "Home"
        # self.m_home["command"] = self.home_window
        # self.m_home.pack(side=LEFT)
        #
        # self.m_produto = Button(self.menu)
        # self.m_produto["text"] = "Adicionar Produto"
        # self.m_produto["command"] = self.add_window
        # self.m_produto.pack(side=LEFT)
        #
        # self.m_reestoque = Button(self.menu)
        # self.m_reestoque["text"] = "Reestoque"
        # self.m_reestoque["width"] = 10
        # self.m_reestoque["command"] = self.reestoque_window
        # self.m_reestoque.pack(side=LEFT)
        #
        # self.m_log = Button(self.menu)
        # self.m_log["text"] = "Log"
        # self.m_log["width"] = 10
        # self.m_log["command"] = self.log_window
        # self.m_log.pack(side=LEFT)
        #
        # # Menu 0 - home
        # self.primeiroContainerM0 = Frame(self.m0)
        # self.m0.add(self.primeiroContainerM0)
        # # self.primeiroContainer.pack()
        #
        # self.segundoContainerM0 = Frame(self.m0)
        # self.m0.add(self.segundoContainerM0)
        #
        # self.pedidosLabel = Label(self.primeiroContainerM0, text="Pedidos")
        # self.pedidosLabel.pack(side=TOP)
        #
        # self.lb_pedidos = Listbox(self.primeiroContainerM0, width=50)
        # self.update_pedidos()
        # # self.m1.add(self.lb_pedidos)
        # self.lb_pedidos.pack(side=BOTTOM)
        #
        # self.produtosLabel = Label(self.segundoContainerM0, text="Produtos")
        # self.produtosLabel.pack(side=TOP)
        #
        # self.lb_estoque = Listbox(self.segundoContainerM0, width=30)
        # # self.update_estoque()
        # self.lb_estoque.pack(side=BOTTOM)
        #
        # # Menu 1 - Adicionar novo produto
        #
        # self.primeiroContainerM1 = PanedWindow(self.m1)
        # self.m1.add(self.primeiroContainerM1)
        # # self.primeiroContainer.pack()
        #
        # self.segundoContainerM1 = PanedWindow(self.m1)
        # self.m1.add(self.segundoContainerM1)
        #
        # self.terceiroContainerM1 = PanedWindow(self.m1)
        # self.m1.add(self.terceiroContainerM1)
        #
        # self.quartoContainerM1 = PanedWindow(self.m1)
        # self.m1.add(self.quartoContainerM1)
        #
        # self.quintoContainerM1 = PanedWindow(self.m1)
        # self.m1.add(self.quintoContainerM1)
        #
        # self.sextoContainerM1 = PanedWindow(self.m1)
        # self.m1.add(self.sextoContainerM1)
        #
        # self.setimoContainerM1 = PanedWindow(self.m1)
        # self.m1.add(self.setimoContainerM1)
        #
        # self.oitavoContainerM1 = PanedWindow(self.m1)
        # self.m1.add(self.oitavoContainerM1)
        #
        # self.msg = Label(self.primeiroContainerM1, text="Adicionar Novo Produto")
        # self.msg.pack()
        #
        # self.barcodeLabelM1 = Label(self.segundoContainerM1, text="Barcode")
        # self.barcodeLabelM1.pack(side=LEFT)
        #
        # self.barcode_entryM1 = Entry(self.segundoContainerM1)
        # self.barcode_entryM1["width"] = 30
        # self.barcode_entryM1.pack(side=RIGHT)
        #
        # self.nameLabel = Label(self.terceiroContainerM1, text="Name")
        # self.nameLabel.pack(side=LEFT)
        #
        # self.name_entry = Entry(self.terceiroContainerM1)
        # self.name_entry["width"] = 30
        # self.name_entry.pack(side=RIGHT)
        #
        # self.brandLabel = Label(self.quartoContainerM1, text="Brand")
        # self.brandLabel.pack(side=LEFT)
        #
        # self.brand_entry = Entry(self.quartoContainerM1)
        # self.brand_entry["width"] = 30
        # self.brand_entry.pack(side=RIGHT)
        #
        # self.weightLabel = Label(self.quintoContainerM1, text="Weight")
        # self.weightLabel.pack(side=LEFT)
        #
        # self.weight_entry = Entry(self.quintoContainerM1)
        # self.weight_entry["width"] = 30
        # self.weight_entry.pack(side=RIGHT)
        #
        # self.priceLabel = Label(self.sextoContainerM1, text="Price")
        # self.priceLabel.pack(side=LEFT)
        #
        # self.price_entry = Entry(self.sextoContainerM1)
        # self.price_entry["width"] = 30
        # self.price_entry.pack(side=RIGHT)
        #
        # self.quantityLabelM1 = Label(self.setimoContainerM1, text="Quantity")
        # self.quantityLabelM1.pack(side=LEFT)
        #
        # self.quantity_entryM1 = Entry(self.setimoContainerM1)
        # self.quantity_entryM1["width"] = 30
        # self.quantity_entryM1.pack(side=RIGHT)
        #
        # self.n_produto = Button(self.oitavoContainerM1)
        # self.n_produto["text"] = "Adicionar"
        # self.n_produto["width"] = 10
        # self.n_produto.bind("<Button-1>", self.novo_produto)
        # self.n_produto.pack()
        #
        # # Menu 2 - Reestoque
        #
        # self.primeiroContainerM2 = PanedWindow(self.m2)
        # self.m2.add(self.primeiroContainerM2)
        #
        # self.segundoContainerM2 = PanedWindow(self.m2)
        # self.m2.add(self.segundoContainerM2)
        #
        # self.terceiroContainerM2 = PanedWindow(self.m2)
        # self.m2.add(self.terceiroContainerM2)
        #
        # self.quartoContainerM2 = PanedWindow(self.m2)
        # self.m2.add(self.quartoContainerM2)
        #
        # self.produtosLabelM2 = Label(self.primeiroContainerM2, text="Produtos")
        # self.produtosLabelM2.pack(side=TOP)
        #
        # self.lb_estoqueM2 = Listbox(self.primeiroContainerM2, width=30)
        # self.update_estoque()
        # self.lb_estoqueM2.pack(side=BOTTOM)
        #
        # self.barcodeLabelM2 = Label(self.segundoContainerM2, text="Barcode")
        # self.barcodeLabelM2.pack(side=LEFT)
        #
        # self.barcode_entryM2 = Entry(self.segundoContainerM2)
        # self.barcode_entryM2["width"] = 30
        # self.barcode_entryM2.pack(side=RIGHT)
        #
        # self.quantityLabelM2 = Label(self.terceiroContainerM2, text="Quantity")
        # self.quantityLabelM2.pack(side=LEFT)
        #
        # self.quantity_entryM2 = Entry(self.terceiroContainerM2)
        # self.quantity_entryM2["width"] = 30
        # self.quantity_entryM2.pack(side=RIGHT)
        #
        # self.n_reestoque = Button(self.quartoContainerM2)
        # self.n_reestoque["text"] = "Adicionar"
        # self.n_reestoque["width"] = 10
        # self.n_reestoque["command"] = self.reestoque_button
        # self.n_reestoque.pack()
        #
        # self.sair = Button(self.bottom)
        # self.sair["text"] = "Sair"
        # # self.sair["font"] = ("Calibri", "10")
        # self.sair["width"] = 5
        # self.sair["command"] = self.bottom.quit
        # self.sair.pack(side=RIGHT)
        #
        # # Menu 3 - Log
        # self.pedidosLabelM3 = Label(self.m3, text="Pedidos")
        # self.pedidosLabelM3.pack(side=TOP)
        #
        # self.lb_pedidosM3 = Listbox(self.m3, width=60)
        # self.update_log()
        # self.lb_pedidosM3.pack(side=BOTTOM)


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
            pedido[3] = "Aprovado"
            # sender
            # connects to the broker
            credentials = pika.PlainCredentials('guest', 'guest')
            # rabbitmq
            connection = pika.BlockingConnection(pika.ConnectionParameters('localhost', 5672, '/', credentials))
            channel = connection.channel()

            # verifica se ja foi declarado, se não cria
            channel.exchange_declare(exchange="Distribuidora", exchange_type="direct", durable=True)
            channel.queue_declare(queue="Produtos-" + str(pedido[1]), durable=True)
            channel.queue_bind(queue="Produtos-" + str(pedido[1]), exchange="Distribuidora", routing_key="Pr" + str(pedido[1]))

            #envia a mensagem(body = str(pedido[1]))
            body = str(pedido[0]) + ", " + pedido[3]
            channel.basic_publish(exchange="Distribuidora", routing_key="Pr" + str(pedido[1]), body=body,
                                  properties=pika.BasicProperties(delivery_mode=pika.spec.PERSISTENT_DELIVERY_MODE))

            self._pedidos.finalizar_pedido(pedido)
        else:
            if pedido[3] != "Espera":
                for produto in pedido[2]:
                    # Se não possui estoque do produto faz o reestoque de 100 unidades do produto
                    if not self._estoque.has_estoque(produto[0], produto[1]):
                        produto = self._estoque.buscar_produto(produto[0])
                        if produto: print("Não possui estoque suficiente do produto \"{0}\" codigo de barra {1} para realizar o pedido {2}".format(produto[1], produto[0], pedido[0]))
                pedido[3] = "Espera"
                self._pedidos.salvar()
            self._pedidos.to_last()
        # self.update_pedidos()
        # self.update_log()

    # recebe o id do prdoduto(int), e a quantidade(int)
    # solicita o reestoque de um produto
    def reestoque(self, barcode, qtd):

        # faz o pagamento antes de adicionar ao estoque
        ...

        self._estoque.add_produto(barcode, qtd)

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

    def inteface(self):
        # Terminal interativo
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
                    print("Digite o barcode do produto: ")
                    barcode = input()
                    print("Digite o nome do produto: ")
                    name = input()
                    print("Digite a marca do produto: ")
                    brand = input()
                    print("Digite o peso do produto: ")
                    weight = float(input())
                    print("Digite o preço: R$")
                    price = float(input())
                    print("Digite a quantidade: ")
                    qtd = input()
                    self._estoque.add_novo_produto(barcode, name, brand, weight, price, qtd)
                    # self._estoque.add_novo_produto("01", "monitor", "multi", 3.2, 400.00, 100)
                    # self._estoque.add_novo_produto("02", "teclado", "multi", 2.0, 100.0, 100)
                elif x == 'R' or x == 'r':
                    print("Digite o baarcode do produto: ")
                    barcode = input()
                    print("Digite a quantidade: ")
                    qtd = input()
                    self.reestoque(barcode, qtd)
            else:
                break
        pass

    # funções GUI

    def home_window(self):
        self.m0.pack()
        self.m1.pack_forget()
        self.m2.pack_forget()
        self.m3.pack_forget()
    def add_window(self):
        self.m1.pack()
        self.m0.pack_forget()
        self.m2.pack_forget()
        self.m3.pack_forget()

    def reestoque_window(self):
        self.m2.pack()
        self.m0.pack_forget()
        self.m1.pack_forget()
        self.m3.pack_forget()

    def log_window(self):
        self.m3.pack()
        self.m0.pack_forget()
        self.m1.pack_forget()
        self.m2.pack_forget()

    def novo_produto(self, event):
        barcode = self.barcode_entryM1.get()
        name = self.name_entry.get()
        brand = self.brand_entry.get()
        weight = self.weight_entry.get()
        price = self.price_entry.get()
        qtd = self.quantity_entryM1.get()

        self._estoque.add_novo_produto(barcode, name, brand, weight, price, qtd)

        self.barcode_entryM1.delete(0, END)
        self.brand_entry.delete(0, END)
        self.name_entry.delete(0, END)
        self.weight_entry.delete(0, END)
        self.price_entry.delete(0, END)
        self.quantity_entryM1.delete(0, END)
        self.update_estoque()

    def reestoque_button(self):
        barcode = self.barcode_entryM2.get()
        qtd = self.quantity_entryM2.get()
        self.reestoque(barcode, qtd)

        self.barcode_entryM2.delete(0, END)
        self.quantity_entryM2.delete(0, END)
        self.update_estoque()

    def update_pedidos(self):
        self.lb_pedidos.delete(0, END)
        for i in self._pedidos.listar_pedidos():
            self.lb_pedidos.insert(END, str(i))
        self.lb_pedidos.pack()

    def update_estoque(self):
        self.lb_estoque.delete(0, END)
        for i in self._estoque.listar_produtos():
            self.lb_estoque.insert(END, str(i))
            self.lb_estoqueM2.insert(END, str(i))
        self.lb_estoque.pack()
        self.lb_estoqueM2.pack()

    def update_log(self):
        self.lb_pedidosM3.delete(0, END)
        for i in self._pedidos.listar_log():
            self.lb_pedidosM3.insert(END, str(i))
        self.lb_pedidosM3.pack()
