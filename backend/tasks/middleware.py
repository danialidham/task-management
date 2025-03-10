from django.utils.deprecation import MiddlewareMixin
from django.http import HttpResponse

class DebugCORSHeadersMiddleware(MiddlewareMixin):
    def process_response(self, request, response):
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
        response["Access-Control-Allow-Headers"] = "*"
        return response
