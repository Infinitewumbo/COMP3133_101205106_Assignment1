const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true }, // Primary Key 
    email: { type: String, required: true, unique: true },    // Unique 
    password: { type: String, required: true },               // Encrypted 
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

// Hash password before saving
UserSchema.pre('save', async function() {
    if (!this.isModified('password')) return;
    
    // Hash the password
    this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model('User', UserSchema);