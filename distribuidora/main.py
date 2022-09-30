from threading import Thread

from gerenciador import Gerenciador

if __name__ == '__main__':

    gerenciador = Gerenciador()
    t1 = Thread(target=gerenciador.start)
    t1.start()
    gerenciador.main()
    gerenciador.stop()
