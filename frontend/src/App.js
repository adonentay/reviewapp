import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://lruzivsghsdjyqalfyds.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxydXppdnNnaHNkanlxYWxmeWRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5NjIyNjgsImV4cCI6MjA5MjUzODI2OH0.sZqoNw7guB9nGZbyVNXLd32Zqgvzk79cyyN-KhfA4Zw'
);

function App() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('scraped_at', { ascending: false });

      if (error) {
        console.error('Error fetching reviews:', error);
      } else {
        setReviews(data);
      }
      setLoading(false);
    }

    fetchReviews();
  }, []);

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '8px' }}>Отзывы / Reviews</h1>
      <p style={{ color: '#888', marginBottom: '32px' }}>Все отзывы в одном месте</p>

      {loading && <p>Загрузка...</p>}

      {reviews.map((review) => (
        <div key={review.id} style={{
          border: '1px solid #e5e5e5',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '12px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <strong>{review.author_name}</strong>
            <span style={{ color: '#f59e0b' }}>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
          </div>
          <p style={{ margin: '0 0 8px', color: '#333' }}>{review.text}</p>
          <span style={{
            fontSize: '12px',
            background: '#f3f4f6',
            padding: '2px 8px',
            borderRadius: '99px',
            color: '#666'
          }}>{review.platform}</span>
        </div>
      ))}
    </div>
  );
}

export default App;