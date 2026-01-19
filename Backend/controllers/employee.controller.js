const Employee = require("../models/employee.model");

const bcrypt = require("bcrypt");
const createEmployee = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // validation
        if ((!name, !email, !password)) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // check existing user
        const existinguser = await Employee.findOne({ email });
        if (existinguser) {
            return res.status(400).json({
                success: false,
                message: "User already exist",
            });
        }

        const hashpassword = await bcrypt.hash(password, 10);

        // create employee
        const employee = await Employee.create({
            name,
            email,
            password: hashpassword,
            role: role || "user",
        });
        return res.status(201).json({
            success: true,
            message: "User created succesfully!",
            data: employee,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};



module.exports = {
    createEmployee,
};
