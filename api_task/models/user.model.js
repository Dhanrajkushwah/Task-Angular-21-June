const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: { type: String, unique: true, required: true },
    phone_number: {
        type: String,
        required: true,
        minlength: 10,  
        maxlength: 12    
    },
    address: {
        type: String,
    }


},
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
    });
const userData = mongoose.model('user', userSchema);
module.exports = userData;





