module.exports = (app) => {
    const employee = require('../controllers/employee.controllers');

    const router = require('express').Router();

    //Retrieve all employee with  setting
    router.get("/", employee.findAll);
    //Insert data to employee with setting
    router.post("/employee-setting", employee.create);
    //Retrivev an employee with setting
    router.get("/edit-employee/:id", employee.findOne);
    //Update an employee with id
    router.put("/update-employee/:id", employee.update)
    //Delete an employee with id
    router.delete("/delete-employee/:id", employee.delete);
    
    app.use("/employees", router);

};
