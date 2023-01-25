from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
from database import db

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get('/')
def getRoutes():
    return ['notes', 'fadol/<pk>']


@app.get('/notes')
def get_notes():
    notes = db.sql(
        'SELECT * FROM notesapp.notes ORDER BY __updatedtime__ DESC')
    return notes


@app.get('/notes/{id}')
def get_note_by_id(id=str):
    notes = db.search_by_hash('notesapp', 'notes', [id])
    return notes


@app.put('/notes/{id}')
def update_note_by_id(id=str, data=Body()):
    db.update('notesapp', 'notes', [{'id': id, 'body': data['body']}])
    notes = db.search_by_value(
        'notesapp', 'notes', 'id', '*', get_attributes=['*'])
    return notes


@app.post('/notes')
def add_notes(data=Body()):
    db.insert('notesapp', 'notes', [{"body": data['body']}])
    notes = db.search_by_value(
        'notesapp', 'notes', 'id', '*', get_attributes=['*'])
    return notes


@app.delete('/notes/{id}')
def delete_notes_by_id(id=str):
    db.delete('notesapp', 'notes', [id])
    notes = db.search_by_value(
        'notesapp', 'notes', 'id', '*', get_attributes=['*'])
    return notes
