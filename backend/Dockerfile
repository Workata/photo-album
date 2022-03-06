FROM python:3.9-alpine3.13

# * Create new directory for backend
RUN mkdir backend
WORKDIR /backend

# * Copy backend files
COPY . ./

# * update system and pip
RUN apk update && apk upgrade
RUN apk add build-base
RUN /usr/local/bin/python -m pip install --upgrade pip
RUN pip install -U setuptools

# * install needed programs/libs/compilers
RUN apk add --no-cache --virtual .build-deps gcc libc-dev make \
    && apk add jpeg-dev zlib-dev libjpeg \
    && pip install -r requirements.txt \
    && apk del .build-deps

# * run app
EXPOSE 80
CMD ["uvicorn", "src.main:app", "--host=0.0.0.0", "--port=80"]

# * Manual setup
# sudo docker build . -t backend-image
# sudo docker run -p 80:80 --name backend-container backend-image:latest

# uvicorn app.main:app --host=0.0.0.0 --port=3001