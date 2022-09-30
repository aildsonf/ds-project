FROM python:3.8

#RUN pip install pika
RUN mkdir -p controlers
COPY controlers/* controlers/

ADD main.py controlers/controlador_pedidos.py controlers/controlador_estoque.py gerenciador.py main.py ./

CMD ["python", "./main.py"]