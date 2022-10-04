from threading import Thread
from tkinter import *

from gerenciador import Gerenciador

if __name__ == '__main__':
    # root = Tk()
    gerenciador = Gerenciador()
    t1 = Thread(target=gerenciador.start)
    t1.start()
    # root.mainloop()
    gerenciador.inteface()
    gerenciador.stop()
