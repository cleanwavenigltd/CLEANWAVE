const knex = require("../db/knex")
const {
  registerAgent,
  getAllAgents,
  deleteAgents,
} = require("../models/agent.model");
const bcrypt = require("bcryptjs");

const addAgent = async (req, res) => {
  try {
    const { userId } = req.user;
    const { name, email, phone, password, age, gender } = req.body;
    console.log("AgentsControl::This is request Body :", req.body);
    if ((!userId, !name || !email || !phone || !password || !gender || !age)) {
      return res.status(400).json({ error: "All Fields are required" });
    }
    if (Number(age) < 18) {
      return res.status(400).json({ error: "Under Age" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const agent = await registerAgent({
      aggregatorId: userId,
      name,
      email,
      phone,
      password: hashedPassword,
      age,
      gender,
    });
    if (agent.success) {
      return res.status(200).json(agent);
    } else {
      console.log("AgentsControler:: Error", agent);
      return res.status(400).json(agent);
    }
  } catch (err) {
    console.log("AgentsConroll:: Error :", err);
    return res.status(500).json({ error: "Server Error" });
  }
};
const getAgentRequest = async (req, res) => {
  try {
    const {userId} = req.user;
    const agents = await knex("Users").where({created_by : userId,role:"agent"}).count("* as count").first();
    if (agents) {
      return res.status(200).json({ success: true, agents });
    } else {
      return res.status(400).json({ error: "No agent Found" });
    }
  } catch (err) {
    console.log("agentsControllers:: ERROR", err);
    return res.status(500).json({ error: "Server Error" });
  }
};

const getAll = async (req, res) => {
  try {
    const allAgents = await getAllAgents();
    if (allAgents.success) {
      console.log("agentsControll::", allAgents);
      return res.status(200).json({ success: true, allAgents });
    } else {
      return res.status(400).json({ error: "No agent Found" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Server Error" });
  }
};

module.exports = { getAgentRequest, addAgent, getAll };
