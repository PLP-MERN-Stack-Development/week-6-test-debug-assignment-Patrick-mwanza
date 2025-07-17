import React, { useState } from 'react';
import api from '../services/api'; // ✅ Use shared Axios instance
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const BugForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/bugs', { title, description }); // ✅ Use shared API client
      onAdd(res.data);
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error reporting bug:', error);
    }
  };

  const handleFilter = () => {
    // Optional future implementation or prop callback
    console.log('Filter clicked');
  };

  const handleDelete = () => {
    // Optional future implementation or prop callback
    console.log('Delete clicked');
  };

  return (
    <Card className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-center text-blue-700">Report a Bug</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Bug title"
          required
          className="text-red-600 placeholder:text-red-400 border border-red-300 focus:ring-red-500 focus:border-red-500"
        />
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Bug description"
          className="text-red-600 placeholder:text-red-400 border border-red-300 focus:ring-red-500 focus:border-red-500"
        />
        <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold">
          Report Bug
        </Button>
      </form>

      <div className="mt-6 flex justify-between">
        <Button variant="primary" size="md" onClick={handleFilter}>
          Filter
        </Button>
        <Button variant="danger" size="md" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </Card>
  );
};

export default BugForm;
