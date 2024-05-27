
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { AppContext } from '../../../App';
import { ACTIONS } from '../../utils/UIConstants';
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function CustomerList() {
  const context = useContext(AppContext);
  const { state, dispatch } = context;
  const { customers, plans } = state;
  useEffect(() => {
    dispatch({ type: ACTIONS.FETCH_CUSTOMERS });
    dispatch({ type: ACTIONS.FETCH_PLANS });
  }, []);
  return (
    <Container fluid>
      <h3>Existing Customers</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Mobile Number</th>
            <th>Adhar Number</th>
            <th>Date of Registration</th>
            <th>Plan Details</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers && customers.map(c => {
            let plan = plans.filter(p => p.id === c.plan_id);
            if (Array.isArray(plan) && plan.length > 0) {
              plan = plan[0].planName + ' | ' + plan[0].planValidity + ' | ' + plan[0].planCost;
            }
            return <tr key={c.mobile_number}>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.dob}</td>
              <td>{c.mobile_number}</td>
              <td>{c.adhar_number}</td>
              <td>{c.reg_date}</td>
              <td>{plan}</td>
              <td>
                <Button variant="light" onClick = { () => {
                dispatch({type : ACTIONS.EDIT_EXISTING, payload : c})
              }}><Link to="/planDetails">Edit</Link></Button></td>
            </tr>
          })}
        </tbody>
      </Table>
      <Link to="/register">Add New</Link>
    </Container>
  );
}
