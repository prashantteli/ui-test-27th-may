import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './App.css';
import Register from './components/customer/register/Register';
import CustomerList from './components/customer/list/CustomerList';
import { getCustomerRecords, getPlans, saveCustomer } from './services/APIService';
import { ACTIONS, INIT_STATE } from './components/utils/UIConstants';
import { useEffect, createContext, useReducer, Component } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import PlanDetails from './components/plan/PlanDetails';
export const AppContext = createContext();

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </ErrorBoundary>

  );
}

function Root() {

  const getCustomers = async () => {
    getCustomerRecords().then((res) => {
      dispatch({ type: ACTIONS.UPDATE_CUSTOMERS, payload: res });
    }).catch(e => {
      console.log(e);
    });
  }

  const getPlansDetails = () => {
    getPlans().then((res) => {
      dispatch({ payload: res, type: ACTIONS.UPDATE_PLANS, });
    }).catch(e => {
      console.log(e);
    });
  }
  const navigate = useNavigate();
  const saveCustomerRecord = (customers) => {
    saveCustomer(customers).then(res => {
      navigate("/");
      console.log(res);
    })
  }

  const validateCustomer = (customer) => {
    if (!customer || Object.keys(customer).length === 0) {
      return false;
    } else {
      let validFields = Object.keys(customer).filter(f => customer[f]);
      if (validFields.length === 0) {
        return false;
      }
    }
    return true;
  }

  const checkIfAlreadyPresent = (newCustomer, customers) => {
    let duplicates = customers.filter(c => c.mobile_number === newCustomer.mobile_number);
    if (duplicates.length > 0) {
      return true;
    }
    return false;
  }

  const validateAdharAndMobile = (customer) => {
    if ((isNaN(customer.adhar_number) || customer.adhar_number.length === 12) &&
      (isNaN(customer.mobile_number) || customer.mobile_number.length === 10)) {
      return true;
    }
    return false;
  }

  const appReducerFn = (state, action) => {
    const newState = { ...state };
    const { payload, type } = action;
    switch (type) {
      case ACTIONS.FETCH_CUSTOMERS:
        getCustomers();
        return newState;
      case ACTIONS.UPDATE_CUSTOMERS:
        newState.customers = payload;
        return newState;
      case ACTIONS.FETCH_PLANS:
        getPlansDetails();
        return newState;
      case ACTIONS.UPDATE_PLANS:
        newState.plans = payload;
        return newState;
      case ACTIONS.SELECT_PLAN:
        newState.selectedPlanId = payload;
        return newState;
      case ACTIONS.MODIFY_CUSTOMER:
        if (payload.field === 'email') {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (emailPattern.test(payload.value)) {
            newState.validFields[payload.field] = true;
          }
        } else if (payload.field === 'adhar_number') {
          if (payload.value.length === 14) {
            newState.validFields[payload.field] = true;
          } else {
            newState.validFields[payload.field] = false;
          }
        } else if (payload.field === 'mobile_number') {
          if (payload.value.length === 10) {
            newState.validFields[payload.field] = true;
          } else {
            newState.validFields[payload.field] = false;
          }
        } else if (payload.field === 'dob' || payload.field === 'reg_date') {
          const validateDOB = (dob) => {
            const selectedDate = new Date(dob);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return selectedDate <= today;
          };

          if (payload.field === 'reg_date') {
            if (!validateDOB(payload.value)) {
              newState.validFields[payload.field] = true;
            } else {
              newState.validFields[payload.field] = false;
            }
          } else {
            if (validateDOB(payload.value)) {
              newState.validFields[payload.field] = true;
            } else {
              newState.validFields[payload.field] = false;
            }
          }
        }

        newState.customer[payload.field] = payload.value;
        return newState;
      case ACTIONS.ADD_CUSTOMER:
        newState.error = '';
        if (!validateCustomer(newState.customer)) {
          newState.error = 'Provide details for mandatory fields.';
        }

        if (!newState.error && !newState.selectedPlanId) {
          newState.error = 'Please select plan.';
        }

        if (!newState.error && checkIfAlreadyPresent(newState.customer, newState.customers)) {
          newState.error = 'Record with same mobile number is alredy present';
        }

        if (!newState.error && !validateAdharAndMobile(newState.customer)) {
          newState.error = 'Mobile should have 10 digit and adhar should have 12 digits';
        }

        if (!newState.error) {
          saveCustomerRecord({ ...newState.customer, plan_id: newState.selectedPlanId });
          newState.isSave = false;
          newState.customer.customer = newState.init_customer;
          newState.selectedPlanId = null;
        }

        return newState;
      case ACTIONS.SHOW_ERROR:
        newState.error = payload;
        return newState;
      case ACTIONS.EDIT_EXISTING:
        newState.isEdited = true;
        newState.customer = payload;
        newState.selectedPlanId = newState.customer.plan_id;
        return newState;

      case ACTIONS.INIT_CUSTOMER:
        newState.customer = newState.init_customer;
        newState.selectedPlanId = null;
        newState.isSave = false;
        return newState;
      case ACTIONS.UPDATE_PLAN: {
        saveCustomerRecord({ ...newState.customer, plan_id: newState.selectedPlanId });
        newState.isSave = true;
        return newState;
      }

      default:
        return { ...newState };
    }
  };

  const [state, dispatch] = useReducer(appReducerFn, INIT_STATE);



  useEffect(() => {
    dispatch({ type: ACTIONS.FETCH_CUSTOMERS });
    dispatch({ type: ACTIONS.FETCH_PLANS });
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div>
        <header>
          <Navbar className="bg-body-tertiary">
            <Container fluid>
              <Navbar.Brand href="/">Telecom Customer Management System</Navbar.Brand>
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link as="span"><Link to="/">Customer List</Link></Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <section>
          <Routes>
            <Route path="/" element={<CustomerList />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/planDetails" element={<PlanDetails />}></Route>
          </Routes>
        </section>
      </div>
    </AppContext.Provider>
  );
}

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

export default App;
