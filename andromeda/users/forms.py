import phonenumbers

from django import forms
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm


User = get_user_model()


class RegistrationForm(UserCreationForm):

    phone = forms.CharField(
        max_length=17,
        widget=forms.TextInput(attrs={'placeholder': '+79991234567'}),
        label='Номер телефона'
    )

    class Meta:
        model = User
        fields = ('phone', 'email', 'password1', 'password2')

    def clean_phone(self):
        phone = self.cleaned_data['phone']
        try:
            parsed = phonenumbers.parse(phone, 'RU')
            if not phonenumbers.is_valid_number(parsed):
                raise forms.ValidationError('Некорректный номер телефона.')
            return phonenumbers.format_number(
                parsed, phonenumbers.PhoneNumberFormat.E164
            )
        except phonenumbers.NumberParseException:
            raise forms.ValidationError('Неверный формат номера.')


class PhoneLoginForm(AuthenticationForm):
    username = forms.CharField(
        label='Номер телефона',
        widget=forms.TextInput(attrs={'placeholder': '+79991234567'})
    )
