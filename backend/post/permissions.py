from rest_framework import permissions


class AllowGuest(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if not obj.user == request.user:
            return True


class IsAuthorOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow the author of a post to edit or delete it.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed for any request
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the author of the post
        return obj.author == request.user
