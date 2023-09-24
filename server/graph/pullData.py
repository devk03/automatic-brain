from supabase import create_client, Client

def queryData(SUPABASE_URL, SUPABASE_KEY):
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
    response = supabase.table('entries').select("*").execute()
    print(response)