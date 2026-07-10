import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { expenseAPI } from '../api/api';
import { BarChart, Bar, XAxis, YAxis, Tooltip,
         ResponsiveContainer, Cell } from 'recharts';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
 
const CATEGORY_COLORS = {
  Food: '#f59e0b', Transport: '#4caf50', Shopping: '#8bc34a',
  Bills: '#ef4444', Health: '#22c55e', Entertainment: '#2e7d32', Other: '#6b7280',
};
 
export default function Dashboard() {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    expenseAPI.getAll().then((data) => {
      setExpenses(Array.isArray(data) ? data : []);
      setLoading(false);
    });
  }, []);
 
  // Filter to current month only
  const now = new Date();
  const thisMonth = expenses.filter((e) => {
    const d = new Date(e.date);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
 
  // Total spending this month
  const totalThisMonth = thisMonth.reduce((sum, e) => sum + e.amount, 0);
 
  // Group by category
  const byCategory = thisMonth.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});
 
  // Convert to array for recharts
  const chartData = Object.entries(byCategory)
    .map(([category, total]) => ({ category, total }))
    .sort((a, b) => b.total - a.total);
 
  // Find the highest-spending category
  const topCategory = chartData[0]?.category || null;
 
  // if (loading) return <div className='page-container'>Loading...</div>;
  if (loading) return <Spinner message='Fetching your expenses...' />;
 
  return (
    <div className='page-container'>
      <h2 className='page-title'>Welcome back, {user?.name}</h2>
 
      {/* Summary cards */}
      <div className='summary-grid'>
        <div className='summary-card'>
          <p className='summary-label'>This Month</p>
          <p className='summary-value'>₹{totalThisMonth.toLocaleString('en-IN')}</p>
        </div>
        <div className='summary-card'>
          <p className='summary-label'>Transactions</p>
          <p className='summary-value'>{thisMonth.length}</p>
        </div>
        <div className='summary-card'>
          <p className='summary-label'>Top Category</p>
          <p className='summary-value' style={{ fontSize: '20px' }}>
            {topCategory || '—'}
          </p>
        </div>
      </div>
 
      {/* Chart */}
      {chartData.length > 0 ? (
        <div className='card' style={{ marginTop: '24px' }}>
          <h3 className='card-title'>Spending by Category</h3>
          <ResponsiveContainer width='100%' height={260}>
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <XAxis dataKey='category' tick={{ fontSize: 13 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, 'Amount']}
              />
              <Bar dataKey='total' radius={[6, 6, 0, 0]}>
                {chartData.map((entry) => (
                  <Cell key={entry.category}
                    fill={CATEGORY_COLORS[entry.category] || '#6b7280'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className='card empty-dashboard'>
          <p>No expenses this month yet.</p>
          <Link to='/add' className='btn-primary' style={{ display:'inline-block', marginTop:'12px', textDecoration:'none', padding:'10px 20px', borderRadius:'8px' }}>
            Add your first expense
          </Link>
        </div>
      )}
 
      {/* Recent expenses */}
      {thisMonth.length > 0 && (
        <div className='card' style={{ marginTop: '24px' }}>
          <h3 className='card-title'>Recent This Month</h3>
          {thisMonth.slice(0, 5).map((e) => (
            <div key={e._id} className='recent-item'>
              <span className='category-dot'
                style={{ background: CATEGORY_COLORS[e.category] || '#6b7280' }} />
              <span className='recent-description'>{e.description}</span>
              <span className='recent-amount'>₹{e.amount.toLocaleString('en-IN')}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
