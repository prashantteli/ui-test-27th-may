const baseURL = 'http://localhost:3001/';

export async function getCustomerRecords() {
    try {
        let response = await fetch(baseURL + 'customer', { mode: 'cors' });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        let parsedRes = await response.json();
        return parsedRes;
    } catch (error) {
        console.error('Error fetching customer records:', error);
        throw error; // Re-throw the error after logging it
    }
}

export async function getPlans() {
    try {
        let response = await fetch(baseURL + 'plans', { mode: 'cors' });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        let parsedRes = await response.json();
        return parsedRes;
    } catch (error) {
        console.error('Error fetching plans:', error);
        throw error; // Re-throw the error after logging it
    }
}


export async function saveCustomer(customers) {
    let response = await fetch(baseURL + 'addcustomer', 
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(customers),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    let parsedRes = await response.json();
    return parsedRes;
}