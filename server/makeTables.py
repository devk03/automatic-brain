from models import connect_db, close_db, create_table
from schema import schemas
def sendNotesPostRequest():
    db = connect_db()
    print("Opened database successfully")
    
def main():
    db = connect_db()
    print("Opened database successfully")
    
    for schema in schemas:
        create_table(db, schema)
    
    print("Table created successfully")
    close_db(db)

if __name__ == "__main__":
    main()
