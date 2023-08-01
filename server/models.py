import sqlite3

def connect_db():
    return sqlite3.connect('database.db')

def close_db(conn):
    conn.close()

def create_table(conn, schema):
    try:
        conn.execute(schema)
    except sqlite3.OperationalError as e:
        print(f"Error: {e}")