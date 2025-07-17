// File: client/src/tests/unit/BugForm.test.jsx
/* eslint-env jest */
/* global describe, it, expect */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BugForm from '../../components/BugForm';
import '@testing-library/jest-dom';
import axios from 'axios';
import { jest } from '@jest/globals';

jest.mock('axios');

describe('BugForm Component', () => {
  it('renders form fields and button', () => {
    render(<BugForm onAdd={jest.fn()} />);

    expect(screen.getByPlaceholderText(/bug title/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/bug description/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /report bug/i })).toBeInTheDocument();
  });

  it('submits form and calls onAdd with returned data', async () => {
    const mockBug = {
      _id: '123',
      title: 'Test Bug',
      description: 'This is a test bug.',
      status: 'open',
    };
    axios.post.mockResolvedValueOnce({ data: mockBug });

    const mockOnAdd = jest.fn();
    render(<BugForm onAdd={mockOnAdd} />);

    fireEvent.change(screen.getByPlaceholderText(/bug title/i), {
      target: { value: 'Test Bug' },
    });
    fireEvent.change(screen.getByPlaceholderText(/bug description/i), {
      target: { value: 'This is a test bug.' },
    });

    fireEvent.click(screen.getByRole('button', { name: /report bug/i }));

    await waitFor(() => {
      expect(mockOnAdd).toHaveBeenCalledWith(mockBug);
    });

    expect(axios.post).toHaveBeenCalledWith('/api/bugs', {
      title: 'Test Bug',
      description: 'This is a test bug.',
    });
  });
});
