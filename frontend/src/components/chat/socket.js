// const socket = new WebSocket("ws://localhost:8000/ws/chat/room_name/");

// socket.onmessage = function (e) {
//   const data = JSON.parse(e.data);
//   console.log(data.message);
//   // Handle incoming messages
// };

// socket.onclose = function (e) {
//   console.error("Chat socket closed unexpectedly");
// };

// function sendMessage(message) {
//   socket.send(
//     JSON.stringify({
//       message: message,
//     })
//   );
// }
