from django.http import JsonResponse
import django
import json
from django.core.serializers.json import DjangoJSONEncoder
from ZoneInfo import ZoneInfo


class ZoneInfo(DjangoJSONEncoder):
    def default(self, obj):
        if isinstance(obj, ZoneInfo):
            return str(obj)  # Convert ZoneInfo to a string
        return super().default(obj)


# In your Django settings, set the custom encoder
django.setup()


def custom_json_response(data, *args, **kwargs):
    return JsonResponse(data, encoder=ZoneInfo, *args, **kwargs)
