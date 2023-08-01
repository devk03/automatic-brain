userTableSchema = """
CREATE TABLE IF NOT EXISTS Users (
    ID INTEGER PRIMARY KEY,
    NAME TEXT NOT NULL,
    AGE INTEGER NOT NULL,
    EMAIL TEXT NOT NULL,
    PASSWORD TEXT NOT NULL
);
"""

topicSchema = """
CREATE TABLE IF NOT EXISTS Categories (
    Category TEXT PRIMARY KEY
);
"""

notesTableSchema = """
CREATE TABLE IF NOT EXISTS Note (
    NoteID INTEGER PRIMARY KEY,
    Entry TEXT NOT NULL,
    Category TEXT NOT NULL,
    UserId INTEGER NOT NULL,
    TopicName TEXT NOT NULL,
    FOREIGN KEY (Category) REFERENCES Categories(Category),
    FOREIGN KEY (UserId) REFERENCES Users(ID)
);
"""

articlesTableSchema = """
CREATE TABLE IF NOT EXISTS Articles (
    ArticleID INTEGER PRIMARY KEY,
    Author TEXT NOT NULL,
    Title TEXT NOT NULL,
    Date TEXT NOT NULL,
    URL TEXT NOT NULL,
    NoteID INTEGER NOT NULL,
    FOREIGN KEY (NoteID) REFERENCES Note(NoteID)
);
"""
schemas = [userTableSchema, topicSchema, notesTableSchema, articlesTableSchema]
