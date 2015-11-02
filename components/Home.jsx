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
    var game = {
      roomCode: roomCode,
      createdAt: new Date(),
      state: {
        type: GameStates.WAITING_FOR_PLAYERS
      }
    };

    GamesCollection.insert(game, (err, id) => {
      this.createParticipant(_.extend({}, game, {_id: id}));
    });
  },

  onJoinGame() {
    var game = GamesCollection.findOne({ roomCode: this.state.roomCode });

    if (game) {
      this.createParticipant(game);
    } else {
      alert('No game found with this room code :(');
      return null;
    }
  },

  createParticipant(game) {
    Meteor.call(
      'game.createParticipant',
      this.state.username,
      game,
      (err, userId)  =>{
        this.setPlayerAndGoToPlay(userId, game._id, game.roomCode);
      }
    );
  },

  setPlayerAndGoToPlay(userId, gameId, roomCode) {
    Session.setPersistent('playerData', {
      userId: userId,
      gameId: gameId,
      roomCode: roomCode,
      username: this.state.username
    });

    FlowRouter.go('/play');
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
