const CustomerModel = require("../../models/customer");
const config = require("config");
const jwt = require("jsonwebtoken");

exports.registerCustomer = async (req, res) => {
  try {
    const body = req.body;
    const customer =  await CustomerModel.findOne({email: body.email})
    if (customer)
      return res.status(401).json("Email exists!");
    const isPhoneExist = await CustomerModel.findOne({phone: body.phone});
    if (isPhoneExist)
      return res.status(401).json("Phone exists!");
    await new CustomerModel({
      fullName: body.fullName,
      email: body.email,
      password: body.password,
      phone: body.phone,
      address: body.address,
    }).save();
    return res.status(201).json("Create customer successfully");
  }
  catch (err) {
    return res.status(500).json(err);
  }
}

exports.loginCustomer = async (req, res) => {
  try {
    const { body } = req;
    const customer = await CustomerModel.findOne({ email: body.email });
    if (!customer) {
      return res.status(401).json({
        message: "Email không hợp lệ!",
      });
    }
    const validPassword = customer.password === body.password;
    if (!validPassword) {
      return res.status(401).json({
        message: "Mật khẩu không hợp lệ!",
      });
    }
    if (customer && validPassword) {
      const accessToken = jwt.sign(
        { email: body.email, password: body.password }, // muốn token trả về cái gì
        config.get("app.jwtAccessKey"), // jwt key
        { expiresIn: "1d" } // thời gian cookie sống
      );
      res.cookie("token", accessToken);
      const { password, ...others } = customer._doc;
      return res.status(200).json({
        ...others,
        accessToken,
      });
    }
  } catch (error) {
    // 401 data k hop le
    // 402 data khong ton tai
    return res.status(500).json({
      errorName: error.name,
      errorMessage: error.message,
    });
  }
};
