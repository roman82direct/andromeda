from django.urls import path, reverse_lazy
from django.views.generic.edit import CreateView

from .forms import RegistrationForm

app_name = 'user'

urlpatterns = [
    path(
        'registration/',
        CreateView.as_view(
            template_name='user/registration_form.html',
            form_class=RegistrationForm,
            success_url=reverse_lazy('products:index'),
        ),
        name='registration',
    ),
]
