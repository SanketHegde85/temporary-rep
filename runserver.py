from waitress import serve

from pet_adoption.wsgi import application
# documentation: https://docs.pylonsproject.org/projects/waitress/en/stable/api.html

if __name__ == '__main__':
    serve(application, host = '10.16.2.89', port='8080')
