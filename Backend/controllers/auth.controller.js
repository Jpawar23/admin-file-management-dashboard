const Employee = require("../models/employee.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginEmployee = async (req, res) => {
    try {
        const { email, password } = req.body;

        // validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        // find user
        const employee = await Employee.findOne({ email }).select("+password");
        if (!employee) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        // Check active
        if (!employee.isActive) {
            return res.status(403).json({
                success: false,
                message: "Account is deactivated",
            });
        }

        // Password match
        const isMatch = await bcrypt.compare(password, employee.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }
        // Generate token
        const token = jwt.sign(
            { id: employee._id, role: employee.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );


        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            // user: {
            //     id: employee._id,
            //     name: employee.name,
            //     email: employee.email,
            //     role: employee.role,
            // },
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

module.exports = {
    loginEmployee
};
