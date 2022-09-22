const Product = require('../models/product');

const errorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleWares/catchAsyncError')

const apiFeatures = require('../utils/apiFeatures')


// Create new product => /api/v1/admin/product/new.
exports.newProduct = catchAsyncError (async (req, res, next) => {
    
    const product = await Product.create(req.body)

    res.status(201).json({
        success: true,
        product
    })
})


// get all products= /api/v1/products?keyword=apple
exports.getProducts = catchAsyncError (async (req,res,next) => {

    const resPerPage = 4;
    const productCount = await Product.countDocuments();

    const apiFeatures = new APIFeatures(Product.find(), req.query)
                        .search()
                        .filter()
                        .pagination(resPerPage)

    const products = await apiFeatures.query;

    res.status(200).json({
        success: true,
        count: products.length,
        productCount,
        products
        
    })
})

// get singel product detail =>  /api/v1/product/:id
exports.getsingleProduct = catchAsyncError (async (req,res,next) => {


    const product = await Product.findById(res.params.id);

    if(!product){
        return next(new errorHandler('Product not found', 404));
    }

    res.status(200).json({
        success: true,
        product
    })
})

// Update Product  => /api/v1/admin/product/:id
exports.updateProduct = catchAsyncError (async (req, res, next) => {

    let product = await Product.findById(res.params.id);

    if(!product){
        return next(new errorHandler('Product not found', 404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        product
    })
})

// Delete product => /api/v1/admin/product/:id
exports.deleteProduct = catchAsyncError (async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new errorHandler('Product not found', 404));
    }

    await product.deleteOne();

    res.status(200).json({
        success: true,
        message: "Product is deleted"
    })
})