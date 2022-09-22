const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleWares/catchAsyncError');

// Register a user => /api/v1/register
exports.registerUser = catchAsyncError( async (req, res, next) => {

    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id: 'cld-sample',
            url: 'https://res.cloudinary.com/dbl14xih5/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1663652091/cld-sample.jpg'
        }

    })

    const token = user.getJwtToken();

    res.status(201).json({
        success: true,
        user
    })

})

// Login user => /api/v1/login
exports.loginUser = catchAsyncError( async(req, res, next) => {
    const { email, password } = req.body

    // Chexk if email and password is enterned by the user
    if (!email || !password) {
        return next(new ErrorHandler('Please enter email', 400))
  
    }
        // Finding user in database
    const user = await User.findOne({ email }).select('+password')
   
})