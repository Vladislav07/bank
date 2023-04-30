export async function authorizationRequest() {
  try {
    const res = await fetch("http://localhost:3000/login", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        login: 'developer',
        password: 'skillbox'
      }
    });
    if (res.ok == true) {
      const data = await res.json();
      console.log(data);
    }

  } catch (error) {
    console.log(error.message)
  }
}