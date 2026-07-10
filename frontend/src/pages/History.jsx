import { useState, useEffect } from 'react';
import { expenseAPI } from '../api/api';
import Spinner from '../components/Spinner';

const CATEGORIES = ['All', 'Food', 'Transport', 'Shopping', 'Bills', 'Health', 'Entertainment', 'Other'];

const CATEGORY_COLORS = {
  Food: '#f97316',
  Transport: '#3b82f6',
  Shopping: '#a855f7',
  Bills: '#ef4444',
  Health: '#22c55e',
  Entertainment: '#eab308',
  Other: '#6b7280',
};

export default function History() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetchExpenses();
  }, []);

  async function fetchExpenses() {
    const data = await expenseAPI.getAll();
    setExpenses(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this expense?')) return;
    await expenseAPI.delete(id);
    setExpenses(expenses.filter((e) => e._id !== id));
  }

  function startEdit(expense) {
    setEditingId(expense._id);
    setEditForm({
      amount: expense.amount,
      category: expense.category,
      description: expense.description,
      date: expense.date.split('T')[0],
    });
  }

  async function handleUpdate(id) {
    const data = await expenseAPI.update(id, {
      ...editForm,
      amount: parseFloat(editForm.amount),
    });
    if (data._id) {
      setExpenses(expenses.map((e) => (e._id === id ? data : e)));
      setEditingId(null);
    }
  }

  const filteredExpenses = expenses.filter((e) => {
    const matchesSearch = e.description
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || e.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // if (loading) return <div className='page-container'>Loading expenses...</div>;
  if (loading) return <Spinner message='Fetching your expenses...' />;

  return (
    <div className='page-container'>
      <h2 className='page-title'>Expense History</h2>

      <div className='filter-bar'>
        <input
          type='text'
          className='search-input'
          placeholder='Search expenses...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className='filter-select'
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {filteredExpenses.length > 0 && (
        <p className='filtered-total'>
          {filteredExpenses.length} expense{filteredExpenses.length !== 1 ? 's' : ''} · Total:
          <strong> ₹{filteredExpenses
            .reduce((sum, e) => sum + e.amount, 0)
            .toLocaleString('en-IN')}
          </strong>
        </p>
      )}



      {filteredExpenses.length === 0 ? (
        <div className='card' style={{ textAlign: 'center', padding: '32px', color: '#64748b' }}>
          {searchQuery || selectedCategory !== 'All'
            ? 'No expenses match your search.'
            : 'No expenses yet. Add your first one!'}
        </div>
      ) :
        (

          <div className='expense-list'>
            {filteredExpenses.map((expense) => (
              <div key={expense._id} className='expense-item'>
                {editingId === expense._id ? (
                  // EDIT MODE
                  <div className='edit-form'>
                    <input type='number' value={editForm.amount}
                      onChange={(e) => setEditForm({ ...editForm, amount: e.target.value })} />
                    <input type='text' value={editForm.description}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} />
                    <input type='date' value={editForm.date}
                      onChange={(e) => setEditForm({ ...editForm, date: e.target.value })} />
                    <div className='edit-actions'>
                      <button className='btn-save' onClick={() => handleUpdate(expense._id)}>Save</button>
                      <button className='btn-cancel' onClick={() => setEditingId(null)}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  // VIEW MODE
                  <>
                    <div className='expense-left'>
                      <span className='category-dot'
                        style={{ background: CATEGORY_COLORS[expense.category] || '#6b7280' }}
                      />
                      <div>
                        <p className='expense-description'>{expense.description}</p>
                        <p className='expense-meta'>
                          {expense.category} · {new Date(expense.date).toLocaleDateString('en-IN')}
                        </p>
                      </div>
                    </div>
                    <div className='expense-right'>
                      <span className='expense-amount'>₹{expense.amount.toLocaleString('en-IN')}</span>
                      <button className='btn-edit' onClick={() => startEdit(expense)}>Edit</button>
                      <button className='btn-delete' onClick={() => handleDelete(expense._id)}>Delete</button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
    </div>
  );
}
