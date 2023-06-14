import Currency from "./currency";

export default function currencyController() {
  const body = document.querySelector("#root");

  const socket = new WebSocket("ws://localhost:3000/currency-feed");
   const page = new Currency(body, socket);


 setInterval(()=>{
  if(location.hash !== "#/currency"){
     socket.close();
  }
 }, 500)
  console.log(location.hash)


}
