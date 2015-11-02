function getRandomQuestion(askedIds) {
  var questions = QuestionsCollection.find({
    _id: {
      $nin: askedIds || []
    }
  }).fetch();

  return Random.choice(questions);
}

Meteor.methods({
  'game.createParticipant'(name, game) {
    var userId = false;
    var existingUser = ParticipantsCollection.findOne({ name, gameId: game._id });
    var currentCount = ParticipantsCollection.find({ gameId: game._id }).count();

    if (existingUser) {
      userId = existingUser._id;
    } else {
      userId = ParticipantsCollection.insert({
        name: name,
        gameId: game._id,
        isCreator: currentCount <= 0 ? true : false
      });
    }

    return userId;
  },

  'game.setQuestion'(gameId) {
    var game = GamesCollection.findOne(gameId);

    if (typeof(game.askedQuestions) === 'undefined') {
      game.askedQuestions = [];
    }

    if (typeof(game.state.question) !== 'undefined') {
      game.askedQuestions.push(game.state.question._id);
    }

    var nextQuestion = getRandomQuestion(game.askedQuestions);
    var $modifier = {};

    if(nextQuestion) {
      $modifier.$set = {
        state: {
          type: GameStates.QUESTION_ANSWERING,
          question: nextQuestion
        }
      };
    } else {
      $modifier.$set = {
        state: {
          type: GameStates.FINAL_RESULTS
        }
      };
    }

    if (game.state.question) {
      $modifier.$push = {
        history: game.state,
        askedQuestions: game.state.question._id
      };
    }

    GamesCollection.update(gameId, $modifier);
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
  },

  'game.voteForAnswer'(gameId, answerByUserId, userId) {
    var game = GamesCollection.findOne(gameId, { fields: { 'state': 1 }});
    var participants = ParticipantsCollection.find({ gameId }).fetch();

    var votedAnswerIndex;

    _.find(game.state.answers, (voteItem, index) => {
      if (voteItem.userId === answerByUserId) {
        votedAnswerIndex = index;
        return true;
      }
    });

    var $modifier = {
      $inc: {
        'state.votes': 1
      },
      $push: {
        ['state.answers.' + votedAnswerIndex + '.votes']: userId
      }
    };

    if (game.state.votes+1 >= participants.length) {
      $modifier.$set = {
        'state.type': GameStates.QUESTION_RESULTS
      };
    }

    GamesCollection.update(gameId, $modifier);
  }
});
