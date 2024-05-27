import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { AppContext } from '../../App';
import { useContext } from 'react';
import { ACTIONS } from '../utils/UIConstants';
function PlanCard({ plan, k }) {
    const context = useContext(AppContext);
    const { state, dispatch } = context;
    const { selectedPlanId } = state;
    
    return (
        <Card key={k}>
            <Card.Body>
                <Card.Title>{plan.planName}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Valid for {plan.planValidity} days</Card.Subtitle>
                <Card.Text>
                    Plan Cost - {plan.planCost}
                </Card.Text>
                <Button variant={selectedPlanId === plan.id ? 
                    "primary" : "secondary" }
                    onClick={() => {
                        dispatch({type : ACTIONS.SELECT_PLAN, payload : plan.id})
                    }}>{selectedPlanId === plan.id ? 'Selected' : 'Select'}</Button>
            </Card.Body>
        </Card>
    );
}

export default PlanCard;