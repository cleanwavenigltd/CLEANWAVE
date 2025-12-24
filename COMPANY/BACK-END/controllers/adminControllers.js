const knex = require("../db/knex");
const { getAllUsers } = require("../models/admin.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(
      "AdminLogin:: This is request Body :",
      typeof req.body.password
    );
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const admin = await knex("admin").where({ email }).first();
    if (!admin) {
      return res.status(403).json({ error: "Invalid credentials" });
    }
    // const valid = await bcrypt.compare(password, admin.password);
    if (admin.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    console.log("authControolers:: Password: ", password, admin);
    // if (!valid) return res.status(401).json({ error: "Invalid credentials" });
    const token = jwt.sign(
      { adminId: admin.id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    // res.clearCookie("AuthToken");
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    return res
      .status(200)
      .json({ success: true, token: token,
      role: admin.role, redirect: "/dashboard" });
  } catch (err) {
    console.log("AdminLogin:: ERROR", err);
    return res.status(500).json({ error: "Server Error" });
  }
};
const adminCheckLogin = async (req, res) => {
  try {
    const token = req.cookies.authToken;
    // console.log("checkLogin:: ", token);
    if (!token) {
      return res
        .status(406)
        .json({ success: false, error: "no token provided" });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ success: false, error: "Invalid Token" });
      }
      if (decoded) {
        return res.status(200).json({ success: true, role: decoded.role });
      }
    });
  } catch (err) {
    console.log("adminCheckLogin:: ERROR", err);
    return res.status(500).json({ success: false, error: "Server Error" });
  }
};
const adminLogout = (req, res) => {
  // No need for req.body.role check
  // Clear the single, constant cookie name
  res.clearCookie("authToken", {
    httpOnly: true,
    // Use the same secure/sameSite settings as the login function
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", // Use strict or none depending on cross-site needs
  });

  return res.json({
    success: true,
    message: "Logged out successfully", // Generic message
  });
};

const getAllInfo = async (req, res) => {
  try {
    // ===== Counts =====
    const waste = await knex("Users")
      .where({ role: "waste" })
      .count("* as count");
    const agents = await knex("Users")
      .where({ role: "agent" })
      .count("* as count");
    const aggregators = await knex("Users")
      .where({ role: "aggregator" })
      .count("* as count");

    // Gender counts
    const maleRes = await knex("Users")
      .whereRaw("LOWER(coalesce(gender,'')) = 'male'")
      .count("id as total");

    const femaleRes = await knex("Users")
      .whereRaw("LOWER(coalesce(gender,'')) = 'female'")
      .count("id as total");

    // ===== Parse Values =====
    const stats = {
      users: {
        male: parseInt(maleRes[0].total, 10),
        female: parseInt(femaleRes[0].total, 10),
        total:
          parseInt(maleRes[0].total, 10) + parseInt(femaleRes[0].total, 10),
      },
      overview: {
        wasteBanks: parseInt(waste[0].count, 10),
        agents: parseInt(agents[0].count, 10),
        aggregators: parseInt(aggregators[0].count, 10),
      },
    };

    return res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (err) {
    console.error("AdminDashboard:: Error ", err);
    return res.status(500).json({
      success: false,
      error: err.message || "Server Error",
    });
  }
};

const totalUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    if (users.success) {
      return res.status(200).json(users);
    } else {
      return res.status(400).json({ error: users });
    }
  } catch (err) {
    return res.status(500).json({ error: "Server Erro" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const {
      name,
      email,
      age,
      phone,
      password,
      gender,
      state,
      lga,
      is_verified,
    } = req.body;
    console.log("adminControllers:: This is request Body :", req.body);
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    const existinUser = await knex("Users").where({ email }).first();
    console.log("adminControllers:: Existing User :", existinUser);
    if (!existinUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await knex("Users")
      .where({ email })
      .update({
        name: name || existinUser.name,
        email: email || existinUser.email,
        phone: phone || existinUser.phone,
        age: age || existinUser.age,
        password: hashedPassword || existinUser.password,
        gender: gender || existinUser.gender,
        state: state || existinUser.state,
        lga: lga || existinUser.lga,
        is_verified: is_verified,
        updated_at: knex.fn.now(),
      });

    return res.status(200).json({ success: true, message: "Profile updated" });
  } catch (err) {
    console.log("adminControllers:: ERROR", err);
    return res.status(500).json({ error: "Server Error" });
  }
};
module.exports = {
  totalUsers,
  getAllInfo,
  adminLogin,
  updateProfile,
  adminLogout,
  adminCheckLogin,
};
