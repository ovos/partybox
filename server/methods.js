function getRandomQuestion() {
  var questions = QuestionsCollection.find().fetch();

  return questions[0];
}

Meteor.methods({
  'game.setQuestion'(gameId) {
    GamesCollection.update(gameId, {
      '$set': {
        'state.type': GameStates.QUESTION_ANSWERING,
        'state.question': getRandomQuestion()
      }
    });
  },

  'game.addAnswer'(params) {
    var gameId = params.gameId;
    var answer = params.answer;

    GamesCollection.update(gameId, {
      $push: {
        'state.answers': answer
      }
    });

    var game = GamesCollection.findOne(gameId);
    var participants = ParticipantsCollection.find({ gameId: gameId }).fetch();

    if (game.state.answers.length === participants.length) {
      GamesCollection.update(gameId, {
        $set: {
          'state.type': GameStates.QUESTION_VOTING
        }
      });
    }
  }
});
