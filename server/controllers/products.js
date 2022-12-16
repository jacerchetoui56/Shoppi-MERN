const { StatusCodes } = require("http-status-codes");
const {
    BadRequestError,
    UnauthenticatedError,
    NotFoundError,
} = require("../errors");
const Product = require("../models/product.model");
const User = require("../models/User.model");

const getUserInfos = async (req, res) => {
    const user = await User.findById(req.user.userId);
    res
        .status(StatusCodes.OK)
        .json({ success: true, user: req.user, count: user.cart.length });
};

const getAllproducts = async (req, res) => {


    const products = await Product.find({});
    if (!products) {
        throw new NotFoundError("No products Are Found");
    }
    res.status(StatusCodes.OK).json({ success: true, data: products });
};

const getMen = async (req, res) => {
    const products = await Product.find({ gender: "men" });
    if (!products) {
        throw new NotFoundError("No products Are Found");
    }
    res.status(StatusCodes.OK).json({ success: true, data: products });
};
const getWomen = async (req, res) => {
    const products = await Product.find({ gender: "women" });
    if (!products) {
        throw new NotFoundError("No products Are Found");
    }
    res.status(StatusCodes.OK).json({ success: true, data: products });
};
const getBabies = async (req, res) => {
    const products = await Product.find({ gender: "baby" });
    if (!products) {
        throw new NotFoundError("No products Are Found");
    }
    res.status(StatusCodes.OK).json({ success: true, data: products });
};

const addToCart = async (req, res) => {
    const newProduct = ({ name, id, image, price } = req.body);
    if (!name || !id || !image || !price) {
        throw new BadRequestError("All Product Infos Must Be Provided");
    }
    const user = await User.findById(req.user.userId);
    if (user.cart.some((product) => product.id === id)) {
        throw new BadRequestError("Product already exists");
    }
    const updating = await User.findOneAndUpdate(
        { _id: req.user.userId },
        {
            $push: {
                cart: { ...newProduct },
            },
        },
        { new: true }
    );
    if (!updating) {
        throw new BadRequestError("An Error Occured");
    }
    res
        .status(StatusCodes.OK)
        .json({
            success: true,
            msg: `${name} added to cart successfully`,
            count: updating.cart.length,
        });
};

const getCart = async (req, res) => {
    // ! if we have the parameter checkout=success than we will delete the data in the cart
    // console.log(req.query)
    // if (req.query.checkout_success === true) {
    //     console.log('clearing the cart')
    //     await User.findByIdAndUpdate(req.user.userId, {
    //         cart: { $set: [] }
    //     })
    // }
    const user = await User.findById(req.user.userId);
    if (!user) {
        throw new BadRequestError("An error occured, Please try again later");
    }
    res.status(StatusCodes.OK).json({ success: true, data: user.cart });
};

const updateCart = async (req, res) => {
    const { id, amount } = req.body;
    if (amount < 0) {
        throw new BadRequestError("Amount Has To Be 0 Or More");
    }
    const user = await User.updateOne(
        { _id: req.user.userId, "cart.id": id },
        {
            $set: { "cart.$.amount": amount },
        }
    );
    const deletingZeroAmount = await User.findOneAndUpdate(
        { _id: req.user.userId, "cart.id": id },
        {
            $pull: { cart: { amount: 0 } },
        },
        { new: true }
    );
    res
        .status(StatusCodes.OK)
        .json({ success: true, count: deletingZeroAmount.cart.length });
};

const getProduct = async (req, res) => {
    const { id: productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) {
        res
            .status(StatusCodes.NOT_FOUND)
            .json({ success: false, msg: "NO SUCH PRODUCT" });
    }
    res.status(StatusCodes.OK).json({ success: true, data: product });
};

const addComment = async (req, res) => {
    const { comment } = req.body;
    if (!comment) {
        throw new BadRequestError("empty comments are disallowed");
    }
    const product = await Product.findOneAndUpdate(
        { _id: req.params.id },
        {
            $push: {
                comments: { name: req.user.userName, comment: comment },
            },
        },
        { new: true }
    );
    res.status(StatusCodes.OK).json({ success: true, data: product.comments });
};

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

const checkout = async (req, res) => {
    const { items } = req.body
    const { userId } = req.user
    const itemsInDB = await Product.find({
        _id: {
            $in: items.map(item => `${item.id}`)
        }
    }).select('name price image')


    const itemsToCheckout = itemsInDB.map((item, index) => {
        return {
            name: item.name,
            image: item.image,
            price: item.price,
            quantity: items[index].amount
        }
    })
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: itemsToCheckout.map(item => {
                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: item.name,
                            images: [item.image],
                        },
                        unit_amount: item.price * 100
                    },
                    quantity: item.quantity
                }
            }),
            metadata: {
                shoppi_user_id: userId,
            },
            success_url: `${process.env.CLIENT_URL}/`,
            cancel_url: `${process.env.CLIENT_URL}/`
        })
        res.json({ url: session.url })
    } catch (e) {
        console.log(e.message)
        throw new BadRequestError("Failed to checkout")
    }
}


module.exports = {
    getUserInfos,
    getAllproducts,
    getMen,
    getWomen,
    getBabies,
    addToCart,
    getCart,
    updateCart,
    getProduct,
    addComment,
    checkout
};
