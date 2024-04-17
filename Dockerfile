FROM python:3.12

WORKDIR /app

COPY . .

RUN pip install -r requirements.txt && \
    python manage.py makemigrations && \
    python manage.py migrate 
    # DJANGO_SUPERUSER_USERNAME=sanket \
    # DJANGO_SUPERUSER_EMAIL=sanket@example.com \
    # DJANGO_SUPERUSER_PASSWORD=sanket \
    # python manage.py createsuperuser --noinput

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
