import Wallet from '../models/wallet.model.js';

// @desc: Get all notes belonging to a wallet address
// @route: GET /api/wallets/:wallet
// @access public
const getNotes = async(req, res) => {
    try {
        const {wallet} = req.params;
        if (!wallet) {
            return res.status(404).json({message: "Wallet address not found!"});
        }
        // select statement will get only the note field, excluding _id
        const wallet_notes = await Wallet.find({wallet}).select('notes -_id');
        if (!wallet_notes) {
            return res.status(404).json({message: "No notes were added for this address"});
        }
        res.status(200).json(wallet_notes);
    } catch(error) {
        res.status(500).json({message: error.message});
    }
};

// @desc: Create a note for a given wallet address
// @route: POST /api/wallets
// @access public
const createNote = async (req, res)=> {
    try {
        const {wallet, note} = req.body;
        if (!wallet || !note) {
            return res.status(400).json({ message: "Wallet address and note are required" });
        }
        // creating the body that is sent by client into the database schema
        const new_wallet = await Wallet.findOneAndUpdate({wallet}, {$push: { notes: note }}, {new: true, upsert: true});
        res.status(200).json(new_wallet);
    }
    catch(error) {
        res.status(500).json({message: error.message});
    }
};

// @desc: Get the wallet address and its notes based on id
// @route: GET /api/wallets/:id
// @access public
const getNoteById= async (req, res)=>{
    try {
        const {id} = req.params;
        const wallet = await Wallet.findById(id);
        res.status(200).json(wallet);
    } catch(error) {
        res.status(500).json({message: error.message});
    }
};

// @desc: Get list of all the wallet address with their respective notes
// @route: GET /api/wallets/
// @access public
const getWalletNotes = async(req, res) => {
    try {
        const wallets = await Wallet.find({});
        res.status(200).json(wallets);
    } catch(error) {
        res.status(500).json({message: error.message});
    }
};

// @desc: Delete a wallet entry and its corresponding notes
// @route: GET /api/wallet/:id
// @access public
const deleteNote = async(req, res) =>{
    try {
        const { id } = req.params;
        const del_id = await Wallet.findByIdAndDelete(id);
        if (!del_id) {
            return res.status(404).json({message: "Wallet does not exist"});
        }
        res.status(200).json({message: "Wallet address deleted!"});
    } catch(error) {
        res.status(500).json({message: error.message});
    }
}

export default {getNotes, createNote, deleteNote, getWalletNotes, getNoteById};