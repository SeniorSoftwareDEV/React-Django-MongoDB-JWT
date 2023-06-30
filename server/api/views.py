from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
import pymongo
from werkzeug.security import generate_password_hash, check_password_hash
import datetime, jwt
client = pymongo.MongoClient('mongodb://localhost:27017/')

dbname = client['users']
admin = dbname['user_info']
def encode_auth_token(email):
    try:
        payload = {
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=0, seconds=3600),
            'iat': datetime.datetime.utcnow(),
            'sub': email
        }
        
        return jwt.encode(
            payload,
            'Joshua',
            algorithm='HS256'
        )
    except Exception as e:
        return e
    
@api_view(['POST'])
def signup(request):
    name = request.data['name']
    email = request.data['email']
    password = request.data['password']
    search_info = list(admin.find({'email': email}))
    if len(search_info) > 0:
        return Response('failed')
    else:
        admin.insert_one({
            'name': name,
            'email': email,
            'password': generate_password_hash(password)
        })
    return Response('success')

@api_view(['POST'])
def signin(request):
    email = request.data['email']
    password = request.data['password']
    search_info = list(admin.find({'email': email}))
    if len(search_info) > 0:
        if check_password_hash(search_info[0]['password'], password) == True:
            token = encode_auth_token(email)
            return Response('success')
        else:
            return Response({'msg':'error', 'token': token})
    else:
        return Response('failed')