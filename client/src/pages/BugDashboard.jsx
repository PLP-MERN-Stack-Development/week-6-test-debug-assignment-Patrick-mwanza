import React, { useEffect, useState } from 'react';
import api from '../services/api';
import BugList from '../components/BugList';
import { toast } from 'react-toastify';

const BugDashboard = () => {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBugs = async () => {
    try {
      const res = await api.get('/bugs');
      setBugs(res.data);
    } catch (err) {
      console.error('Error fetching bugs:', err);
      toast.error('Failed to load bugs');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id, updatedFields) => {
    try {
      const res = await api.put(`/bugs/${id}`, updatedFields);
      setBugs((prev) =>
        prev.map((bug) => (bug._id === id ? res.data : bug))
      );
      toast.success('Bug updated');
    } catch (err) {
      console.error('Error updating bug:', err);
      toast.error('Update failed');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/bugs/${id}`);
      setBugs((prev) => prev.filter((bug) => bug._id !== id));
      toast.success('Bug deleted');
    } catch (err) {
      console.error('Error deleting bug:', err);
      toast.error('Delete failed');
    }
  };

  useEffect(() => {
    fetchBugs();
  }, []);

  if (loading) return <p className="p-4 text-gray-600">Loading bugs...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Bug Tracker Dashboard</h1>
      <BugList bugs={bugs} onUpdate={handleUpdate} onDelete={handleDelete} />
    </div>
  );
};

export default BugDashboard;
