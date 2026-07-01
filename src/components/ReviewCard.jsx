import React from 'react';
import { Star } from './Icons';

export const ReviewCard = ({ review }) => {
  const renderStars = (rating) => {
    const stars = [];
    const floorRating = Math.floor(rating || 0);
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star 
          key={i} 
          style={{ width: '1rem', height: '1rem', color: i <= floorRating ? '#f59e0b' : '#cbd5e1' }} 
          fill={i <= floorRating ? '#f59e0b' : 'none'}
        />
      );
    }
    return <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.1rem' }}>{stars}</span>;
  };

  return (
    <div style={{ backgroundColor: 'var(--color-gray-50)', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid var(--color-gray-200)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <strong style={{ fontSize: '0.9rem', color: 'var(--color-gray-900)' }}>
          {review.userId?.name || 'Anonymous Owner'}
        </strong>
        <div>{renderStars(review.rating)}</div>
      </div>
      <p style={{ fontSize: '0.85rem', color: 'var(--color-gray-700)', margin: '0 0 0.5rem 0', fontStyle: 'italic', lineHeight: '1.4' }}>
        "{review.comment}"
      </p>
      <span style={{ fontSize: '0.725rem', color: 'var(--color-gray-400)', display: 'block' }}>
        Travel Date: {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : 'N/A'}
      </span>
    </div>
  );
};
export default ReviewCard;
