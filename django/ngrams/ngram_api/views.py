
from django.core import serializers
from .models import input_collection
from django.http import  JsonResponse , HttpResponse
from nltk.util import ngrams
import json

# Create your views here.


def ngrams_comparison(request):
    n=2 
    if request.method == 'GET':
        documents = list(input_collection.find())
        texts = [doc['inputString'] for doc in documents]  
        
        ngrams_list=[list(ngrams(text.lower().split(), n)) for text in texts]
        print(ngrams_list)
        ngrams_data = []
        for i, ngrams_text in enumerate(ngrams_list):
            ngrams_data.append({
                    'text': texts[i],
                    'ngrams': ngrams_text
                })

        return JsonResponse({'ngrams_data': ngrams_data})


    