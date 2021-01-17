const express = require('express');
const router = express.Router();
const restaurantsController = require('../controllers/restaurantsController');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateRestaurant } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary')
const upload = multer({ storage });

router.route('/')
    .get(catchAsync(restaurantsController.index))
    .post(isLoggedIn, upload.array('restaurant[image]'), validateRestaurant,
        catchAsync(restaurantsController.createRestaurant));

router.get('/new', isLoggedIn, restaurantsController.renderNewForm);

router.route('/:id')
    .get(catchAsync(restaurantsController.showRestaurant))
    .put(isLoggedIn, isAuthor, upload.array('restaurant[image]'), validateRestaurant, catchAsync(restaurantsController.updateRestaurant))
    .delete(isLoggedIn, isAuthor, catchAsync(restaurantsController.destroyRestaurant));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(restaurantsController.renderEditForm));

// router.get('/', catchAsync(restaurantsController.index));
// router.post('/', isLoggedIn, validateRestaurant, catchAsync(restaurantsController.createRestaurant));
// router.get('/:id', catchAsync(restaurantsController.showRestaurant));
// router.put('/:id', isLoggedIn, isAuthor, validateRestaurant, catchAsync(restaurantsController.updateRestaurant));
// router.delete('/:id', isLoggedIn, isAuthor, catchAsync(restaurantsController.destroyRestaurant));

module.exports = router;