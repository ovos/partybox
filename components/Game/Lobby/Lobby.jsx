LobbyComp = React.createClass({
  startGame() {
    Meteor.call('game.setQuestion', this.props.game._id);
  },

  render() {
    var currentParticipant = _.findWhere(this.props.participants, {
      _id: this.props.playerData.userId
    });
    return (
      <div>
        <h1>Room Code: {this.props.game.roomCode}</h1>
        <h3>Waiting for players...</h3>
        <LobbyParticipants
          participants={this.props.participants} playerData={this.props.playerData}
        />
        {this.renderStartButton()}
      </div>
    );
  },

  renderStartButton() {
    var currentParticipant = _.findWhere(this.props.participants, {
      _id: this.props.playerData.userId,
      isCreator: true
    });

    if(!currentParticipant || this.props.participants.length <= 1) return '';

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
