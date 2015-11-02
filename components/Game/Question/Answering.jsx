AnsweringComp = React.createClass({
  getInitialState() {
    return {
      answer: '',
      submitting: false
    };
  },

  onCreateAnswer() {
    var { game, question, playerData }= this.props;

    var answer = {
      userId: playerData.userId,
      username: playerData.username,
      answer: this.state.answer
    };

    Meteor.call('game.addAnswer', { gameId: game._id, answer: answer },
      (err, res) => {
        if (err) { console.log(err); }
      }
    );
  },

  updateAnswer(e) {
    this.setState({ answer: e.target.value });
  },

  render() {
    var game = this.props.game;
    var currentAnswer = _.findWhere(game.state.answers || [], {userId: this.props.playerData.userId});

    return (
      <div>
        <h3>Add your answer for the following question:</h3>
        <h2>{this.props.game.state.question.text}</h2>
          {currentAnswer
            ? (
              <div>
                <div>Your answer:</div>
                <div>{currentAnswer.answer}</div>
                <br />
                <div>Waiting for other players <b>{game.state.answers.length + '/' + this.props.participants.length}</b>...</div>
              </div>
            )
            : (
              <div>
                <input
                  type="text"
                  width="300"
                  value={this.state.answer}
                  onChange={this.updateAnswer}
                  placeholder="Write your funny answer!" />
                <br />
                <button
                  onClick={this.onCreateAnswer}
                  disabled={!this.state.answer.length || this.state.submitting}
                >
                  Submit
                </button>
              </div>
            )
          }
      </div>
    );
  }

});
