'''
    update_users_test.py
    
    Fill in what this test is for here
'''

import unittest
from app import add

USERNAME_INPUT = "username"
USERS_INPUT = 'users'
EXPECTED_OUTPUT = "expected"

class UpdateUserTestCase(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [
            {
                USERNAME_INPUT: "Naman",
                USERS_INPUT: {
                    'player_x': None,
                    'player_o': None,
                    'spectators': [],
                },
                EXPECTED_OUTPUT: {
                    'player_x': "Naman",
                    'player_o': None,
                    'spectators': [],
                }
            },
            
            {
                USERNAME_INPUT:  "Hossein",
                USERS_INPUT: {
                    'player_x': None,
                    'player_o': None,
                    'spectators': [],
                },
                EXPECTED_OUTPUT: {
                    'player_x': "Hossein",
                    'player_o': None,
                    'spectators': [],
                }
            },
            
            {
                USERNAME_INPUT:  "",
                USERS_INPUT: {
                    'player_x': None,
                    'player_o': None,
                    'spectators': [],
                },
                EXPECTED_OUTPUT: {
                    'player_x': "",
                    'player_o': None,
                    'spectators': [],
                }
            },
            
        ]
        
        self.failure_test_params = [
            {
                USERNAME_INPUT: "Naman",
                USERS_INPUT: {
                    'player_x': None,
                    'player_o': None,
                    'spectators': [],
                },
                EXPECTED_OUTPUT: {
                    'player_x': None,
                    'player_o': "Naman",
                    'spectators': [],
                }
            },
            
            {
                USERNAME_INPUT: "Naman",
                USERS_INPUT: {
                    'player_x': None,
                    'player_o': None,
                    'spectators': [],
                },
                EXPECTED_OUTPUT: {
                    'player_x': None,
                    'player_o': None,
                    'spectators': ["Naman"],
                }
            },
            
            {
                USERNAME_INPUT: "Naman",
                USERS_INPUT: {
                    'player_x': None,
                    'player_o': None,
                    'spectators': [],
                },
                EXPECTED_OUTPUT: {
                    'player_x': "nama",
                    'player_o': None,
                    'spectators': [],
                }
            },
        ]
        
        
        self.in_test_params = [
            {
                USERNAME_INPUT: "Naman",
                USERS_INPUT: {
                    'player_x': None,
                    'player_o': None,
                    'spectators': [],
                },
                EXPECTED_OUTPUT: {
                    'player_x': "Naman",
                    'player_o': None,
                    'spectators': ["Nama"],
                }
            },
            
            {
                USERNAME_INPUT: "Hossein",
                USERS_INPUT: {
                    'player_x': None,
                    'player_o': None,
                    'spectators': [],
                },
                EXPECTED_OUTPUT: {
                    'player_x': "Hossein",
                    'player_o': None,
                    'spectators': ["Hosein"],
                }
            },
            
            {
                USERNAME_INPUT: "",
                USERS_INPUT: {
                    'player_x': None,
                    'player_o': None,
                    'spectators': [],
                },
                EXPECTED_OUTPUT: {
                    'player_x': "",
                    'player_o': None,
                    'spectators': ["Naman"],
                }
            },
            
        ]
    def test_add_user(self):
        for test in self.success_test_params:
            adding_user = add(test[USERNAME_INPUT],test[USERS_INPUT])
            actual_result = adding_user
            expected_result = test[EXPECTED_OUTPUT]

            self.assertEqual(len(actual_result), len(expected_result))
            self.assertEqual(actual_result, expected_result)
            self.assertEqual(actual_result['player_x'], expected_result['player_x'] )
            
    def test_user(self):
        for test in self.failure_test_params:
            adding_user = add(test[USERNAME_INPUT],test[USERS_INPUT])
            actual_result = adding_user
            expected_result = test[EXPECTED_OUTPUT]

            #self.assertNotEqual(len(actual_result), len(expected_result))
            self.assertNotEqual(actual_result, expected_result)
            self.assertNotEqual(actual_result['player_x'], expected_result['player_x'] )
    
    def test_user_in(self):
        for test in self.in_test_params:
            adding_user = add(test[USERNAME_INPUT],test[USERS_INPUT])
            actual_result = adding_user
            expected_result = test[EXPECTED_OUTPUT]

            #self.assertNotEqual(len(actual_result), len(expected_result))
            #self.assertIn(actual_result, expected_result)
            self.assertIn(actual_result['player_x'], expected_result['player_x'] )
            self.assertNotIn(actual_result['player_x'], expected_result['spectators'] )

if __name__ == "__main__":
    unittest.main()