(function () {
  let email = "";
  const socket = io();

  document
    .getElementById("form-message")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      const input = document.getElementById("input-message");

      const newMessage = {
        user: email,
        body: input.value,
      };
      socket.emit("new-message", newMessage);
      input.value = "";
      input.focus();
    });

  socket.on("conversation", (messages) => {
    const logMessages = document.getElementById("log-messages");
    logMessages.innerText = "";
    messages.forEach((message) => {
      const p = document.createElement("p");
      p.innerText = `${message.user}: ${message.body}`;
      logMessages.appendChild(p);
    });
  });

  Swal.fire({
    title: "Login",
    input: "text",
    inputLabel: "Log your name",
    allowOutsideClick: false,
    inputValidator: (value) => {
      if (!value) {
        return "Log a valid name";
      }
    },
  }).then((result) => {
    email = result.value.trim();
  });
})();
