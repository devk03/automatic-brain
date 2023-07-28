import sqlite3

conn = sqlite3.connect('database.db')

cur = conn.cursor()

print("Opened database successfully")

conn.execute('CREATE TABLE articles (points TEXT, concept TEXT, date TEXT)')
conn.close()