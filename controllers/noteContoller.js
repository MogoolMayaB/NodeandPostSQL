const asyncHandler = require('express-async-handler'); 

//connect DB 
const pool = require('../config/db');

//@route GET/api/note 
//@desc Get all notes 
//@access public 
const getNotes = asyncHandle(async (req, res) => {
    const queryString = 'SELECT * FROM notes';
    const { rows } = await pool.query(queryString);
    res.status(200).json(rows);

});

//@route POST /api/note 
//@des Creating a note 
//@access Public 

const createNote = asyncHandler(async (req, res) => {
    const { note } = req.body;
    if (!note) {
        res.status(400);
        throw new Error('please add a note');
    }
    const queryString = 'INSERT INTO notes (note) VALUES ($1) RETURNING *';
    const { rows } = await pool.query(queryString, [note]);
    res.status(200).json(rows);
    
})

//@route PUT/api/note
//@desc Update a note 
//@acess Public 

const updateNote = asyncHandler(async (req, res) => {
    const { note, done} = req.body;
    const { id } = req.params;
        if (!note) {
        res.status(400);
        throw new Error('please add a note');
    }
    const queryString = 'UPDATE notes SET note = $1, done = $2 WHERE id = $3 RETURNING *';
    const { rows } = await pool.query(queryString, [note, done, id]);
    res.status(200).json(rows);
    
})

//@route DELETE api.note
//@desc DLETE a note 
//@acess Public 

const deleteNote = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const queryString = 'DELETE FROM notes WHERE id = $1 RETURNING *';
     await pool.query(queryString, [id]);
     res.status(200).json({msg: 'Note deleted successfully'});
});

module.exports = {
    getNotes,
    createNote,
    updateNote,
    deleteNote,

};
