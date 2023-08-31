import os
from supabase import create_client, Client
from .gptKey import SUPABASE_URL
from .gptKey import SUPABASE_KEY

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def insertData(data):
    print("Inserting data into the database")
    table = supabase.table('entries')
    table.insert("hello").execute()
    entry_data = {
        "data": {"title": "Sample Entry", "content": "This is a sample entry."},
        "author": {"name": "Dev Kunjadia", "email": "dtkunjadia@gmail.com"},
        "tags": ["tag1", "tag2", "tag3"]
    }
    # Insert data using the Supabase client
    data, count = supabase.table('entries').insert(entry_data).execute()