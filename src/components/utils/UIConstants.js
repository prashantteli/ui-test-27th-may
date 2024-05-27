export const ACTIONS = {
    FETCH_CUSTOMERS : 'FETCH_CUSTOMERS',
    UPDATE_CUSTOMERS : 'UPDATE_CUSTOMERS',
    FETCH_PLANS : 'FETCH_PLANS',
    UPDATE_PLANS : 'UPDATE_PLANS',
    SELECT_PLAN : 'SELECT_PLAN',
    MODIFY_CUSTOMER : 'MODIFY_CUSTOMER',
    SHOW_ERROR : 'SHOW_ERROR',
    EDIT_EXISTING : 'EDIT_CUSTOMER',
    INIT_CUSTOMER : 'INIT_CUSTOMER',
    UPDATE_PLAN : 'UPDATE_PLAN'

  }

  export const INIT_STATE = {
    customers : [],
    customer : {},
    init_customer : {
      name : '',
      email : '',
      dob : '',
      mobile : '',
      reg_date : '',
      adhar_number : '',
      mobile_number : '',
      plan_id : ''
    },
    plans : [],
    selectedPlanId : null,
    isEdited : false,
    renewalDate : '',
    validFields : {
      name : '',
      email : '',
      dob : '',
      mobile : '',
      reg_date : '',
      adhar_number : '',
      mobile_number : '',
    }

    
  }