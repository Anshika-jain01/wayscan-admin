from pymongo import MongoClient

client = MongoClient("mongodb+srv://admin:admin123@wayscan1.ywkfvfy.mongodb.net/?appName=Wayscan1")
db = client["civic_db"]

detections = db["detections"]
clusters = db["clusters"]