import json
import os.path

PROFILES_FOLDER = 'app/profiles/'


class UserProfile:

    def __init__(self, user_id):
        self.user_id = user_id
        self.profile_file_path = PROFILES_FOLDER + str(self.user_id) + '.json'
        self.user_data = {}

    def has_profile(self):

        if os.path.exists(self.profile_file_path):
            return True
        return False

    def load_user_data(self):
        with open(self.profile_file_path) as data_file:
            return json.load(data_file)

    def get_profile_for_datetime(self, dt):
        self.user_data = self.load_user_data()

        # TODO: make some magic here
        result = self.user_data

        return result