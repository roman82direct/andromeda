from django.conf import settings


class CookieAuthMixin:
    """Миксин добавления/удаления токенов в cookie."""

    def set_auth_cookies(self, response, access_token, refresh_token):
        access_lifetime = settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME']
        refresh_lifetime = settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME']

        response.set_cookie(
            key=settings.SIMPLE_JWT['AUTH_COOKIE_ACCESS'],
            value=access_token,
            max_age=int(access_lifetime.total_seconds()),
            httponly=True,
            secure=settings.AUTH_COOKIE_SECURE,  # На проде по https True
            samesite='Lax',
            path=settings.SIMPLE_JWT['AUTH_COOKIE_ACCESS_PATH'],
        )
        response.set_cookie(
            key=settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'],
            value=refresh_token,
            max_age=int(refresh_lifetime.total_seconds()),
            httponly=True,
            secure=settings.AUTH_COOKIE_SECURE,
            samesite='Lax',
            path=settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH_PATH'],
        )
        return response

    def clear_auth_cookies(self, response):
        response.delete_cookie(
            key=settings.SIMPLE_JWT['AUTH_COOKIE_ACCESS'],
            path=settings.SIMPLE_JWT['AUTH_COOKIE_ACCESS_PATH'],
        )
        response.delete_cookie(
            key=settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'],
            path=settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH_PATH'],
        )
        return response
