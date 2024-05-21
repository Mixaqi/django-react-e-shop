FROM python:3.12

WORKDIR /server

COPY . .

COPY requirements.txt .
    # mkdir -p /vol/web/static &&  \
    # mkdir -p /vol/web/media 
RUN pip install -r requirements.txt