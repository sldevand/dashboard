var socket = io.connect(config.nodeUrl);

socket
  .on("message", (message) => {
    message.innerHTML = message;
  })
  .on("connect", (message) => {
    toggleConnectIcon(true);
  })
  .on("disconnect", (message) => {
    toggleConnectIcon(false);
  })
  .on("inter", (message) => {
    updateInterNode(message);
  })
  .on("interload", (message) => {
    let element = document.getElementById(message.id);
    if (!element) {
      loadInter(message);
    }
  })
  .on("thermo", (message) => {
    updateThermo(message);
  });

function toggleConnectIcon(isConnected) {
  let color = isConnected ? "green" : "red";
  let message = document.getElementById("statusDot");
  message.className = "";
  message.classList.add(color);
}
