const Employee = require("../models/employee.model");

const createEmployee = async (req, res) => {
    try {
        const employee = await Employee.create(req.body);

        res.status(201).json({
            success: true,
            message: "Employee created succesfully!",
            data: employee
        })
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        })

    }
}

module.exports = {
    createEmployee,
}