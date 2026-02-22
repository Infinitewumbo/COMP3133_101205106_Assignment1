const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    first_name: { 
        type: String, 
        required: [true, 'First name is required'] 
    },
    last_name: { 
        type: String, 
        required: [true, 'Last name is required'] 
    },
    email: { 
        type: String, 
        unique: true, 
        required: [true, 'Email is required'] 
    },
    gender: { 
        type: String, 
        enum: ['Male', 'Female', 'Other'], // Constraint: Male/Female/Other
        required: true 
    },
    designation: { 
        type: String, 
        required: true 
    },
    salary: { 
        type: Number, 
        min: [1000, 'Salary must be at least $1000'], // Constraint: >= 1000
        required: true 
    },
    date_of_joining: { 
        type: Date, 
        required: true 
    },
    department: { 
        type: String, 
        required: true 
    },
    employee_photo: { 
        type: String // Stores the Cloudinary URL/path
    },
    created_at: { 
        type: Date, 
        default: Date.now 
    },
    updated_at: { 
        type: Date, 
        default: Date.now 
    }
});

// Middleware to update the updated_at field on every save
EmployeeSchema.pre('save', function(next) {
    this.updated_at = Date.now();
    next();
});

module.exports = mongoose.model('Employee', EmployeeSchema);