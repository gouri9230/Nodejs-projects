import express from 'express'
import dotenv from 'dotenv';
import connectDb from './config/connectionDb.js';
import {getNotes, createNote, getNoteById, getWalletNotes, deleteNote} from './routes.notes.js';
dotenv.config();
const app = express()

connectDb();
// adding a middleware
app.use(express.json())

// connect to a server
app.listen(process.env.PORT, ()=>{
    console.log("Server is listening on port 3000");
});

app.get(getNotes)
app.post(createNote);
app.get(getNoteById)
app.get(getWalletNotes);
app.delete(deleteNote); 