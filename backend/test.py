import unittest
from db_manager import DataBaseManager

class MyTestCase(unittest.TestCase):
    def test_db_connection(self):
        db_manager = DataBaseManager()
        status = db_manager.connect()
        db_manager.disconnect()
        self.assertEqual(status, True)


if __name__ == '__main__':
    unittest.main()
