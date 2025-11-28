from django.shortcuts import render, redirect
from django.contrib import messages, auth
from django.urls import reverse_lazy
from django.views.generic import FormView, CreateView
from .forms import PhoneLoginForm, RegistrationForm


class LoginView(FormView):
    form_class = PhoneLoginForm
    template_name = 'user/login.html'
    success_url = reverse_lazy('two-factor:setup')

    def form_valid(self, form):
        username = form.cleaned_data['username']
        password = form.cleaned_data['password']

        user = auth.authenticate(
            request=self.request,
            username=username,
            password=password
        )

        if user is not None:
            self.request.session['two_factor_user_id'] = user.id
            return super().form_valid(form)
        else:
            messages.error(self.request, 'Неверный номер телефона или пароль.')
            return self.form_invalid(form)


class RegisterView(CreateView):
    form_class = RegistrationForm
    template_name = 'user/registration_form.html'
    success_url = reverse_lazy('products:index')
