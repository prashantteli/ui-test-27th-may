import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PlanCard from './PlanCard';
import { AppContext } from '../../App';
import { ACTIONS } from '../utils/UIConstants';
import '@testing-library/jest-dom/extend-expect'; // for better assertions

const mockDispatch = jest.fn();

const mockContextValue = {
  state: {
    selectedPlanId: 1,
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

describe('PlanCard component', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  const plan = {
    id: 1,
    planName: "Platinum365",
    planCost: 499,
    planValidity: 365,
    planStatus: 1
  };

  it('should render plan details correctly', () => {
    renderWithContext(<PlanCard plan={plan} />);
    
    expect(screen.getByText('Platinum365')).toBeInTheDocument();
    expect(screen.getByText('Valid for 365 days')).toBeInTheDocument();
    expect(screen.getByText('Plan Cost - 499')).toBeInTheDocument();
  });

  it('should display "Selected" button if the plan is selected', () => {
    renderWithContext(<PlanCard plan={plan} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Selected');
    expect(button).toHaveClass('btn-primary'); // bootstrap primary button class
  });

  it('should display "Select" button if the plan is not selected', () => {
    mockContextValue.state.selectedPlanId = 2;
    renderWithContext(<PlanCard plan={plan} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Select');
    expect(button).toHaveClass('btn-secondary'); // bootstrap secondary button class
  });

  it('should call dispatch with correct action when button is clicked', () => {
    renderWithContext(<PlanCard plan={plan} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(mockDispatch).toHaveBeenCalledWith({ type: ACTIONS.SELECT_PLAN, payload: 1 });
  });
});
