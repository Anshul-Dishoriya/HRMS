import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.getenv("SECRET_KEY", "django-insecure-fallback-key")

DEBUG = False

ALLOWED_HOSTS = ["*"]

INSTALLED_APPS = [
    "django.contrib.contenttypes",
    "django.contrib.auth",
    "corsheaders",
    "rest_framework",
    "employees",
    "attendance",
    "analytics",
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
]

ROOT_URLCONF = "hrms.urls"

WSGI_APPLICATION = "hrms.wsgi.application"

DATABASES = {
    "default": dj_database_url.config(
        default=os.getenv("DATABASE_URL"),
        conn_max_age=600,
        ssl_require=True
    )
}
# "default": {
#     "ENGINE": "django.db.backends.postgresql",
#     "NAME": os.getenv("PSQL_DB", "hrms"),
#     "USER": os.getenv("PSQL_USER", "postgres"),
#     "PASSWORD": os.getenv("PSQL_PASS", ""),
#     "HOST": os.getenv("PSQL_HOST", "127.0.0.1"),
#     "PORT": os.getenv("PSQL_PORT", "5432"),
# }

CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOWED_ORIGINS = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://ethara-ai-psi.vercel.app"
    ]

CSRF_TRUSTED_ORIGINS = [
    "https://ethara-ai-psi.vercel.app"
]

REST_FRAMEWORK = {
    "DEFAULT_RENDERER_CLASSES": [
        "rest_framework.renderers.JSONRenderer",
    ],
}

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
