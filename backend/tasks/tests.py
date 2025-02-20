from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Task

class TaskAPITests(APITestCase):
    def setUp(self):
        self.task = Task.objects.create(
            title='Test Task',
            description='A test description',
            assigned_to='John Doe',
            status='Pending'
        )
        self.list_create_url = reverse('tasks:task-list-create')

    def test_get_tasks(self):
        """Ensure we can retrieve a list of tasks."""
        response = self.client.get(self.list_create_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsInstance(response.data, list)
        self.assertGreaterEqual(len(response.data), 1)

    def test_create_task(self):
        """Ensure we can create a new task."""
        new_task_data = {
            'title': 'New Task',
            'description': 'New description',
            'assigned_to': 'Jane Doe',
            'status': 'Pending'
        }
        response = self.client.post(self.list_create_url, new_task_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['title'], new_task_data['title'])
        self.assertIn('created_at', response.data)
        self.assertIsNotNone(response.data['created_at'])

    def test_update_task(self):
        """Ensure we can update an existing task."""
        detail_url = reverse('tasks:task-detail', kwargs={'pk': self.task.pk})
        updated_data = {
            'title': 'Updated Task',
            'description': 'Updated description',
            'assigned_to': 'John Doe',
            'status': 'In Progress'
        }
        response = self.client.put(detail_url, updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], updated_data['title'])
        self.assertIn('created_at', response.data)
        self.assertIsNotNone(response.data['created_at'])

    def test_delete_task(self):
        """Ensure we can delete a task."""
        detail_url = reverse('tasks:task-detail', kwargs={'pk': self.task.pk})
        response = self.client.delete(detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Task.objects.filter(pk=self.task.pk).exists())
