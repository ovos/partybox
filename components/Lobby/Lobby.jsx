LobbyComp = React.createClass({

  startGame() {
    GamesCollection.update(this.props.game._id, {
      '$set': {
        'state.type': GameStates.QUESTION_ANSWERING
      }
    });

  },

  render() {
    var currentParticipant = _.findWhere(this.props.participants, {
      _id: this.props.currentUserId
    });
    return (
      <div>
        <h1>Room Code: {this.props.game.roomCode}</h1>
        <h3>Waiting for players...</h3>
        <LobbyParticipants participants={this.props.participants} currentUserId={this.props.currentUserId} />
        {this.renderStartButton()}
      </div>
    );
  },

  renderStartButton() {
    if(!this.props.participants) return '';

    var currentParticipant = _.findWhere(this.props.participants, {
      _id: this.props.currentUserId
    });

    if(!currentParticipant) return '';

    return (
      <div>
        <br />
        <button
          onClick={this.startGame}
        >
          Start Game
        </button>
      </div>

    )
  }

})
