import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomerList from './CustomerList';
import { AppContext } from '../../../App';
import { ACTIONS } from '../../utils/UIConstants';
import { BrowserRouter as Router } from 'react-router-dom';

const mockDispatch = jest.fn();

const mockContextValue = {
  state: {
    customers: [
      {
        name: 'John Doe',
        email: 'john@example.com',
        dob: '1990-01-01',
        mobile_number: '1234567890',
        adhar_number: '111122223333',
        reg_date: '2023-01-01',
        plan_id: 1
      }
    ],
    plans: [
      { id: 1, planName: "Platinum365", planCost: 499, planValidity: 365, planStatus: 1 },
      { id: 2, planName: "Gold180", planCost: 299, planValidity: 180, planStatus: 1 },
      { id: 3, planName: "Silver90", planCost: 199, planValidity: 90, planStatus: 1 }
    ]
  },
  dispatch: mockDispatch
};

const renderWithContext = (component) => {
  return render(
    <AppContext.Provider value={mockContextValue}>
      <Router>
        {component}
      </Router>
    </AppContext.Provider>
  );
};

describe('CustomerList component', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it('should render customer list table with data', () => {
    renderWithContext(<CustomerList />);

    expect(screen.getByText('Existing Customers')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('1990-01-01')).toBeInTheDocument();
    expect(screen.getByText('1234567890')).toBeInTheDocument();
    expect(screen.getByText('111122223333')).toBeInTheDocument();
    expect(screen.getByText('2023-01-01')).toBeInTheDocument();
    expect(screen.getByText('Platinum365 | 365 | 499')).toBeInTheDocument();
  });

  it('should dispatch actions on component mount', () => {
    renderWithContext(<CustomerList />);
    expect(mockDispatch).toHaveBeenCalledWith({ type: ACTIONS.FETCH_CUSTOMERS });
    expect(mockDispatch).toHaveBeenCalledWith({ type: ACTIONS.FETCH_PLANS });
  });

  it('should call dispatch with EDIT_EXISTING action when Edit button is clicked', () => {
    renderWithContext(<CustomerList />);

    let editButton = screen.getByText('Edit').closest('button');
    fireEvent.click(editButton);

    expect(mockDispatch).toHaveBeenCalledWith({ type: ACTIONS.EDIT_EXISTING, payload: mockContextValue.state.customers[0] });
  });

  it('should have link to add new customer', () => {
    renderWithContext(<CustomerList />);
    expect(screen.getByText('Add New').closest('a')).toHaveAttribute('href', '/register');
  });
});
