import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PlanDetails from './PlanDetails';
import { AppContext } from '../../App';
import { ACTIONS } from '../utils/UIConstants';
import '@testing-library/jest-dom/extend-expect'; // for better assertions

const mockDispatch = jest.fn();

const mockContextValue = {
  state: {
    customer: {
      name: 'John Doe',
      mobile_number: '1234567890',
      plan_id: 1,
      reg_date: '2024-01-01'
    },
    plans: [
      { id: 1, planName: "Platinum365", planCost: 499, planValidity: 365, planStatus: 1 },
      { id: 2, planName: "Gold180", planCost: 299, planValidity: 180, planStatus: 1 },
      { id: 3, planName: "Silver90", planCost: 199, planValidity: 90, planStatus: 1 }
    ]
  },
  dispatch: mockDispatch,
};

const renderWithContext = (component) => {
  return render(
    <AppContext.Provider value={mockContextValue}>
      {component}
    </AppContext.Provider>
  );
};

describe('PlanDetails component', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it('should render customer and plan details correctly', () => {
    renderWithContext(<PlanDetails />);
    
    expect(screen.getByText('Customer Details')).toBeInTheDocument();
    expect(screen.getByText('Name : John Doe')).toBeInTheDocument();
    expect(screen.getByText('Mobile Number : 1234567890')).toBeInTheDocument();

    expect(screen.getByText('Plan Details')).toBeInTheDocument();
    expect(screen.getByText('Plan Name : Platinum365')).toBeInTheDocument();
    expect(screen.getByText('Plan Validaity : 365')).toBeInTheDocument();
    expect(screen.getByText('Plan Cost : 499')).toBeInTheDocument();
  });

  it('should calculate and display the correct renewal date and status', () => {
    renderWithContext(<PlanDetails />);
    
    const renewalDate = screen.getByText('Renewal Date : 2025-01-01');
    const status = screen.getByText('Status : Active');

    expect(renewalDate).toBeInTheDocument();
    expect(status).toBeInTheDocument();
  });

  it('should render plan options for upgrade/downgrade', () => {
    renderWithContext(<PlanDetails />);
    
    expect(screen.getByText('Upgrade/Downgrade Plan')).toBeInTheDocument();
    expect(screen.getByText('Platinum365')).toBeInTheDocument();
    expect(screen.getByText('Gold180')).toBeInTheDocument();
    expect(screen.getByText('Silver90')).toBeInTheDocument();
  });

  it('should dispatch UPDATE_PLAN action with correct payload when Update Plan button is clicked', () => {
    renderWithContext(<PlanDetails />);
    
    const updateButton = screen.getByRole('button', { name: /update plan/i });
    fireEvent.click(updateButton);
    
    expect(mockDispatch).toHaveBeenCalledWith({
      type: ACTIONS.UPDATE_PLAN,
      payload: {
        ...mockContextValue.state.customer,
        renewalDate: '2025-01-01'
      }
    });
  });
});
