import React, { useEffect, useState } from 'react';
import BugForm from './components/BugForm';
import BugList from './components/BugList';
import ErrorBoundary from './components/ErrorBoundary';
import api from './services/api'; // 👈 Connects to backend
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import './index.css';

function App() {
  const [bugs, setBugs] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const fetchBugs = React.useCallback(async () => {
    try {
      const params = {};
      if (filter !== 'all') params.status = filter;

      const res = await api.get('/bugs', { params });
      setBugs(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error('Error fetching bugs:', error);
      setBugs([]);
    }
  }, [filter]);

  useEffect(() => {
    fetchBugs();
  }, [fetchBugs]);

  const addBug = async (bugData) => {
    try {
      const res = await api.post('/bugs', bugData);
      setBugs([res.data, ...bugs]);
    } catch (error) {
      console.error('Error adding bug:', error);
    }
  };

  const updateBug = async (id, updates) => {
    try {
      const res = await api.put(`/bugs/${id}`, updates);
      setBugs(bugs.map((b) => (b._id === id ? res.data : b)));
    } catch (error) {
      console.error('Error updating bug:', error);
    }
  };

  const deleteBug = async (id) => {
    try {
      await api.delete(`/bugs/${id}`);
      setBugs(bugs.filter((b) => b._id !== id));
    } catch (error) {
      console.error('Error deleting bug:', error);
    }
  };

  const filteredBugs = bugs.filter((bug) =>
    bug.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ErrorBoundary>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 py-10">
        <Card className="w-full max-w-3xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-blue-800 text-center">
              Bug Tracker
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BugForm onAdd={addBug} />

            <div className="flex flex-col md:flex-row gap-4 my-6">
              <Input
                type="text"
                placeholder="Search bugs by title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full"
              />

              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter bugs" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {filteredBugs.length === 0 ? (
              <p className="text-center text-gray-500">No bugs found.</p>
            ) : (
              <BugList bugs={filteredBugs} onUpdate={updateBug} onDelete={deleteBug} />
            )}
          </CardContent>
        </Card>
      </div>
    </ErrorBoundary>
  );
}

export default App;
