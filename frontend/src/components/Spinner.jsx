export default function Spinner({ message = 'Loading...' }) {
  return (
    <div className='spinner-container'>
      <div className='spinner' />
      <p className='spinner-message'>{message}</p>
    </div>
  );
}
