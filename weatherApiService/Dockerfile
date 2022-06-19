FROM python:3.9.5

ADD . /code
WORKDIR /code

ENV FLASK_APP=weatherApiService.py

RUN python3 -m pip install --upgrade pip
RUN pip3 install -r requirements.txt
EXPOSE 3400

COPY . .
CMD ["python3", "./weatherApiService.py"]