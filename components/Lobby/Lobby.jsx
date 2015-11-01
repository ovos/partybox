LobbyComp = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    var lobby = LobbyCollection.findOne({ roomCode: this.props.roomCode });

    if (lobby && Session.get('playerData')) {
      return {
        participants: ParticipantsCollection.find({ lobbyId: lobby._id }).fetch(),
        lobby: lobby,
        playerData: Session.get('playerData')
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
    var className = participant._id === this.data.playerData.userId ?
      'self' : 'opponent';

    return (
      <li
        key={participant._id}
        className={className}
      >
        {participant.name} - {participant.isCreator.toString()}
      </li>
    );
  }
})
