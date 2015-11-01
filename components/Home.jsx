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
      games: GamesCollection.find().fetch()
    };
  },

  onCreateGame() {
    var roomCode = Random.id(4).toUpperCase();

    var gameId = GamesCollection.insert({
      roomCode: roomCode,
      createdAt: new Date(),
      state: {
        type: GameStates.WAITING_FOR_PLAYERS
      }
    });

    var userId = this.createParticipant(gameId, true);
    this.setPlayerSession(userId, gameId, roomCode);

    FlowRouter.go('/play/' + roomCode);
  },

  onJoinGame() {
    var game = GamesCollection.findOne({ roomCode: this.state.roomCode });

    if (game) {
      var userId = this.createParticipant(game._id, false);
      this.setPlayerSession(userId, game._id, game.roomCode);

      FlowRouter.go('/play/' + game.roomCode);
    } else {
      alert('No game found with this room code :(');
      return null;
    }
  },

  createParticipant(gameId, isCreator = false) {
    var userId = false;
    var existingUser = ParticipantsCollection.findOne({ name: this.state.username, gameId: gameId });

    if (existingUser) {
      userId = existingUser._id;
    } else {
      userId = ParticipantsCollection.insert({
        name: this.state.username,
        gameId: gameId,
        isCreator: isCreator
      });
    }

    return userId;
  },

  setPlayerSession(userId, gameId, roomCode) {
    Session.set('playerData', {
      userId: userId,
      gameId: gameId,
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
