const express = require("express");
const router = express.Router();

// import controllers
const CategoryController = require("../apps/controllers/apis/category");
const ProductController = require("../apps/controllers/apis/product");
const OrderController = require("../apps/controllers/apis/order");
const AuthController = require("../apps/controllers/apis/auth");
const CustomerController = require("../apps/controllers/apis/customer");

// import middleware
const AuthMiddleware = require("../apps/middlewares/auth");

router.get("/categories", CategoryController.index);
router.get("/categories/:id", CategoryController.show);
router.get("/categories/:id/products", CategoryController.productsCategory);
router.get("/products", ProductController.index);
router.get("/products/:id", ProductController.show);
router.get("/products/:id/comments", ProductController.comments);
router.post("/products/:id/comments", ProductController.storeComments);

router.post("/customer/login", AuthController.loginCustomer);
router.post("/customer/register", AuthController.registerCustomer);

router.post(
  "/customer/update",
  AuthMiddleware.verifyAuthenticationCustomer,
  CustomerController.update
);

router.post(
  "/order",
  AuthMiddleware.verifyAuthenticationCustomer,
  OrderController.order
);

router.get(
  // lay ra id-order cua 1 customer
  "/customer/order/:id",
  AuthMiddleware.verifyAuthenticationCustomer,
  OrderController.orderDetails
);

router.get(
  "/customer/:id/orders",
  AuthMiddleware.verifyAuthenticationCustomer,
  OrderController.ordersCustomer
);

router.get(
  "/customer/order/:id/canceled",
  AuthMiddleware.verifyAuthenticationCustomer,
  OrderController.canceledOrder
);


router.get("/test", AuthMiddleware.verifyAuthenticationCustomer, (req, res) => {
  res.json("hi!");
});

module.exports = router;
