import sqlite3

#Produto = id(int), nome(string), qtd(int)
class ControladorDeEstoque:
    # conecta ao banco de dados
    # cria os elementos se necessario
    def __init__(self):
        self.estoque = sqlite3.connect('distribuidora.db', check_same_thread=False)
        cursor = self.estoque.cursor()
        cursor.execute("CREATE TABLE IF NOT EXISTS produtos (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, nome VARCHAR(255), qtd INTEGER UNSIGNED, preco INTEGER)")

    # encerra a conecxão com o banco de dados
    def close(self):
        self.estoque.close()

    # recebe o nome do produto e a quantidade
    # adiciona um novo produto ao estoque
    def add_novo_produto(self, nome_produto, qtd, preco):
        cursor = self.estoque.cursor()
        sql = "INSERT INTO produtos (nome, qtd, preco) VALUES(?, ?, ?)"
        val = (nome_produto, qtd, preco)
        cursor.execute(sql, val)
        self.estoque.commit()

    # recebe o id do prdoduto(int), e a quantidade(int)
    # aumenta a quantidade do produto no estoque
    def add_produto(self, produto_id, qtd):
        cursor = self.estoque.cursor()
        sql = "UPDATE produtos SET qtd = qtd + ? WHERE id = ?"
        val = (qtd, produto_id)
        cursor.execute(sql, val)
        self.estoque.commit()

    # recebe o id do prdoduto(int), e a quantidade(int)
    # reduz a quantidade do produto no estoque
    def retirar_produto(self, produto_id, qtd):
        cursor = self.estoque.cursor()
        sql = "UPDATE produtos SET qtd = qtd - ? WHERE id = ?"
        val = (qtd, produto_id)
        cursor.execute(sql, val)
        self.estoque.commit()

    # revome um produto do estoque a partir do id
    def remove_produto(self, produto_id):
        cursor = self.estoque.cursor()
        sql = "DELETE FROM produtos WHERE id = ?"
        val = (produto_id,)
        cursor.execute(sql, val)
        self.estoque.commit()

    # retorna um produto de acordo com o id
    def buscar_produto(self, produto_id):
        cursor = self.estoque.cursor()
        sql = "SELECT * FROM produtos WHERE id = ?"
        val = (produto_id,)
        cursor.execute(sql, val)
        return cursor.fetchone()

    # retorna um produto de acordo com o id
    def buscar_produto_nome(self, produto_nome):
        cursor = self.estoque.cursor()
        sql = "SELECT * FROM produtos WHERE id = %?%"
        val = (produto_nome,)
        cursor.execute(sql, val)
        return cursor.fetchall()

    # lista todos os produtos no estoque
    def listar_produtos(self):
        cursor = self.estoque.cursor()
        sql = "SELECT * FROM produtos"
        cursor.execute(sql)
        return cursor.fetchall()

    # recebe o id do produto e a quantidade
    # retorna True se o estoque possui a quantidade solicitada do produto
    def has_estoque(self, produto_id, qtd):
        cursor = self.estoque.cursor()
        sql = "SELECT * FROM produtos WHERE id = ?"
        val = (produto_id,)
        cursor.execute(sql, val)
        result = cursor.fetchone()
        try:
            if result[2] >= qtd:
                return True
        except:
            pass
        return False
