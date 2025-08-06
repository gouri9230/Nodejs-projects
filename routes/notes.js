import express from express;
import {getNotes, createNote, deleteNote, getWalletNotes, getNoteById} from '../controllers/notesController';
router = express.Router();

router.get('/api/wallets/:wallet', getNotes);
router.post('/api/wallets', createNote);
router.get('/api/wallets/:id', getNoteById);
router.get('/api/wallets', getWalletNotes);
router.delete('/api/wallet/:id', deleteNote);

export default router;