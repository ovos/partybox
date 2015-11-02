GameComp = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    var playerData = Session.get('playerData');

    if (playerData) {
      // subscribe to the game data and participants of this game
      var handleGameData = Meteor.subscribe('gameData', playerData.gameId);
      var handleParticipants = Meteor.subscribe('participants', playerData.gameId)

      // when the inital snapshot of the game and participants is available we do sth
      if ( handleGameData.ready() && handleParticipants.ready() ) {
        var game = GamesCollection.findOne(playerData.gameId);
        var participants = ParticipantsCollection.find({ gameId: playerData.gameId }).fetch();

        if (game) {
          return {
            participants,
            game,
            playerData
          };
        }
      } else {
        // the initial snapshot is not yet available, just return empty obj
        return {};
      }
    }

    // if there's no valid data, we redirect to home
    FlowRouter.go('/');
    return {};
  },

  render() {
    if (!this.data.game) return null;

    return (
      <div className="game-container">
        {this.renderChild()}
      </div>
    );
  },

  renderChild() {
    var { game, playerData, participants } = this.data;

    switch(game.state.type) {
      case GameStates.QUESTION_ANSWERING:
        return <AnsweringComp game={game} playerData={playerData} participants={participants}/>;
        break;
      case GameStates.QUESTION_VOTING:
        return <VotingComp game={game} playerData={playerData} participants={participants}/>
        break;
      case GameStates.QUESTION_RESULTS:
        return <ResultsComp game={game} playerData={playerData} participants={participants}/>
        break;
      case GameStates.FINAL_RESULTS:
        return <FinalResultsComp game={game} playerData={playerData} participants={participants}/>
        break;
      case GameStates.WAITING_FOR_PLAYERS:
      default:
        return <LobbyComp game={game} playerData={playerData} participants={this.data.participants} />;
        break;
    }

    return null;
  }

})
