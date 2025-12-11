from django.contrib.auth import login, get_user_model
from django.urls import reverse_lazy
from django.views.generic import FormView

from .forms import PhoneForm, SmsCodeForm
from .models import SmsCode


User = get_user_model()


class SendSmsCodeView(FormView):
    template_name = 'user/send_code.html'
    form_class = PhoneForm
    success_url = reverse_lazy('user:verify_code')

    def form_valid(self, form):
        phone = form.cleaned_data['phone']
        sms_code = SmsCode.generate_code(phone)
        print(sms_code.code)
        self.request.session['phone'] = phone
        return super().form_valid(form)


class VerifySmsCodeView(FormView):
    template_name = 'user/verify_code.html'
    form_class = SmsCodeForm
    success_url = reverse_lazy('products:index')

    def get_initial(self):
        initial = super().get_initial()
        initial['phone'] = self.request.session.get('phone')
        return initial

    def form_valid(self, form):
        phone = form.cleaned_data['phone']
        code = form.cleaned_data['code']
        sms = (
            SmsCode.objects
            .filter(phone=phone, code=code)
            .order_by('-created_at')
            .first()
        )
        if not sms or sms.is_expired():
            form.add_error('code', 'Неверный или просроченный код')
            return self.form_invalid(form)

        user, created = User.objects.get_or_create(phone=phone)
        if created:
            user.username = phone
            user.save()
        login(self.request, user)
        return super().form_valid(form)
