import sqlite3

class ControladorDeEstoque:
    # conecta ao banco de dados
    # cria os elementos se necessario
    def __init__(self):
        self.estoque = sqlite3.connect('distribuidora.db', check_same_thread=False)
        cursor = self.estoque.cursor()
        cursor.execute("CREATE TABLE IF NOT EXISTS produtos (barcode VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, brand VARCHAR(255) NOT NULL, weight FLOAT(10,7), price FLOAT(10,7) NOT NULL, qtd INTEGER UNSIGNED)")

    # encerra a conecxão com o banco de dados
    def close(self):
        self.estoque.close()

    # adiciona um novo produto ao estoque
    def add_novo_produto(self, barcode, name, brand, weight, price, qtd):
        cursor = self.estoque.cursor()
        sql = "INSERT INTO produtos (barcode, name, brand, weight, price, qtd) VALUES(?, ?, ?, ?, ?, ?)"
        val = (barcode, name, brand, weight, price, qtd)
        cursor.execute(sql, val)
        self.estoque.commit()

    # aumenta a quantidade do produto no estoque
    def add_produto(self, barcode, qtd):
        cursor = self.estoque.cursor()
        sql = "UPDATE produtos SET qtd = qtd + ? WHERE barcode = ?"
        val = (qtd, barcode)
        cursor.execute(sql, val)
        self.estoque.commit()

    # reduz a quantidade do produto no estoque
    def retirar_produto(self, barcode, qtd):
        cursor = self.estoque.cursor()
        sql = "UPDATE produtos SET qtd = qtd - ? WHERE barcode = ?"
        val = (qtd, barcode)
        cursor.execute(sql, val)
        self.estoque.commit()

    def remove_produto(self, barcode):
        cursor = self.estoque.cursor()
        sql = "DELETE FROM produtos WHERE barcode = ?"
        val = (barcode,)
        cursor.execute(sql, val)
        self.estoque.commit()

    # retorna um produto de acordo com o id
    def buscar_produto(self, barcode):
        cursor = self.estoque.cursor()
        sql = "SELECT * FROM produtos WHERE barcode = ?"
        val = (barcode,)
        cursor.execute(sql, val)
        return cursor.fetchone()

    def listar_produto_nome(self, name):
        cursor = self.estoque.cursor()
        sql = "SELECT * FROM produtos WHERE name = %?%"
        val = (name,)
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
    def has_estoque(self, barcode, qtd):
        cursor = self.estoque.cursor()
        sql = "SELECT * FROM produtos WHERE barcode = ?"
        val = (barcode,)
        cursor.execute(sql, val)
        result = cursor.fetchone()
        try:
            if result[-1] >= qtd:
                return True
        except:
            pass
        return False
