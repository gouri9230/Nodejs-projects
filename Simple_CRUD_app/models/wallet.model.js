import mongoose, { Schema } from 'mongoose';

const WalletSchema = new Schema(
    {
        wallet: {
            type: String,
            required: [true, "Please enter your address"],
            default: "0x00",
            unique: true
        },
        notes: {
            type: [String],
            required: [true, "Please enter a note message"],
            default: []
        },
    },
    {
        timestamps: true,
    }
);

const Wallet = mongoose.model("WalletApp", WalletSchema);
export default Wallet;