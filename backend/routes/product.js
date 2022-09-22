const express= require('express');
const router = express.Router();


const { getProducts,
        newProduct, 
        getsingleProduct, 
        updateProduct, 
        deleteProduct 
      } = require('../controllers/productController');

// for getting all products
router.route('/products').get(getProducts);

// for getting a single product
router.route('/product/:id').get(getsingleProduct);

// for post a new product
router.route('/product/new').post(newProduct);

// for put a new product
router.route('/admin/product/:id').put(updateProduct);

// for deleting a product
router.route('/admin/product/:id').delete(deleteProduct);

module.exports = router ;  