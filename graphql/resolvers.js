const User = require('../models/User');
const Employee = require('../models/Employee');
const bcrypt = require('bcryptjs');
const cloudinary = require('../config/cloudinary');

const resolvers = {
  Query: {
    login: async (_, { username, password }) => {
      const user = await User.findOne({ $or: [{ username }, { email: username }] });
      if (!user) throw new Error("User not found");
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new Error("Invalid credentials");
      return "Login Successful";
    },
    getAllEmployees: async () => await Employee.find(),
    searchEmployeeById: async (_, { eid }) => await Employee.findById(eid),
    searchEmployeeByDepOrDes: async (_, { category }) => {
        return await Employee.find({ 
            $or: [{ department: category }, { designation: category }] 
        });
    }
  },

  Mutation: {
signup: async (_, args) => {
      if (!args.email || !args.email.includes('@')) {
        throw new Error("Validation Error: Invalid email format");
      }
      if (!args.password || args.password.length < 6) {
        throw new Error("Validation Error: Password must be at least 6 characters");
      }
      const newUser = new User(args);
      return await newUser.save();
    },
    addEmployee: async (_, args) => {
      let photoUrl = "";
      if (args.employee_photo) {
        const res = await cloudinary.uploader.upload(args.employee_photo, { folder: "comp3133" });
        photoUrl = res.secure_url;
      }
      const emp = new Employee({ ...args, employee_photo: photoUrl });
      return await emp.save();
    },
    updateEmployeeByEid: async (_, { eid, ...updates }) => {
      return await Employee.findByIdAndUpdate(eid, updates, { new: true });
    },
    deleteEmployeeByEid: async (_, { eid }) => {
      await Employee.findByIdAndDelete(eid);
      return "Employee deleted successfully";
    }
  }
};

module.exports = resolvers;