Meteor.methods({
  'getLobbyForRoomCode'(roomCode) {
    console.log(roomCode);
    return LobbyCollection.findOne({ roomCode: roomCode });
  }
});
