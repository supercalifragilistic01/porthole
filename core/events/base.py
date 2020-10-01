from django.db import models



# ACTIVITIES
class EventManager(models.Manager):
    use_in_migrations = True

    def log(self, _type, _obj):
        log.event("core\t", "Event", "create..")
        event = self.model(type=_type,
                              object=_obj)
        log.event("core\t", "Event", "save..")
        event.save()
        return event

class Event(models.Model):
    """Any pertinents logable events related to an object (entity/element)"""
    TYPES = (
        ('list', 'List'),
        ('open', 'Open'),
        ('edit', 'Edit'),
        ('create', 'Create'),
        ('delete', 'Delete'),
        ('read_permissions', 'Read Permissions'),
        ('edit_permissions', 'Edit Permissions'),
    )
    type = models.CharField(max_length=50, choices=TYPES)

    objects = EventManager()
    class Meta:
        verbose_name = 'Activitie'
        verbose_name_plural = 'Activities'

    def get_all(self):
        return Event.objects.all()


class EventFeedManager(models.Manager):
    use_in_migrations = True

    def create(self):
        event_feed = self.model()
        event_feed.save()
        return event_feed

class EventFeed(models.Model):
    posts = models.ManyToManyField(Event, related_name="event_feeds")

    objects = EventFeedManager()
    class Meta:
        verbose_name = 'Event Feed'
        verbose_name_plural = 'Event Feeds'
