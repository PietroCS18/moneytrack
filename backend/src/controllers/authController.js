import * as authService from "../services/authService.js";

export async function register(req, res) {
  try {
    const user = await authService.register(req.body);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

export async function login(req, res) {
  try {
    const token = await authService.login(req.body);
    return res.json({ token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}