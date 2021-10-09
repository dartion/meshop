from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.views.generic import TemplateView
from django.conf.urls.static import static
from django.urls.conf import re_path

# To access photos/media of the products append static url path to admin/ path
urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.social.urls')),
    path('admin/', admin.site.urls),
] + static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)

# Catch all urls except above using ^.*
# All other urls needs to be handled by React!
urlpatterns += [
    re_path(r'^.*',
     TemplateView.as_view(template_name='index.html')
    )
]