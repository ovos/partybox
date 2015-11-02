Meteor.publish('rooms', function() {
  return GamesCollection.find({}, { fields: { roomCode: 1 }});
});

Meteor.publish('gameData', function(gameId) {
  return GamesCollection.find(gameId);
});

Meteor.publish('participants', function(gameId) {
  return ParticipantsCollection.find({ gameId: gameId });
});

Meteor.publish('questions', function(questions) {
  return QuestionsCollection.find();
});
