const Expense = require('../models/Expense');
 
// We'll add each function below, then export them all at the end

//create


const createExpense = async (req, res) => {
  try {
    const { amount, category, description, date } = req.body;
    const userId = req.userId;
 
    // Basic validation — don't trust the client to send everything
    if (!amount || !category || !description || !date || !userId) {
      return res.status(400).json({ message: 'All fields are required' });
    }
 
    const expense = await Expense.create({
      amount,
      category,
      description,
      date,
      userId,
    });
 
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

//READ ALL
const getAllExpenses = async (req, res) => {
  try {
    // const { userId } = req.query;
 
    // if (!userId) {
    //   return res.status(400).json({ message: 'userId is required' });
    // }
 
    const expenses = await Expense.find({ userId: req.userId })
      .sort({ date: -1 }); // newest first
 
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

//READ-ONE
const getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
 
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
 
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


//— UPDATE

const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
 
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
 
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

//DELETE

const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
 
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
 
    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// exporting

module.exports = {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
};
