import phonenumbers

from django import forms
from django.contrib.auth import get_user_model


User = get_user_model()


class PhoneForm(forms.Form):
    phone = forms.CharField(
        max_length=17,
        widget=forms.TextInput(attrs={'placeholder': '+79991234567'}),
        label='Номер телефона'
    )

    def clean_phone(self):
        phone = self.cleaned_data['phone']
        try:
            parsed = phonenumbers.parse(phone, "RU")
            if not phonenumbers.is_valid_number(parsed):
                raise forms.ValidationError('Некорректный номер телефона.')
            return phonenumbers.format_number(
                parsed, phonenumbers.PhoneNumberFormat.E164
            )
        except phonenumbers.NumberParseException:
            raise forms.ValidationError('Неверный формат номера.')


class SmsCodeForm(forms.Form):
    phone = forms.CharField(widget=forms.HiddenInput)
    code = forms.CharField(max_length=6, label='Введите полученный код')


class UsernameForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['username']
