import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Register from './Register';
import { AppContext } from '../../../App';
import { ACTIONS } from '../../utils/UIConstants';

const mockDispatch = jest.fn();

const mockContextValue = {
  state: {
    plans: [
      { id: 1, planName: "Platinum365", planCost: 499, planValidity: 365, planStatus: 1 },
      { id: 2, planName: "Gold180", planCost: 299, planValidity: 180, planStatus: 1 },
      { id: 3, planName: "Silver90", planCost: 199, planValidity: 90, planStatus: 1 }
    ],
    customer: {
      name: '',
      email: '',
      dob: '',
      adhar_number: '',
      reg_date: '',
      mobile_number: ''
    },
    error: null
  },
  dispatch: mockDispatch
};

const renderWithContext = (component) => {
  return render(
    <AppContext.Provider value={mockContextValue}>
      {component}
    </AppContext.Provider>
  );
};

describe('Register component', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it('should render the all form fields', () => {
    renderWithContext(<Register />);
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Date of Birth')).toBeInTheDocument();
    expect(screen.getByLabelText('Adhar Number')).toBeInTheDocument();
    expect(screen.getByLabelText('Registration Date')).toBeInTheDocument();
    expect(screen.getByLabelText('Assigned Mobile Number')).toBeInTheDocument();
  });

  it('should call dispatch on Register button click', () => {
    renderWithContext(<Register />);
    fireEvent.click(screen.getByText('Register'));
    expect(mockDispatch).toHaveBeenCalledWith({ type: ACTIONS.ADD_CUSTOMER });
  });
});
