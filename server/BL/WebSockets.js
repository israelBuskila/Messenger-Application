exports.sockets = (socket) => {
  socket.on("message", ({ name, message }) => {
    console.log(socket.id);
    socket.broadcast.emit("message", { name, message });
  });
};
