const db = require("../models");
const Employee = db.employee;
const Setting = db.setting;

exports.findAll = (req, res) => {
  try {
    Employee.findAll({
      attributes: ["id", "name", "position"],
      include: [
        {
          //การเชื่อมตาราง
          model: Setting,
          attributes: ["theme"],
        },
      ],
    })
      .then((employee) => {
        res.status(200).json(employee);
      })
      .catch((error) => {
        console.log(error.meassge);
      });
  } catch (e) {
    console.log(err);
  }
};

exports.create = (req, res) => {
  try {
    if (!req.body.name || !req.body.position) {
      res.status(400).json({ meassge: "connot empty" });
      return;
    }

    const employeeOBJ = {
      name: req.body.name,
      position: req.body.position,
    };

    Employee.create(employeeOBJ)
      .then((data) => {
        Setting.create({
          theme: req.body.theme,
          employeeId: data.id,
        });

        res.status(200).json({ meassge: "employee created" });
      })
      .catch((error) => {
        res.status(400).json({ meassge: "error occured!" });
      });
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.findOne = (req, res) => {
  try {
    const id = req.params.id;
    Employee.findByPk(id)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((erroor) => {
        res.status(400).json({ meassge: error.meassge });
      });
  } catch (error) {
    //console.log(erroe.meassge);
    res.status(500).json({ meassge: erroe.meassge });
  }
};

exports.update = (req, res) => {
  try {
    //const id = req.params.id;

    const employeeOBJ = {
      name: req.body.name,
      position: req.body.position,
    };

    Employee.update(employeeOBJ, {
      where: { id: req.params.id },
    })
      .then((data) => {
        if (data == 1) {
          res.status(200).json({ meassge: "###Update successfully####" });
        }
      })
      .catch((erroor) => {
        res.status(400).json({ meassge: error.meassge });
      });
  } catch (error) {
    res.status(500).json({ meassge: erroe.meassge });
  }
};

exports.delete = (req, res) => {
  try {
    Employee.destroy({ where: { id: req.params.id } })
      .then((data) => {
        if (data == 1) {
          res.status(200).json({ meassge: "Deleted succesfully" });
        }
      })
      .catch((error) => {
        res.status(400).json({ meassge: error.meassge });
      });
  } catch (error) {
    res.status(500).json({ meassge: erroe.meassge });
  }
};
