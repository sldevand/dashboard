var socket = io.connect(config.nodeUrl);

//EVENTS FROM SERVER
socket.on("message", (message) => {
  message.innerHTML = message;
});

socket.on("connect", (message) => {
  toggleConnectIcon(true);
});

socket.on("disconnect", (message) => {
  toggleConnectIcon(false);
});

socket.on("inter", (message) => {
  updateInterNode(message);
});
socket.on("interload", (message) => {
  let element = document.getElementById(message.id);
  if (!element) {
    loadInter(message);
  }
});

socket.on("thermo", (message) => {
  updateThermo(message);
});

function toggleConnectIcon(isConnected) {
  let color = isConnected ? "green" : "red";
  let message = document.getElementById("statusDot");
  message.className = "";
  message.classList.add(color);
}
