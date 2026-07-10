const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
} = require('../controllers/expenseController');
 
// protect is added before every route handler
// it runs first, verifies the token, then calls next() to proceed
router.post('/', protect, createExpense);
router.get('/', protect, getAllExpenses);
router.get('/:id', protect, getExpenseById);
router.put('/:id', protect, updateExpense);
router.delete('/:id', protect, deleteExpense);
 
module.exports = router;
