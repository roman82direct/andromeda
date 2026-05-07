from django.conf import settings
from rest_framework_simplejwt.authentication import JWTAuthentication


class CookieJWTAuthentication(JWTAuthentication):
    """
    Класс аутентификации.

    Если токена нет в заголовках, берем из cookie.
    """

    def authenticate(self, request):
        header = self.get_header(request)

        if header is not None:
            token = self.get_raw_token(header)
        else:
            token = request.COOKIES.get(
                settings.SIMPLE_JWT['AUTH_COOKIE_ACCESS']
            )

        if token is None:
            return None

        validated_token = self.get_validated_token(token)
        return self.get_user(validated_token), validated_token
