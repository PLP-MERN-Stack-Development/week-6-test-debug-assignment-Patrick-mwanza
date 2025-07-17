import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const BugList = ({ bugs = [], onUpdate = () => {}, onDelete = () => {} }) => (
  <div className="space-y-4">
    {bugs.length === 0 ? (
      <p className="text-center text-gray-500">No bugs reported yet.</p>
    ) : (
      bugs.map((bug) => (
        <Card key={bug._id} className="bg-white shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg text-gray-800">{bug.title}</CardTitle>
            <Button
              variant="ghost"
              className="text-red-500 hover:text-red-700 text-sm"
              onClick={() => onDelete(bug._id)}
            >
              Delete
            </Button>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">{bug.description}</p>
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-700">Status:</label>
              <select
                className="border border-gray-300 p-1 rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={bug.status}
                onChange={(e) =>
                  onUpdate(bug._id, { status: e.target.value })
                }
              >
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </CardContent>
        </Card>
      ))
    )}
  </div>
);

export default BugList;
