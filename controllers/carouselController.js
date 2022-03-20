const Sequelize = require('sequelize');
const Carousels = require('../models/carouselModel');

const { Op } = Sequelize;

// Create and Save a new Carousels
exports.create = (req, res) => {
  // Validate request
  // if (!req.body.name) {
  //   res.status(400).send({
  //     message: "Carousel name can not be empty!",
  //   });
  //   return;
  // }
  // const carousel = {
  //   isOperational: req.body.isOperational,
  //   orderNumber: req.body.orderNumber,
  //   name: req.body.name,
  // };
  Carousels.bulkCreate(req.body)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Carousel.'
      });
    });
};

// Retrieve all Carousels from the database.
exports.findAll = (req, res) => {
  // retrieve carousel contains "title": http://localhost:8080/api/carousels?name=test
  const { name } = req.query;
  const condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Carousels.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving Carousels.'
      });
    });
};

// Find a single Carousel with an id
exports.findOne = async (req, res) => {
  const { id } = req.params;
  const data = await Carousels.findByPk(id);
  res.send(data);
};

// Update a Carousel by the id in the request
exports.update = (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  Carousels.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num[0] === 1) {
        res.status(200).json({
          message: 'Carousel was updated successfully.'
        });
      } else {
        res.send({
          message: `Cannot update Carousel with id=${id}. Maybe Carousel was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Error updating Carousel with id= ${id}`,
        err: err
      });
    });
};

// Delete a Carousel with the specified id in the request
exports.delete = (req, res) => {
  const { id } = req.params;
  Carousels.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: 'Carousel was deleted successfully!'
        });
      } else {
        res.send({
          message: `Cannot delete Carousel with id=${id}. Maybe Carousel was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Could not delete Carousel with id= ${id}`,
        err: err
      });
    });
};

// Delete all Carousels from the database.
exports.deleteAll = (req, res) => {
  Carousels.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Carousels were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all Carousels.'
      });
    });
};

// Find all published Carousels
exports.findAllOperational = (req, res) => {
  Carousels.findAll({ where: { isOperational: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message ||
          'Some error occurred while retrieving Operational Carousels.'
      });
    });
};
