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
        "data": {"title": f"{data['title']}", "content": f"{data['text']}"},
        "author": {"name": f"{data['author']}"},
        "tags": data['tags']
    }
    # Insert data using the Supabase client
    data, count = supabase.table('entries').insert(entry_data).execute()