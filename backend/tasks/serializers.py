from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%Y-%m-%d", read_only=True)

    class Meta:
        model = Task
        fields = '__all__' 
