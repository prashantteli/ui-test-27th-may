import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useContext } from 'react';
import { AppContext } from '../../App';
import PlanCard from './PlanCard';
import { ACTIONS } from '../utils/UIConstants';

function getNextDate(inputDate, daysToAdd) {
    // Parse the input date string into a Date object
    const parts = inputDate.split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Month is zero-based in JavaScript Date object
    const day = parseInt(parts[2], 10) + 1;
    const date = new Date(year, month, day);

    // Calculate the next date by adding daysToAdd to the input date
    const nextDate = new Date(date.getTime() + daysToAdd * 24 * 60 * 60 * 1000);

    // Format the next date as yyyy/MM/DD
    const formattedNextDate = `${nextDate.getFullYear()}-${(nextDate.getMonth() + 1).toString().padStart(2, '0')}-${nextDate.getDate().toString().padStart(2, '0')}`;

    return formattedNextDate;
}

export default function PlanDetails() {
    const { state, dispatch } = useContext(AppContext);
    const { customer, plans } = state;
    let plan = plans.filter(p => p.id === customer.plan_id);
    if (Array.isArray(plan) && plan.length > 0) {
        plan = plan[0];
    }
    let renewalDate = '';
    let isActive = false;
    if(customer.reg_date) {
        renewalDate = getNextDate(customer.reg_date, plan.planValidity);
        isActive = new Date(renewalDate) >= new Date();
    }
     

    return (
        <Container fluid>
            <section>
                <h4>Customer Details</h4>
                <div>
                    Name : {customer.name}
                </div>
                <div>
                    Mobile Number : {customer.mobile_number}
                </div>
            </section>
            <hr />
            <section>

                <h4>Plan Details</h4>
                <div>
                    Plan Name : {plan.planName}
                </div>
                <div>
                    Plan Validaity : {plan.planValidity}
                </div>
                <div>
                    Plan Cost : {plan.planCost}
                </div>
                <div>
                    Renewal Date : {renewalDate}
                </div>
                <div>
                    Status : {isActive ? 'Active' : 'Inactive'}
                </div>
            </section>
            <hr />
            <h3>Upgrade/Downgrade Plan</h3>
            <Row>
                {plans && plans.map(p => <Col key={p.id} ><PlanCard plan={p} /></Col>)}
            </Row>
            <hr />
            <footer>
                <Button onClick = {
                    () => {
                        dispatch({type : ACTIONS.UPDATE_PLAN, payload: {...customer, renewalDate}});
                    }
                }>Update Plan</Button>
            </footer>
            <br/>
        </Container>
    )
}