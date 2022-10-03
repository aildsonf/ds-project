FROM python:3.8

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

RUN mkdir -p controlers
COPY controlers/* controlers/

ADD controlers/controlador_pedidos.py controlers/controlador_estoque.py gerenciador.py main.py ./

CMD ["python", "./main.py"]