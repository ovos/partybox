HomeComp = React.createClass({
  mixins: [ReactMeteorData],

  getInitialState() {
    return {
      username: '',
      roomCode: ''
    };
  },

  getMeteorData() {
    return {
      lobbies: LobbyCollection.find().fetch()
    };
  },

  onCreateGame() {
    var roomCode = Random.id(4).toUpperCase();

    var lobbyId = LobbyCollection.insert({
      roomCode: roomCode,
      createdAt: new Date()
    });

    var userId = this.createParticipant(lobbyId, true);

    FlowRouter.go('/lobby/' + roomCode);
  },

  onJoinGame() {
    Meteor.call(
      'getLobbyForRoomCode',
      this.state.roomCode,
      (err, lobby) => {
        if (err || !lobby) {
          return;
        }

        this.createParticipant(lobby._id, false, () => {
          FlowRouter.go('/lobby/' + this.state.roomCode);
        });
      }
    );
  },

  createParticipant(lobbyId, isCreator = false, cb = false) {
    var userId = ParticipantsCollection.insert({
      name: this.state.username,
      lobbyId: lobbyId,
      isCreator: isCreator
    }, cb);
  },

  updateUsername(e) {
    this.setState({ username: e.target.value });
  },

  updateRoomCode(e) {
    this.setState({
      roomCode: e.target.value.toUpperCase()
    });
  },

  render() {
    return (
      <div>
          <input type="text" value={this.state.username} onChange={this.updateUsername} />
          <button onClick={this.onCreateGame} disabled={this.state.username === ''}>Create Game</button>

        <hr />

          <input type="text" value={this.state.username} onChange={this.updateUsername} />

          <input type="text" value={this.state.roomCode} onChange={this.updateRoomCode} maxLength={4} />

          <button onClick={this.onJoinGame} disabled={this.state.roomCode.length < 4 || this.state.username === ''}>Join Game</button>


      </div>
    );
  }
});
