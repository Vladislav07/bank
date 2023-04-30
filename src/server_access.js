//import fetch from 'node-fetch';
import WebSocket from "ws";

const user = {
  login: "developer",
  password: "skillbox",
};

export async function authorizationRequest() {
  try {
    console.log("authorizationRequest");
    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
    console.log("listOfUserAccounts");
    const res = await fetch("http://localhost:3000/accounts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${token}`,
      },
    });
    if (res.ok == true) {
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      } else {
        return data.payload;
        console.log(data.payload);
      }
    }
  } catch (error) {
    console.log(error.message);
  }
}

export async function accountDetails(token, Account) {
  const idAccount = Account[0].account;
  try {
    console.log("accountDetails");
    const res = await fetch(`http://localhost:3000/account/${idAccount}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${token}`,
      },
    });
    if (res.ok == true) {
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      } else {
        console.log(data.payload.balance);
      }
    }
  } catch (error) {
    console.log(error.message);
  }
}

export async function createaAccount(token) {
  try {
    console.log("createaAccount");
    const res = await fetch("http://localhost:3000/create-account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${token}`,
      },
    });
    if (res.ok == true) {
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      } else {
        console.log(data);
        return data;
      }
    }
  } catch (error) {
    console.log(error.message);
  }
}

export async function fundsTransfer(token, transfer) {
  //Метод перевода средств со счёта на счёт.
}

export async function allCurrencies() {
  try {
    console.log("allCurrencies");
    const res = await fetch("http://localhost:3000/all-currencies", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok == true) {
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      } else {
        console.log(data.payload);
        return data.payload;
      }
    }
  } catch (error) {
    console.log(error.message);
  }
}

export async function userCurrencies(token) {
  try {
    console.log("userCurrencies");
    const res = await fetch("http://localhost:3000/currencies", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${token}`,
      },
    });
    if (res.ok == true) {
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      } else {
        console.log(data.payload);
        return data.payload;
      }
    }
  } catch (error) {
    console.log(error.message);
  }
}

// const exchange = {
// 	from, // код валютного счёта, с которого списываются средства
// 	to, // код валютного счёта, на который зачисляются средства
// 	amount // сумма, которая списывается, конвертация вычисляется сервером автоматически, исходя из текущего валютного курса для данной валютной пары
// }

export async function currencyBuy(token, exchange) {
  try {
    console.log("currency-buy");
    const res = await fetch("http://localhost:3000/currency-buy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${token}`,
      },
      body: JSON.stringify(exchange),
    });
    if (res.ok == true) {
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      } else {
        console.log(data.payload);
        return data.payload;
      }
    }
  } catch (error) {
    console.log(error.message);
  }
}

export function webSocketStrim() {
  const socket = new WebSocket("ws://localhost:3000/currency-feed");
  socket.onopen = function () {
    console.log("Соединение установлено.");
  };

  socket.onmessage = function (event) {
    const incomingMessage = event.data;
    console.log(incomingMessage);
  };

  setTimeout(() => {
    socket.send("close");
    console.log("close");
  }, 5000);
}
