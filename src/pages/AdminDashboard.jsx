import React, { useEffect, useState } from 'react';
import { 
  getAdminStats, 
  getUsers, 
  deleteUser, 
  getAdminBookings, 
  updateBookingStatus, 
  updateBookingPaymentStatus,
  createPackage,
  updatePackage,
  deletePackage,
  getAdminReviews,
  deleteAdminReview
} from '../services/adminService';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Modal } from '../components/Modal';
import { 
  UserIcon, 
  Calendar, 
  Briefcase, 
  Plane, 
  Star, 
  Edit, 
  Trash, 
  Plus,
  PawPrint
} from '../components/Icons';

export const AdminDashboard = ({ showFeedback }) => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBookings: 0,
    totalPackages: 0,
    totalPets: 0,
    revenue: 0,
    popularPackage: 'N/A',
    recentBookings: [],
    recentUsers: []
  });
  
  const [subView, setSubView] = useState('stats'); // stats, bookings, packages, reviews, users
  
  const [userList, setUserList] = useState([]);
  const [bookingList, setBookingList] = useState([]);
  const [packageList, setPackageList] = useState([]);
  const [reviewList, setReviewList] = useState([]);

  // Package Form Modal State
  const [packageModalOpen, setPackageModalOpen] = useState(false);
  const [packageForm, setPackageForm] = useState({
    id: '',
    destination: '',
    description: '',
    price: '',
    duration: '',
    transportType: 'Flight',
    petSizeAllowed: 'All',
    maximumPets: 2,
    availableSeats: 5,
    images: ''
  });
  const [isSubmittingPackage, setIsSubmittingPackage] = useState(false);

  const fetchAdminStats = async () => {
    try {
      const statsRes = await getAdminStats();
      setStats(statsRes);
    } catch (err) {
      console.error('Error fetching admin stats:', err);
    }
  };

  const fetchTabDetails = async (tab) => {
    try {
      if (tab === 'users') {
        const res = await getUsers();
        setUserList(res);
      } else if (tab === 'bookings') {
        const res = await getAdminBookings();
        setBookingList(res);
      } else if (tab === 'packages') {
        // We'll reuse the stats fetch or fetch again? Wait, we can fetch users, bookings, reviews
        // Let's query packages from getAdminStats' packages or get admin stats again.
        // Actually we can import getPackages from packageService to keep it standard!
        const { getPackages } = require('../services/packageService');
        const pkgs = await getPackages({});
        setPackageList(pkgs);
      } else if (tab === 'reviews') {
        const res = await getAdminReviews();
        setReviewList(res);
      }
    } catch (err) {
      console.error(`Error fetching admin tab ${tab}:`, err);
    }
  };

  useEffect(() => {
    const initStats = async () => {
      setLoading(true);
      await fetchAdminStats();
      setLoading(false);
    };
    initStats();
  }, []);

  const handleTabChange = async (tab) => {
    setSubView(tab);
    if (tab !== 'stats') {
      setLoading(true);
      await fetchTabDetails(tab);
      setLoading(false);
    } else {
      setLoading(true);
      await fetchAdminStats();
      setLoading(false);
    }
  };

  /* --- Booking Adjustments --- */
  const handleApproveReject = async (bookingId, status) => {
    try {
      await updateBookingStatus(bookingId, status);
      showFeedback(`Booking status changed to ${status}!`, true);
      const res = await getAdminBookings();
      setBookingList(res);
    } catch (err) {
      showFeedback(err.message, false);
    }
  };

  const handleTogglePayment = async (bookingId, currentPayment) => {
    const nextPayment = currentPayment === 'Paid' ? 'Pending' : 'Paid';
    try {
      await updateBookingPaymentStatus(bookingId, nextPayment);
      showFeedback(`Booking payment toggled to ${nextPayment}!`, true);
      const res = await getAdminBookings();
      setBookingList(res);
    } catch (err) {
      showFeedback(err.message, false);
    }
  };

  /* --- Moderation / Deletions --- */
  const handleDeleteUserClick = async (userId) => {
    if (!window.confirm('WARNING: Deleting this user will delete all their pets, bookings, and reviews. Proceed?')) return;
    try {
      await deleteUser(userId);
      showFeedback('User account and related history deleted', true);
      const res = await getUsers();
      setUserList(res);
    } catch (err) {
      showFeedback(err.message, false);
    }
  };

  const handleDeleteReviewClick = async (reviewId) => {
    if (!window.confirm('Delete this user review from the platform?')) return;
    try {
      await deleteAdminReview(reviewId);
      showFeedback('Review moderated and removed', true);
      const res = await getAdminReviews();
      setReviewList(res);
    } catch (err) {
      showFeedback(err.message, false);
    }
  };

  const handleDeletePackageClick = async (packageId) => {
    if (!window.confirm('WARNING: Deleting this package will delete all bookings and reviews associated with it. Proceed?')) return;
    try {
      await deletePackage(packageId);
      showFeedback('Travel Package and associated history deleted', true);
      const { getPackages } = require('../services/packageService');
      const pkgs = await getPackages({});
      setPackageList(pkgs);
    } catch (err) {
      showFeedback(err.message, false);
    }
  };

  /* --- Package Modal operations --- */
  const openPackageForm = (pkg = null) => {
    if (pkg) {
      setPackageForm({
        id: pkg._id,
        destination: pkg.destination,
        description: pkg.description,
        price: pkg.price,
        duration: pkg.duration,
        transportType: pkg.transportType,
        petSizeAllowed: pkg.petSizeAllowed,
        maximumPets: pkg.maximumPets,
        availableSeats: pkg.availableSeats,
        images: pkg.images?.join(', ') || ''
      });
    } else {
      setPackageForm({
        id: '',
        destination: '',
        description: '',
        price: '',
        duration: '',
        transportType: 'Flight',
        petSizeAllowed: 'All',
        maximumPets: 2,
        availableSeats: 5,
        images: ''
      });
    }
    setPackageModalOpen(true);
  };

  const handlePackageSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingPackage(true);
    const { id, destination, description, price, duration, transportType, petSizeAllowed, maximumPets, availableSeats, images } = packageForm;

    const imgArray = images ? images.split(',').map(s => s.trim()).filter(Boolean) : [];
    const pkgData = {
      destination,
      description,
      price: Number(price),
      duration,
      transportType,
      petSizeAllowed,
      maximumPets: Number(maximumPets),
      images: imgArray,
      availableSeats: Number(availableSeats)
    };

    try {
      if (id) {
        await updatePackage(id, pkgData);
        showFeedback('Travel Package updated successfully!', true);
      } else {
        await createPackage(pkgData);
        showFeedback('Travel Package created successfully!', true);
      }
      setPackageModalOpen(false);
      const { getPackages } = require('../services/packageService');
      const pkgs = await getPackages({});
      setPackageList(pkgs);
    } catch (err) {
      showFeedback(err.message, false);
    } finally {
      setIsSubmittingPackage(false);
    }
  };

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

  if (loading && subView === 'stats') {
    return <LoadingSpinner message="Assembling platform metrics..." />;
  }

  return (
    <section style={{ padding: '3rem 0' }}>
      <div className="max-w-7xl mx-auto px-4">
        <h2 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '0.5rem', fontFamily: 'var(--font-display)', color: 'var(--color-gray-900)' }}>
          Admin Control Center
        </h2>
        <p style={{ color: 'var(--color-gray-600)', marginBottom: '2.5rem' }}>
          Platform monitoring, booking resolutions, package creation, and review audits.
        </p>

        {/* Tab Navigation */}
        <div className="admin-tabs">
          <button onClick={() => handleTabChange('stats')} className={`admin-tab-btn ${subView === 'stats' ? 'active' : ''}`}>Metrics & Overview</button>
          <button onClick={() => handleTabChange('bookings')} className={`admin-tab-btn ${subView === 'bookings' ? 'active' : ''}`}>Manage Bookings</button>
          <button onClick={() => handleTabChange('packages')} className={`admin-tab-btn ${subView === 'packages' ? 'active' : ''}`}>Manage Packages</button>
          <button onClick={() => handleTabChange('reviews')} className={`admin-tab-btn ${subView === 'reviews' ? 'active' : ''}`}>Reviews Moderation</button>
          <button onClick={() => handleTabChange('users')} className={`admin-tab-btn ${subView === 'users' ? 'active' : ''}`}>User Accounts</button>
        </div>

        {loading ? (
          <LoadingSpinner message="Querying database metrics..." />
        ) : (
          <>
            {/* Overview / Stats subview */}
            {subView === 'stats' && (
              <div>
                <div className="stats-grid">
                  <div className="stats-card">
                    <div>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-gray-600)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Registered Clients
                      </span>
                      <div className="stats-num">{stats.totalUsers}</div>
                    </div>
                    <UserIcon style={{ width: '2.5rem', height: '2.5rem', color: 'var(--color-indigo-500)' }} />
                  </div>

                  <div className="stats-card">
                    <div>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-gray-600)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Total Pets
                      </span>
                      <div className="stats-num" style={{ color: 'var(--color-indigo-600)' }}>{stats.totalPets}</div>
                    </div>
                    <PawPrint style={{ width: '2.5rem', height: '2.5rem', color: 'var(--color-indigo-600)' }} />
                  </div>

                  <div className="stats-card">
                    <div>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-gray-600)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Travel Bookings
                      </span>
                      <div className="stats-num" style={{ color: 'var(--color-green-600)' }}>{stats.totalBookings}</div>
                    </div>
                    <Calendar style={{ width: '2.5rem', height: '2.5rem', color: 'var(--color-green-500)' }} />
                  </div>

                  <div className="stats-card" style={{ borderLeft: '4px solid var(--color-green-500)' }}>
                    <div>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-gray-600)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Generated Revenue
                      </span>
                      <div className="stats-num" style={{ color: 'var(--color-green-700)' }}>${stats.revenue}</div>
                    </div>
                    <Plane style={{ width: '2.5rem', height: '2.5rem', color: 'var(--color-green-600)' }} />
                  </div>
                </div>

                <div className="grid-sm-2-col" style={{ gap: '2rem', marginTop: '2rem' }}>
                  {/* Recent Bookings */}
                  <div style={{ backgroundColor: 'var(--color-white)', padding: '1.75rem', borderRadius: '1rem', border: '1px solid var(--color-gray-200)' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', borderBottom: '1px solid var(--color-gray-100)', paddingBottom: '0.5rem', color: 'var(--color-gray-900)' }}>
                      Recent Relocations
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {stats.recentBookings.length === 0 ? (
                        <p style={{ fontStyle: 'italic', fontSize: '0.85rem', color: 'var(--color-gray-400)' }}>No bookings registered.</p>
                      ) : (
                        stats.recentBookings.map((b) => (
                          <div key={b._id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                            <div>
                              <strong>{b.userId?.name}</strong> • {b.packageId?.destination}
                              <br />
                              <span style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)' }}>Date: {new Date(b.bookingDate).toLocaleDateString()}</span>
                            </div>
                            <span className={`badge ${b.bookingStatus === 'Approved' ? 'badge-approved' : b.bookingStatus === 'Pending' ? 'badge-pending' : 'badge-rejected'}`}>
                              {b.bookingStatus}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Popular packages and system notes */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ backgroundColor: 'var(--color-white)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--color-gray-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-gray-600)', textTransform: 'uppercase' }}>
                          Most Popular Path
                        </span>
                        <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-indigo-600)', marginTop: '0.25rem' }}>
                          {stats.popularPackage}
                        </div>
                      </div>
                      <Briefcase style={{ width: '2.5rem', height: '2.5rem', color: 'var(--color-indigo-400)' }} />
                    </div>

                    <div style={{ backgroundColor: 'var(--color-white)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--color-gray-200)' }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--color-gray-900)' }}>Logs & Auditing</h3>
                      <p style={{ fontSize: '0.85rem', color: 'var(--color-gray-600)', lineHeight: '1.4', margin: 0 }}>
                        All pet health check records, documentation approvals, flight cabin slots, and driver itineraries are verified dynamically. Admin controls are protected at HTTP layers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bookings subview */}
            {subView === 'bookings' && (
              <div className="table-container">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Booking ID</th>
                      <th>User Account</th>
                      <th>Destination</th>
                      <th>Pet Companion</th>
                      <th>Travel Date</th>
                      <th>Payment Status</th>
                      <th>Booking Status</th>
                      <th style={{ textAlign: 'right' }}>Status Adjustments</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookingList.map((booking) => (
                      <tr key={booking._id}>
                        <td style={{ fontWeight: 700 }}>{booking.bookingId}</td>
                        <td>
                          <strong>{booking.userId?.name}</strong>
                          <br />
                          <span style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)' }}>{booking.userId?.email}</span>
                        </td>
                        <td>{booking.packageId?.destination || 'Deleted package'}</td>
                        <td>{booking.petId?.name || 'Deleted pet'} ({booking.petId?.species})</td>
                        <td>{new Date(booking.travelDate).toLocaleDateString()}</td>
                        <td>
                          <button 
                            onClick={() => handleTogglePayment(booking._id, booking.paymentStatus)}
                            className={`badge ${booking.paymentStatus === 'Paid' ? 'badge-approved' : 'badge-pending'}`}
                            style={{ border: 'none', cursor: 'pointer' }}
                            title="Click to toggle Payment status"
                          >
                            {booking.paymentStatus}
                          </button>
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
                          {booking.bookingStatus === 'Pending' ? (
                            <div style={{ display: 'inline-flex', gap: '0.25rem' }}>
                              <button onClick={() => handleApproveReject(booking._id, 'Approved')} className="btn btn-confirm" style={{ padding: '0.3rem 0.6rem', fontSize: '0.7rem', borderRadius: '0.25rem' }}>Approve</button>
                              <button onClick={() => handleApproveReject(booking._id, 'Rejected')} className="btn btn-danger" style={{ padding: '0.3rem 0.6rem', fontSize: '0.7rem', borderRadius: '0.25rem' }}>Reject</button>
                            </div>
                          ) : (
                            <select 
                              value={booking.bookingStatus} 
                              onChange={(e) => handleApproveReject(booking._id, e.target.value)}
                              style={{ padding: '0.25rem', fontSize: '0.8rem', borderRadius: '0.25rem', borderColor: 'var(--color-gray-400)' }}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Approved">Approved</option>
                              <option value="Rejected">Rejected</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Packages subview */}
            {subView === 'packages' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
                  <button onClick={() => openPackageForm(null)} className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem', borderRadius: '0.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Plus style={{ width: '1rem', height: '1rem' }} /> Create New Package
                  </button>
                </div>

                <div className="table-container">
                  <table className="custom-table">
                    <thead>
                      <tr>
                        <th>Destination</th>
                        <th>Transport</th>
                        <th>Pet Size</th>
                        <th>Duration</th>
                        <th>Price</th>
                        <th>Seats Available</th>
                        <th>Rating</th>
                        <th style={{ textAlign: 'right' }}>Operations</th>
                      </tr>
                    </thead>
                    <tbody>
                      {packageList.map((pkg) => (
                        <tr key={pkg._id}>
                          <td style={{ fontWeight: 700 }}>{pkg.destination}</td>
                          <td>{pkg.transportType}</td>
                          <td>{pkg.petSizeAllowed}</td>
                          <td>{pkg.duration}</td>
                          <td>${pkg.price}</td>
                          <td>{pkg.availableSeats} / {pkg.maximumPets * 5}</td>
                          <td>{pkg.rating?.toFixed(1) || '0.0'} ★</td>
                          <td style={{ textAlign: 'right' }}>
                            <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                              <button onClick={() => openPackageForm(pkg)} className="btn btn-secondary" style={{ padding: '0.35rem 0.7rem', fontSize: '0.75rem', borderRadius: '0.25rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                                <Edit style={{ width: '0.8rem', height: '0.8rem' }} /> Edit
                              </button>
                              <button onClick={() => handleDeletePackageClick(pkg._id)} className="btn btn-danger" style={{ padding: '0.35rem 0.7rem', fontSize: '0.75rem', borderRadius: '0.25rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                                <Trash style={{ width: '0.8rem', height: '0.8rem' }} /> Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Reviews subview */}
            {subView === 'reviews' && (
              <div className="table-container">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Reviewer</th>
                      <th>Target Package</th>
                      <th>Rating Stars</th>
                      <th>Comment Text</th>
                      <th>Date Published</th>
                      <th style={{ textAlign: 'right' }}>Moderate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reviewList.map((review) => (
                      <tr key={review._id}>
                        <td>
                          <strong>{review.userId?.name || 'Deleted Account'}</strong>
                          <br />
                          <span style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)' }}>{review.userId?.email}</span>
                        </td>
                        <td style={{ fontWeight: 600 }}>{review.packageId?.destination || 'Deleted Package'}</td>
                        <td>{renderStars(review.rating)}</td>
                        <td style={{ maxWidth: '300px', wordBreak: 'break-all' }}>"{review.comment}"</td>
                        <td>{new Date(review.createdAt).toLocaleDateString()}</td>
                        <td style={{ textAlign: 'right' }}>
                          <button onClick={() => handleDeleteReviewClick(review._id)} className="btn btn-danger" style={{ padding: '0.35rem 0.7rem', fontSize: '0.75rem', borderRadius: '0.25rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                            <Trash style={{ width: '0.8rem', height: '0.8rem' }} /> Delete Review
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Users subview */}
            {subView === 'users' && (
              <div className="table-container">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>Email ID</th>
                      <th>Assigned Role</th>
                      <th>Registered Date</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userList.map((client) => (
                      <tr key={client._id}>
                        <td style={{ fontWeight: 700 }}>{client.name}</td>
                        <td>{client.email}</td>
                        <td>
                          <span className={`badge ${client.role === 'admin' ? 'badge-approved' : 'badge-pending'}`}>
                            {client.role}
                          </span>
                        </td>
                        <td>{new Date(client.createdAt).toLocaleDateString()}</td>
                        <td style={{ textAlign: 'right' }}>
                          {client.role !== 'admin' && (
                            <button onClick={() => handleDeleteUserClick(client._id)} className="btn btn-danger" style={{ padding: '0.35rem 0.7rem', fontSize: '0.75rem', borderRadius: '0.25rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                              <Trash style={{ width: '0.8rem', height: '0.8rem' }} /> Delete User
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>

      {/* Package Form Modal */}
      <Modal
        isOpen={packageModalOpen}
        onClose={() => setPackageModalOpen(false)}
        title={packageForm.id ? 'Modify Travel Package' : 'Publish New Relocation Package'}
      >
        <form onSubmit={handlePackageSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="pkg-dest">Destination</label>
            <input
              type="text"
              id="pkg-dest"
              value={packageForm.destination}
              onChange={(e) => setPackageForm(prev => ({ ...prev, destination: e.target.value }))}
              required
              className="form-input"
              placeholder="e.g. Swiss Alps Expedition"
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="pkg-desc">Package Description</label>
            <textarea
              id="pkg-desc"
              value={packageForm.description}
              onChange={(e) => setPackageForm(prev => ({ ...prev, description: e.target.value }))}
              required
              className="form-input"
              rows="3"
              placeholder="Full package details, airline, ground cabins..."
              style={{ resize: 'vertical' }}
            />
          </div>

          <div className="grid-sm-2-col" style={{ gap: '1rem' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" htmlFor="pkg-price">Price ($)</label>
              <input
                type="number"
                id="pkg-price"
                value={packageForm.price}
                onChange={(e) => setPackageForm(prev => ({ ...prev, price: e.target.value }))}
                required
                className="form-input"
                placeholder="e.g. 1500"
                min="0"
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" htmlFor="pkg-dur">Duration</label>
              <input
                type="text"
                id="pkg-dur"
                value={packageForm.duration}
                onChange={(e) => setPackageForm(prev => ({ ...prev, duration: e.target.value }))}
                required
                className="form-input"
                placeholder="e.g. 7 Days"
              />
            </div>
          </div>

          <div className="grid-sm-2-col" style={{ gap: '1rem' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" htmlFor="pkg-trans">Transport Type</label>
              <select
                id="pkg-trans"
                value={packageForm.transportType}
                onChange={(e) => setPackageForm(prev => ({ ...prev, transportType: e.target.value }))}
                className="form-input"
              >
                <option value="Flight">Flight</option>
                <option value="Train">Train</option>
                <option value="Ground">Ground Vehicle</option>
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" htmlFor="pkg-size">Pet Size Allowed</label>
              <select
                id="pkg-size"
                value={packageForm.petSizeAllowed}
                onChange={(e) => setPackageForm(prev => ({ ...prev, petSizeAllowed: e.target.value }))}
                className="form-input"
              >
                <option value="All">All Sizes</option>
                <option value="Small">Small Only</option>
                <option value="Medium">Medium Only</option>
                <option value="Large">Large Only</option>
              </select>
            </div>
          </div>

          <div className="grid-sm-2-col" style={{ gap: '1rem' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" htmlFor="pkg-max">Max Pet Capacity</label>
              <input
                type="number"
                id="pkg-max"
                value={packageForm.maximumPets}
                onChange={(e) => setPackageForm(prev => ({ ...prev, maximumPets: e.target.value }))}
                required
                className="form-input"
                min="1"
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" htmlFor="pkg-seats">Available Seats</label>
              <input
                type="number"
                id="pkg-seats"
                value={packageForm.availableSeats}
                onChange={(e) => setPackageForm(prev => ({ ...prev, availableSeats: e.target.value }))}
                required
                className="form-input"
                min="0"
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="pkg-imgs">Images (Comma-separated URLs)</label>
            <input
              type="text"
              id="pkg-imgs"
              value={packageForm.images}
              onChange={(e) => setPackageForm(prev => ({ ...prev, images: e.target.value }))}
              className="form-input"
              placeholder="e.g. https://images.unsplash.com/..., https://..."
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', borderTop: '1px solid var(--color-gray-100)', paddingTop: '1.25rem', marginTop: '1rem' }}>
            <button 
              type="button" 
              onClick={() => setPackageModalOpen(false)} 
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isSubmittingPackage}
            >
              {isSubmittingPackage ? 'Saving...' : 'Publish Package'}
            </button>
          </div>
        </form>
      </Modal>
    </section>
  );
};

export default AdminDashboard;
