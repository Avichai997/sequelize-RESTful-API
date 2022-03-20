const router = require('express').Router();
const carouselController = require('../controllers/carouselController');

router
  .route('/')
  .post(carouselController.create) // Create a new Carousel
  .get(carouselController.findAll) // Retrieve all Carousels
  .delete(carouselController.deleteAll); // Delete all Carousels

router.route('/operational').get(carouselController.findAllOperational); // Retrieve all operational Carousels

router
  .route('/:id')
  .get(carouselController.findOne) // Retrieve a single Carousel with id
  .patch(carouselController.update) // Update a Carousel with id
  .delete(carouselController.delete); // Delete a Carousel with id

router.delete('/', carouselController.deleteAll); // Delete all Carousels
// app.use('/api/carousels', router);

module.exports = router;
