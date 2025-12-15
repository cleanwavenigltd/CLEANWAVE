const knex = require("../db/knex");

// Get all users
// export async function getUsers(req, res) {
//   try {
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// }

// Create a new user
const createUser = async (req, res) => {
  try {
    const { name, email, password, gender } = req.body;

    if (!name || !email || !password || !gender) {
      return res
        .status(400)
        .json({ error: `All fields are required ${req.body}` });
    }

    // Check if user with the same email already exists
    const existingUser = await knex("users").where({ email }).first();
    if (existingUser) {
      return res.status(409).json({ error: "Credetials already exists" });
    }

    const [id] = await knex("users").insert({
      name,
      email,
      password,
      gender,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    });
    await knex("wallet").insert({
      user_id: id,
      balance: 0.0,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    });
    // const newUser = await knex("users").where({ id }).first();
    res.status(200).json("good");
  } catch (err) {
    // const obj = JSON.stringify(req);
    console.log(req);
    // res.status(500).json({ error: `bad ${err.message} req : ${obj}` });
  }
};

module.exports = {
  createUser,
};
