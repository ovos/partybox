GameComp = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    var game = GamesCollection.findOne({ roomCode: this.props.roomCode });
    var data = {};

    if (game) {
      game.state = game.state || {};
      if(!game.state.type) {
        game.state.type = GameStates.WAITING_FOR_PLAYERS;
      }

      if (Session.get('playerData')) {
        data = {
          participants: ParticipantsCollection.find({ gameId: game._id }).fetch(),
          game: game,
          playerData: Session.get('playerData')
        }
      }
    } else {
      FlowRouter.go('/');
    }
    return data;
  },

  render() {
    var game = this.data.game;
    switch(game.state.type) {
      case GameStates.QUESTION_ANSWERING:
      case GameStates.QUESTION_VOTING:
      case GameStates.QUESTION_RESULTS:
        return <GameQuestionComp game={game} currentUserId={this.data.playerData.userId} />;
        break;
      case GameStates.FINAL_RESULTS:
        //FlowRouter.go('/results/' + game.roomCode);
        break;
      case GameStates.WAITING_FOR_PLAYERS:
      default:
        return <LobbyComp game={game} currentUserId={this.data.playerData.userId} participants={this.data.participants} />;
        break;
    }
    
    return null;
  }

})
