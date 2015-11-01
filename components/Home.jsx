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
    this.setPlayerSession(userId, lobbyId, roomCode);

    FlowRouter.go('/lobby/' + roomCode);
  },

  onJoinGame() {
    var lobby = LobbyCollection.findOne({ roomCode: this.state.roomCode });

    if (lobby) {
      var userId = this.createParticipant(lobby._id, false);
      this.setPlayerSession(userId, lobby._id, lobby.roomCode);

      FlowRouter.go('/lobby/' + lobby.roomCode);
    } else {
      alert('No game found with this room code :(');
      return null;
    }
  },

  createParticipant(lobbyId, isCreator = false) {
    var userId = false;
    var existingUser = ParticipantsCollection.findOne({ name: this.state.username, lobbyId: lobbyId });

    if (existingUser) {
      userId = existingUser._id;
    } else {
      userId = ParticipantsCollection.insert({
        name: this.state.username,
        lobbyId: lobbyId,
        isCreator: isCreator
      });
    }

    return userId;
  },

  setPlayerSession(userId, lobbyId, roomCode) {
    Session.set('playerData', {
      userId: userId,
      lobbyId: lobbyId,
      roomCode: roomCode
    });
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
      <div className="home">
        <h1>Create a room</h1>
        <input
          type="text"
          value={this.state.username}
          onChange={this.updateUsername}
          placeholder="Username" />
        <button
          onClick={this.onCreateGame}
          disabled={this.state.username === ''}>
          Create Game
        </button>

        <div className="divider" />

        <h1>Join an existing room</h1>
        <input
          type="text"
          value={this.state.username}
          onChange={this.updateUsername}
          placeholder="Username" />
        <br />
        <input
          type="text"
          value={this.state.roomCode}
          onChange={this.updateRoomCode}
          maxLength={4}
          placeholder="Room Code" />
        <br />
        <button
          onClick={this.onJoinGame}
          disabled={this.state.roomCode.length < 4 || this.state.username === ''}
        >
          Join Game
        </button>
      </div>
    );
  }
});
