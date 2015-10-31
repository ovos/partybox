LobbyComp = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    var lobby = LobbyCollection.findOne({ roomCode: this.props.roomCode });

    if (lobby) {
      return {
        participants: ParticipantsCollection.find({ lobbyId: lobby._id }).fetch(),
        lobby: lobby
      }
    } else {
      FlowRouter.go('/');
    }
  },

  render() {
    return (
      <div>
        <h1>{this.data.lobby.roomCode}</h1>
        {this.renderParticipants()}
      </div>
    );
  },

  renderParticipants() {
    return (
      <ul>
        {this.data.participants.map(this.renderParticipant)}
      </ul>
    );
  },

  renderParticipant(participant, index) {
    return (
      <li key={participant._id}>{participant.name} - {participant.isCreator.toString()}</li>
    );
  }
})
