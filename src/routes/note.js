import express from 'express'
import {addNote, fetchNote, updateNote, deleteNote, shareNote} from '../controllers/note.js'
import authMiddleware from "../middleware/auth.js"

const router = express.Router()

router.use(['/add', '/fetch', '/update', '/delete'], authMiddleware)

router.post('/add', addNote)
router.get('/fetch', fetchNote)
router.post('/update/:id', updateNote)
router.delete('/delete/:id', deleteNote)
router.post('/share/:id', shareNote)

export default router