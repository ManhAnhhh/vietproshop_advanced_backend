const CustomerModel = require("../../models/customer");
exports.update = async (req, res) => {
  try {
    const body = req.body;
    const customerByPhone = await CustomerModel.findOne({ phone: body.phone });
    if (customerByPhone && customerByPhone.email !== body.email) {
      return res.status(404).json("Phone exists!");
    }
    await CustomerModel.updateOne(
      { email: body.email },
      {
        $set: {
          fullName: body.fullName,
          phone: body.phone,
          address: body.address,
        },
      }
    );
    return res.status(200).json("Updating customer success");
  } catch (error) {
    return res.status(500).json(error);
  }
};
