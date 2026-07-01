import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getBookings, cancelBooking } from '../services/bookingService';
import { createReview, updateReview, deleteReview } from '../services/reviewService';
import { getAdminReviews } from '../services/adminService'; 
import { LoadingSpinner } from '../components/LoadingSpinner';
import { EmptyState } from '../components/EmptyState';
import { Modal } from '../components/Modal';
import { Calendar, Star, PawPrint } from '../components/Icons';

export const Dashboard = ({ setView, showFeedback }) => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Review Modal state
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    reviewId: '',
    packageId: '',
    rating: 5,
    comment: ''
  });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const fetchDashboardData = async () => {
    try {
      const data = await getBookings();
      setBookings(data);
      
      
      const reviewData = await getAdminReviews().catch(() => ({ data: [] }));
      setReviews(reviewData.data || []);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleCancel = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking? This will restore the available seats.')) {
      return;
    }
    try {
      await cancelBooking(bookingId);
      showFeedback('Booking cancelled successfully', true);
      fetchDashboardData();
    } catch (err) {
      showFeedback(err.message, false);
    }
  };

  // Get user's review for a package if it exists
  const getPackageReview = (pkgId) => {
    return reviews.find(r => r.userId?._id === user?._id && r.packageId?._id === pkgId);
  };

  const openReviewModal = (booking) => {
    const existing = getPackageReview(booking.packageId?._id);
    if (existing) {
      setReviewForm({
        reviewId: existing._id,
        packageId: booking.packageId._id,
        rating: existing.rating,
        comment: existing.comment
      });
    } else {
      setReviewForm({
        reviewId: '',
        packageId: booking.packageId._id,
        rating: 5,
        comment: ''
      });
    }
    setReviewModalOpen(true);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingReview(true);
    const { reviewId, packageId, rating, comment } = reviewForm;
    try {
      if (reviewId) {
        await updateReview(reviewId, rating, comment);
        showFeedback('Review updated successfully!', true);
      } else {
        await createReview(packageId, rating, comment);
        showFeedback('Review submitted successfully!', true);
      }
      setReviewModalOpen(false);
      fetchDashboardData();
    } catch (err) {
      showFeedback(err.message, false);
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const handleReviewDelete = async () => {
    if (!window.confirm('Are you sure you want to delete your review?')) return;
    setIsSubmittingReview(true);
    try {
      await deleteReview(reviewForm.reviewId);
      showFeedback('Review deleted successfully', true);
      setReviewModalOpen(false);
      fetchDashboardData();
    } catch (err) {
      showFeedback(err.message, false);
    } finally {
      setIsSubmittingReview(false);
    }
  };



  /* --- Calculations for user stats --- */
  const totalBookings = bookings.length;
  const now = new Date();

  const upcomingTrips = bookings.filter(b => 
    new Date(b.travelDate) >= now && 
    (b.bookingStatus === 'Approved' || b.bookingStatus === 'Pending')
  ).length;

  const completedTrips = bookings.filter(b => 
    new Date(b.travelDate) < now && 
    b.bookingStatus === 'Approved'
  ).length;

  const cancelledTrips = bookings.filter(b => 
    b.bookingStatus === 'Cancelled'
  ).length;

  if (loading) {
    return <LoadingSpinner message="Assembling dashboard metrics..." />;
  }

  return (
    <section style={{ padding: '3rem 0' }}>
      <div className="max-w-7xl mx-auto px-4">
        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', fontFamily: 'var(--font-display)', color: 'var(--color-gray-900)' }}>
          My Travel Dashboard
        </h2>
        <p style={{ color: 'var(--color-gray-600)', marginBottom: '2.5rem' }}>
          Welcome back, <strong>{user?.name}</strong>! Review your upcoming schedules and completed journeys.
        </p>

        {/* User Stats Grid */}
        <div className="stats-grid">
          <div className="stats-card">
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-gray-600)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Total Bookings
              </span>
              <div className="stats-num">{totalBookings}</div>
            </div>
            <Calendar style={{ width: '2.5rem', height: '2.5rem', color: 'var(--color-indigo-500)' }} />
          </div>

          <div className="stats-card">
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-gray-600)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Upcoming Journeys
              </span>
              <div className="stats-num" style={{ color: 'var(--color-indigo-600)' }}>{upcomingTrips}</div>
            </div>
            <PawPrint style={{ width: '2.5rem', height: '2.5rem', color: 'var(--color-indigo-600)' }} />
          </div>

          <div className="stats-card">
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-gray-600)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Completed Flights
              </span>
              <div className="stats-num" style={{ color: 'var(--color-green-600)' }}>{completedTrips}</div>
            </div>
            <Calendar style={{ width: '2.5rem', height: '2.5rem', color: 'var(--color-green-500)' }} />
          </div>

          <div className="stats-card">
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-gray-600)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Cancelled Requests
              </span>
              <div className="stats-num" style={{ color: 'var(--color-red-600)' }}>{cancelledTrips}</div>
            </div>
            <Calendar style={{ width: '2.5rem', height: '2.5rem', color: 'var(--color-red-500)' }} />
          </div>
        </div>

        {/* History Table */}
        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-gray-900)', marginBottom: '1.5rem', fontFamily: 'var(--font-display)' }}>
          Booking History
        </h3>

        {bookings.length === 0 ? (
          <EmptyState
            icon={Calendar}
            title="No relocation bookings found"
            description="Ready to plan your companion's relocate travel? Browse our routes and book."
            actionLabel="Explore Packages"
            onAction={() => setView('packages')}
          />
        ) : (
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Destination</th>
                  <th>Pet Registered</th>
                  <th>Booking Date</th>
                  <th>Travel Date</th>
                  <th>Price</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => {
                  const packageReview = getPackageReview(booking.packageId?._id);
                  const isFutureTrip = new Date(booking.travelDate) >= now;
                  return (
                    <tr key={booking._id}>
                      <td style={{ fontWeight: 700, color: 'var(--color-gray-900)' }}>{booking.bookingId}</td>
                      <td>
                        <span style={{ fontWeight: 600 }}>{booking.packageId?.destination || 'Deleted Package'}</span>
                        <br />
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)' }}>{booking.packageId?.transportType}</span>
                      </td>
                      <td>{booking.petId?.name || 'Deleted Pet'}</td>
                      <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                      <td>{new Date(booking.travelDate).toLocaleDateString()}</td>
                      <td style={{ fontWeight: 700 }}>${booking.packageId?.price || 0}</td>
                      <td>
                        <span className={`badge ${booking.paymentStatus === 'Paid' ? 'badge-approved' : 'badge-pending'}`}>
                          {booking.paymentStatus}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${
                          booking.bookingStatus === 'Approved' ? 'badge-approved' : 
                          booking.bookingStatus === 'Pending' ? 'badge-pending' : 
                          booking.bookingStatus === 'Rejected' ? 'badge-rejected' : 'badge-cancelled'}`}>
                          {booking.bookingStatus}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                          {booking.bookingStatus === 'Approved' && (
                            <button 
                              onClick={() => openReviewModal(booking)} 
                              className="btn btn-primary" 
                              style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', borderRadius: '0.35rem' }}
                            >
                              {packageReview ? 'Edit Review' : 'Add Review'}
                            </button>
                          )}
                          
                          {isFutureTrip && (booking.bookingStatus === 'Pending' || booking.bookingStatus === 'Approved') && (
                            <button 
                              onClick={() => handleCancel(booking._id)} 
                              className="btn btn-danger" 
                              style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', borderRadius: '0.35rem' }}
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Review Modal */}
      <Modal 
        isOpen={reviewModalOpen} 
        onClose={() => setReviewModalOpen(false)}
        title={reviewForm.reviewId ? 'Modify Your Review' : 'Rate Your Trip Experience'}
      >
        <form onSubmit={handleReviewSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Star Rating</label>
            <div className="star-rating-selector">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setReviewForm(prev => ({ ...prev, rating: star }))}
                  className={`star-btn ${reviewForm.rating >= star ? 'active' : ''}`}
                >
                  <Star style={{ width: '2rem', height: '2rem', fill: reviewForm.rating >= star ? '#f59e0b' : 'none' }} />
                </button>
              ))}
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label htmlFor="rev-comment" className="form-label">Review Description</label>
            <textarea
              id="rev-comment"
              value={reviewForm.comment}
              onChange={(e) => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
              placeholder="Tell other pet owners about transport comfort, safety, carrier hygiene, and staff response..."
              required
              className="form-input"
              rows="4"
              style={{ resize: 'vertical' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', borderTop: '1px solid var(--color-gray-100)', paddingTop: '1.25rem' }}>
            <div>
              {reviewForm.reviewId && (
                <button 
                  type="button" 
                  onClick={handleReviewDelete} 
                  className="btn btn-danger" 
                  style={{ padding: '0.5rem 1.25rem', borderRadius: '0.5rem' }}
                  disabled={isSubmittingReview}
                >
                  Delete Review
                </button>
              )}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button 
                type="button" 
                onClick={() => setReviewModalOpen(false)} 
                className="btn btn-secondary" 
                style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem' }}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ padding: '0.5rem 1.5rem', borderRadius: '0.5rem' }}
                disabled={isSubmittingReview}
              >
                {isSubmittingReview ? 'Saving...' : 'Save Review'}
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </section>
  );
};

export default Dashboard;
