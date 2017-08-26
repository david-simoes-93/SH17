

class UserProfile:
    _user_id = None

    def __init__(self, user_id):
        self._user_id = user_id

    def has_profile(self):

        # TODO: check if user exists

        return True

    def get_profile_for_datetime(self, datetime):

        return ["cenas para esta data e hora: " + str(datetime)]