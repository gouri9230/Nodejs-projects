import express from 'express'
import mongoose from 'mongoose'
import Wallet from './models/wallet.model.js' 

const app = express()

// adding a middleware
app.use(express.json())

// connect to a server
app.listen(3000, ()=>{
    console.log("Server is listening on port 3000");
});

// connect to MongoDB database
mongoose.connect('mongodb+srv://shrigourinavaratna:2KNhNB1T46bfZG5w@mybackenddb.wbtaesl.mongodb.net/Node-API?retryWrites=true&w=majority&appName=MyBackendDB')
  .then(() => {
    console.log('Connected to database!')})
  .catch(()=>{
    console.log("Connection to database failed")
});

// req - request: whatever is sent by client to server
// res - response: whatever response is sent by server to client 
app.get('/', (req, res) => {
    res.send('Hello from server after nodemon!!')
});

// Read all notes belonging to a wallet address
app.get('/api/wallets/:wallet', async(req, res) => {
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
})

// Create a note for a given wallet address
app.post('/api/wallets', async (req, res)=> {
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
});

// get the wallet address and its notes based on unique id
app.get('/api/wallets/:id', async (req, res)=>{
    try {
        const {id} = req.params;
        const wallet = await Wallet.findById(id);
        res.status(200).json(wallet);
    } catch(error) {
        res.status(500).json({message: error.message});
    }
})

// list all the wallet address with their respective notes
app.get('/api/wallets', async(req, res) => {
    try {
        const wallets = await Wallet.find({});
        res.status(200).json(wallets);
    } catch(error) {
        res.status(500).json({message: error.message});
    }
});

// delete a wallet entry and its corresponding notes
app.delete('/api/wallet/:id', async(req, res) =>{
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
}) 