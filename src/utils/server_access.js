
//import fetch from 'node-fetch';
import WebSocket from 'ws'
// const user = {
//  login: 'developer',
//  password: 'skillbox',
// }

const cssPromises = {}
let token = ''

export async function authorizationRequest(user) {
 try {
  console.log('authorizationRequest')
  const res = await fetch('http://localhost:3000/login', {
   method: 'POST',
   headers: {
    'Content-Type': 'application/json',
   },
   body: JSON.stringify(user),
  })
  if (res.ok == true) {
   const data = await res.json()
   if (data.error) {
    throw new Error(data.error)
   } else {
    token = data.payload.token
    sessionStorage.setItem('key', token)
    return true
   }
  }
 } catch (error) {
  console.log(error.message)
 }
}

export async function listOfUserAccounts() {
 try {
  console.log('listOfUserAccounts')
  const res = await fetch('http://localhost:3000/accounts', {
   method: 'GET',
   headers: {
    'Content-Type': 'application/json',
    Authorization: `Basic ${sessionStorage.getItem('key')}`,
   },
  })
  if (res.ok == true) {
   const data = await res.json()
   if (data.error) {
    throw new Error(data.error)
   } else {
    console.log(data.payload)
    return data.payload
   }
  }
 } catch (error) {
  console.log(error.message)
 }
}

export async function accountDetails(idAccount) {

 try {

  const res = await fetch(`http://localhost:3000/account/${idAccount}`, {
   method: 'GET',
   headers: {
    'Content-Type': 'application/json',
    Authorization: `Basic ${sessionStorage.getItem('key')}`,
   },
  })
  if (res.ok == true) {
   const data = await res.json()
   if (data.error) {
    throw new Error(data.error)
   } else {
    console.log(data.payload)
    return data.payload
   }
  }
 } catch (error) {
  console.log(error.message)
 }
}

export async function createaAccount() {
 try {
  console.log('createaAccount')
  const res = await fetch('http://localhost:3000/create-account', {
   method: 'POST',
   headers: {
    'Content-Type': 'application/json',
    Authorization: `Basic ${sessionStorage.getItem('key')}`,
   },
  })
  if (res.ok == true) {
   const data = await res.json()
   if (data.error) {
    throw new Error(data.error)
   } else {
    console.log(data)
    return data
   }
  }
 } catch (error) {
  console.log(error.message)
 }
}

export async function fundsTransfer(transfer) {
  try {
    console.log('createaAccount')
    const res = await fetch('http://localhost:3000/transfer-funds', {
     method: 'POST',
     headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${sessionStorage.getItem('key')}`,
     },
     body: JSON.stringify(transfer),
    })
    if (res.ok == true) {
     const data = await res.json()
     if (data.error) {
      throw new Error(data.error)
     } else {
      console.log(data)
      return data
     }
    }
   } catch (error) {
    console.log(error.message)
   }
}

export async function allCurrencies() {
 try {
  console.log('allCurrencies')
  const res = await fetch('http://localhost:3000/all-currencies', {
   method: 'GET',
   headers: {
    'Content-Type': 'application/json',
   },
  })
  if (res.ok == true) {
   const data = await res.json()
   if (data.error) {
    throw new Error(data.error)
   } else {
    console.log(data.payload)
    return data.payload
   }
  }
 } catch (error) {
  console.log(error.message)
 }
}

export async function userCurrencies() {
 try {
  console.log('userCurrencies')
  const res = await fetch('http://localhost:3000/currencies', {
   method: 'GET',
   headers: {
    'Content-Type': 'application/json',
    Authorization: `Basic ${sessionStorage.getItem('key')}`,
   },
  })
  if (res.ok == true) {
   const data = await res.json()
   if (data.error) {
    throw new Error(data.error)
   } else {
    console.log(data.payload)
    return data.payload
   }
  }
 } catch (error) {
  console.log(error.message)
 }
}

// const exchange = {
// 	from, // код валютного счёта, с которого списываются средства
// 	to, // код валютного счёта, на который зачисляются средства
// 	amount // сумма, которая списывается, конвертация вычисляется сервером автоматически, исходя из текущего валютного курса для данной валютной пары
// }

export async function currencyBuy(exchange) {
 try {
  console.log('currency-buy')
  const res = await fetch('http://localhost:3000/currency-buy', {
   method: 'POST',
   headers: {
    'Content-Type': 'application/json',
    Authorization: `Basic ${sessionStorage.getItem('key')}`,
   },
   body: JSON.stringify(exchange),
  })
  if (res.ok == true) {
   const data = await res.json()
   if (data.error) {
    throw new Error(data.error)
   } else {
    console.log(data.payload)
    return data.payload
   }
  }
 } catch (error) {
  console.log(error.message)
 }
}

export async function getGeoLocation() {
 try {
  console.log('accountDetails')
  const res = await fetch('http://localhost:3000/banks', {
   method: 'GET',
   headers: {
    'Content-Type': 'application/json',
    Authorization: `Basic ${sessionStorage.getItem('key')}`,
   },
  })
  if (res.ok == true) {
   const data = await res.json()
   if (data.error) {
    throw new Error(data.error)
   } else {
    return data.payload
   }
  }
 } catch (error) {
  console.log(error.message)
 }
}

export function loadResourses(src) {
 if (!cssPromises[src]) {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = src
  cssPromises[src] = new Promise((resolve) => {
   link.addEventListener('load', () => resolve())
  })
  const linkMainCCS = document.querySelector('link')
  linkMainCCS.before(link)
 }
 return cssPromises[src]
}
