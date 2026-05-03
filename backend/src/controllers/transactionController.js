import * as transactionService from "../services/transactionService.js";

export async function create(req, res) {
  try {
    const transaction = await transactionService.createTransaction(
      req.body,
      req.userId
    );
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function getAll(req, res) {
  try {
    const transactions = await transactionService.getTransactions(req.userId);
    res.json(transactions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function update(req, res) {
  try {
    const transaction = await transactionService.updateTransaction(
      req.params.id,
      req.body,
      req.userId
    );
    res.json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function remove(req, res) {
  try {
    const result = await transactionService.deleteTransaction(
      req.params.id,
      req.userId
    );
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}