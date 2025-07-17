import Bug from '../models/Bug.js';

// Create a new bug
export const createBug = async (req, res) => {
  const { title, description, status, priority } = req.body;
  const bug = new Bug({ title, description, status, priority });
  const saved = await bug.save();
  res.status(201).json(saved);
};

// Get all bugs (with optional filtering)
export const getBugs = async (req, res) => {
  const { status, priority } = req.query;
  const query = {};
  if (status) query.status = status;
  if (priority) query.priority = priority;
  const bugs = await Bug.find(query).sort({ createdAt: -1 });
  res.json(bugs);
};

// Update a bug
export const updateBug = async (req, res) => {
  const { id } = req.params;
  const updatedBug = await Bug.findByIdAndUpdate(id, req.body, { new: true });
  if (!updatedBug) return res.status(404).json({ message: 'Bug not found' });
  res.json(updatedBug);
};

// Delete a bug
export const deleteBug = async (req, res) => {
  const { id } = req.params;
  const deleted = await Bug.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ message: 'Bug not found' });
  res.json({ message: 'Bug deleted successfully' });
};
