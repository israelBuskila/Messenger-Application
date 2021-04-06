exports.sockets = (socket) => {
  socket.on("message", ({ sender, message, addressee }) => {
    console.log({ sender, message, addressee });
    socket.emit("message", { sender, message, addressee });
  });
};
