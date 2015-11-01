Meteor.methods({
  'getGameForRoomCode'(roomCode) {
    return GamesCollection.findOne({ roomCode: roomCode });
  }
});
