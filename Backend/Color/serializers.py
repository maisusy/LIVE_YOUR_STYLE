from rest_framework import serializers
from Color.models import Color

class ColorSerializers(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = ['id','nombre','tono','productos']