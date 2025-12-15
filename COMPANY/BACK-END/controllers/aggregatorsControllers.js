const {
  registerAggregator,
  getAggregators,
} = require("../models/aggregator.model");
const bcrypt = require("bcryptjs");
const addAggregator = async (req, res) => {
  try {
    const { name, password, email, gender, phone, location } = req.body;
    console.log("aggregatorControllers :: logs:", req.body);
    if (!name || !password || !email || !gender || !phone || !location) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Password :", password);
    const aggregator = await registerAggregator({
      name,
      email,
      password: hashedPassword,
      gender,
      phone,
      location,
    });
    if (aggregator.success) {
      return res.status(200).json(aggregator);
    } else {
      console.log("Reegistration Error", aggregator);
      return res.status(400).json({ error: aggregator.error });
    }
  } catch (err) {
    console.log("SERVER ERROR", err);
    return res.status(500).json({ error: "Server Error" });
  }
};

const getAggregatorRequest = async (req, res) => {
  try {
    // const { userId } = req.user;
    // console.log("This is the request",req)
    console.log("resp for get in aggregatorConFile", req.user);
    // if (!userId) {
    //   return res.status(400).json({ error: "Id is require" });
    // }
    const aggregator = await getAggregators();
    if (aggregator.success) {
      return res.status(200).json({ success: true, aggregator });
    } else {
      // console.log(aggregator.success )

      return res.status(400).json({ error: "No aggregator Found" });
    }
  } catch {
    return res.status(500).json({ error: "Server Error" });
  }
};
module.exports = { addAggregator, getAggregatorRequest };
