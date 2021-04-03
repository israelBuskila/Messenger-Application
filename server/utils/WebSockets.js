exports.sockets = (socket) => {
  socket.on("message", ({ name, message }) => {
    console.log({ name, message });
    io.emit("message", { name, message });
  });
};
