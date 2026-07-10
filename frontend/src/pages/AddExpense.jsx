import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { expenseAPI } from '../api/api';

const CATEGORIES = ['Food', 'Transport', 'Shopping', 'Bills', 'Health', 'Entertainment', 'Other'];

export default function AddExpense() {
  const [form, setForm] = useState({
    amount: '',
    category: 'Food',
    description: '',
    date: new Date().toISOString().split('T')[0], // today's date as default
  });
  const [loading, setLoading] = useState(false);
  const [categorizing, setCategorizing] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState(null);

  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleCategorize() {
    if (!form.description.trim()) return;
    setCategorizing(true);
    const data = await expenseAPI.categorize(form.description);
    setAiSuggestion(data.category);
    setCategorizing(false);
  }

  function acceptSuggestion() {
    setForm({ ...form, category: aiSuggestion });
    setAiSuggestion(null);
  }


  async function handleSubmit(e) {
    e.preventDefault();

    if (parseFloat(form.amount) <= 0) {
    setError('Amount must be greater than 0');
    return;
  }

    setLoading(true);
    setError('');

    const data = await expenseAPI.create({
      ...form,
      amount: parseFloat(form.amount),
    });

    if (data._id) {
      navigate('/history');
    } else {
      setError(data.message || 'Failed to save expense');
    }

    setLoading(false);
  }
//   const filteredExpenses = expenses.filter((e) => {
//   const matchesSearch = e.description.toLowerCase()
//     .includes(searchQuery.toLowerCase());
//   const matchesCategory =
//     selectedCategory === 'All' || e.category === selectedCategory;
//   return matchesSearch && matchesCategory;
// });


  return (
    <div className='page-container'>
      <h2 className='page-title'>Add Expense</h2>

      {error && <p className='error-message'>{error}</p>}

      <div className='card'>
        <form onSubmit={handleSubmit} className='auth-form'>
          <div className='form-group'>
            <label>Amount (₹)</label>
            <input
              type='number'
              name='amount'
              value={form.amount}
              onChange={handleChange}
              placeholder='0.00'
              min='0'
              step='0.01'
              required
            />
          </div>

          <div className='form-group'>
            <label>Description</label>
            <div className='description-row'>
              <input type='text' name='description' value={form.description}
                onChange={handleChange}
                placeholder='e.g. Swiggy biryani, Uber to airport...'
                required />
              <button type='button' className='btn-ai'
                onClick={handleCategorize}
                disabled={categorizing || !form.description.trim()}>
                {categorizing ? 'Thinking...' : 'AI'}
              </button>
            </div>
            {aiSuggestion && (
              <div className='ai-suggestion'>
                <span>AI suggests: <strong>{aiSuggestion}</strong></span>
                <button type='button' className='btn-accept' onClick={acceptSuggestion}>
                  Accept
                </button>
                <button type='button' className='btn-dismiss'
                  onClick={() => setAiSuggestion(null)}>
                  Dismiss
                </button>
              </div>
            )}

          </div>
          
          <div className='form-group'>
            <label>Category</label>
            <select name='category' value={form.category} onChange={handleChange}>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className='form-group'>
            <label>Date</label>
            <input
              type='date'
              name='date'
              value={form.date}
              onChange={handleChange}
              required
            />
          </div>

          <button type='submit' className='btn-primary' disabled={loading}>
            {loading ? 'Saving...' : 'Save Expense'}
          </button>
        </form>
      </div>
    </div>
  );
}
