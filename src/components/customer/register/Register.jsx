
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import PlanCard from '../../plan/PlanCard';
import { AppContext } from '../../../App';
import { useContext, useEffect } from 'react';
import { ACTIONS } from '../../utils/UIConstants';
export default function Register() {
  const context = useContext(AppContext);
  const { state, dispatch } = context;
  const { plans, customer, validFields } = state;

  useEffect(() => {
    dispatch({type : ACTIONS.INIT_CUSTOMER})
  }, [])
  return (
    <Container fluid>
      {state.error && <Alert show={state.error} variant="danger">
        {state.error}
      </Alert>}
      <Form>
        <h3>Register Customer</h3>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name"
             isInvalid = {!customer.name}
             isValid = {customer.name}
             value={customer.name} required
              onChange={(e) => {
                dispatch({ type: ACTIONS.MODIFY_CUSTOMER, payload: { field: 'name', value: e.target.value } });
              }}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control 
            isInvalid = {!validFields.email}
            isValid = {validFields.email}
            type="email" placeholder="Enter email e.g. test@website.com" value={customer.email} required
              onChange={(e) => {
                dispatch({ type: ACTIONS.MODIFY_CUSTOMER, payload: { field: 'email', value: e.target.value } });
              }} />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridDOB">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control 
            isInvalid = {!validFields.dob}
            isValid = {validFields.dob}
            type="date" placeholder="Enter date of birth, should be in past" value={customer.dob} required
              onChange={(e) => {
                dispatch({ type: ACTIONS.MODIFY_CUSTOMER, payload: { field: 'dob', value: e.target.value } });
              }} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridUID">
            <Form.Label>Adhar Number</Form.Label>
            <Form.Control 
            isInvalid = {!validFields.adhar_number}
            isValid = {validFields.adhar_number}
            type="text" placeholder="Enter Adhar Number should contain 14 digits" value={customer.adhar_number} required
              onChange={(e) => {
                dispatch({ type: ACTIONS.MODIFY_CUSTOMER, payload: { field: 'adhar_number', value: e.target.value } });
              }} />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridDate">
            <Form.Label>Registration Date</Form.Label>
            <Form.Control 
            isInvalid = {!customer.reg_date}
            isValid = {customer.reg_date}
            type="date" placeholder="Enter date of registration should be in future" value={customer.reg_date} required
              onChange={(e) => {
                dispatch({ type: ACTIONS.MODIFY_CUSTOMER, payload: { field: 'reg_date', value: e.target.value } });
              }} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridMobile">
            <Form.Label>Assigned Mobile Number</Form.Label>
            <Form.Control 
            isInvalid = {!validFields.mobile_number}
            isValid = {validFields.mobile_number}
            type="text" placeholder="Enter assigned mobile number should contain 10 digit" value={customer.mobile_number} required
              onChange={(e) => {
                dispatch({ type: ACTIONS.MODIFY_CUSTOMER, payload: { field: 'mobile_number', value: e.target.value } });
              }} />
          </Form.Group>
        </Row>

        <Container fluid>
          <h3>Select Plan</h3>
          <Row>
            {plans && plans.map(p => <Col key={p.id} ><PlanCard plan={p} /></Col>)}
          </Row>
        </Container>
        <br />
        <Container fluid>
          <Button variant="primary" type="button" onClick={() => {
            dispatch({ type: ACTIONS.ADD_CUSTOMER });
          }}>
            Register
          </Button> {' '}
          <Button variant="secondary" type="button">
            Reset
          </Button>
        </Container>
      </Form>
    </Container>
  );
}