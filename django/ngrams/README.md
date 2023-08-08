# Django

## Setup

The first thing to do is to clone the repository:

```sh
$ git clone https://github.com/nagasaipurvaz/pwa
$ cd django
$ cd ngrams

```

Run the pip env and install dependencies

```sh
$ pip install pipenv
$ pipenv shell
$ pipenv install django
$ pipenv install pymongo
```

Once `pip` has finished downloading the dependencies:
```sh
$ python manage.py runserver
```
And navigate to `http://127.0.0.1:8000/api/ngrams-comparison/`.

to get the json data from mongodb