from django.urls import path 

from .views import ngrams_comparison ;


urlpatterns = [ 


path('ngrams-comparison/', ngrams_comparison, name='ngrams_comparison'),

]