from waitress import serve

from pet_adoption.wsgi import application
# documentation: https://docs.pylonsproject.org/projects/waitress/en/stable/api.html

if __name__ == '__main__':
    serve(application, host = '10.112.210.191', port='8080')
