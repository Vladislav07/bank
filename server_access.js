import fetch from 'node-fetch';

const user = {
  login: 'developer',
  password: 'skillbox',
};


export async function authorizationRequest() {
  try {
    console.log('authorizationRequest');
    const res = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    if (res.ok == true) {
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      } else {
       const token = data.payload.token;     
        console.log(token);
        return token;
      }
    }
  } catch (error) {
    console.log(error.message);
  }
}

export async function listOfUserAccounts(token) {
  try {
    console.log('listOfUserAccounts');
    const res = await fetch('http://localhost:3000/accounts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${token}`,
      },
    });
    if (res.ok == true) {
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      } else {
        console.log(data.payload);
      }
    }
  } catch (error) {
    console.log(error.message);
  }
}

export async function accountDetails(token,Account) {

  const idAccount = Account[1].account
  try {
    console.log('accountDetails');
    const res = await fetch(`http://localhost:3000/account/${idAccount}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${token}`,
      },
    });
    if (res.ok == true) {
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      } else {
        console.log(data.payload);
      }
    }
  } catch (error) {
    console.log(error.message);
  }
}
