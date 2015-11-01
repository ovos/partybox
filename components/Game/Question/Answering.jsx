GameQuestionAnsweringComp = React.createClass({
  getInitialState() {
    return {
      answer: '',
      submitting: false
    };
  },

  onCreateAnswer() {
    var game = this.props.game,
      question = this.props.question;

    var answer = {
      userId: this.props.currentUserId,
      answer: this.state.answer
    };

    this.setState({
      submitting: true
    });

    GamesCollection.update(game._id, {
      '$push': {
        'state.answers': answer
      }
    }, () => {
      this.setState({
        submitting: false
      });
    });

  },

  updateAnswer(e) {
    this.setState({ answer: e.target.value });
  },

  render() {
    var game = this.props.game;
    var currentAnswer = _.findWhere(game.state.answers || [], {userId: this.props.currentUserId});

    return (
      <div>
        <h3>Add your answer for the following question:</h3>
        <h2>{this.props.question.text}</h2>
          {currentAnswer
            ? (
              <div>
                <div>Your answer:</div>
                <div>{currentAnswer.answer}</div>
                <br />
                <div>Waiting for other players...</div>
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
