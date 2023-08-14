from .dev import *
from pathlib import Path

DEBUG = False

ALLOWED_HOSTS = ['*']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'LIVE_TOUR_STYLE.sqlite3',
    }
}
