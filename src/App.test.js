import { render, screen } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  it('should render app title', () => {
    render(<App />);
    expect(screen.getByText(/Telecom Customer Management System/i)).toBeInTheDocument();
  });
});
