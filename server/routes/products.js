const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authentication");

const {
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
} = require("../controllers/products");

router.get("/", getAllproducts);
router.route("/product/:id").get(getProduct).post(authMiddleware, addComment)
router.get("/user", authMiddleware, getUserInfos);
router.get("/men", getMen);
router.get("/women", getWomen);
router.get("/babies", getBabies);
router
    .route("/cart")
    .put(authMiddleware, addToCart)
    .get(authMiddleware, getCart)
    .patch(authMiddleware, updateCart);
router.post('/checkout', authMiddleware, checkout)

module.exports = router;
