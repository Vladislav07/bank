export class webSocketStrim {
 constructor() {
  this.socket = new WebSocket('ws://localhost:3000/currency-feed')
  this.socket.onmessage = function (event) {
   const incomingMessage = event.data
   console.log(incomingMessage)
   return incomingMessage
  }
 }

 CloseWeb() {
  this.socket.send('close')
 }
}
