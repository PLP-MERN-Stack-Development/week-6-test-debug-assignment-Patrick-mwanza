// File: client/src/tests/integration/App.test.jsx
import { render, screen, waitFor } from '@testing-library/react';
import App from '../../App';
import '@testing-library/jest-dom';
import axios from 'axios';

// Import Jest globals for test environment (optional in most setups, but explicit for clarity)
import { describe, it, expect, jest } from '@jest/globals';

jest.mock('axios');

describe('App Integration', () => {
  it('renders app and loads bugs', async () => {
    axios.get.mockResolvedValueOnce({
      data: [
        {
          _id: '1',
          title: 'Bug One',
          description: 'Description One',
          status: 'open',
        },
      ],
    });

    render(<App />);

    expect(screen.getByText(/bug tracker/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/bug one/i)).toBeInTheDocument();
      expect(screen.getByText(/description one/i)).toBeInTheDocument();
    });
  });
});
