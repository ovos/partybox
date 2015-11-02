ResultsComp = React.createClass({
  nextQuestion() {
    Meteor.call('game.setQuestion', this.props.game._id);
  },

  render() {
    var { answers } = this.props.game.state;
    var userData = ParticipantsCollection.findOne(this.props.playerData.userId);

    return (
      <div>
        {answers.map(this.renderAnswerResult)}
        {
          userData.isCreator ?
          <button onClick={this.nextQuestion}>Next Question!</button> :
          null
        }
      </div>
    );
  },

  renderAnswerResult(answer) {
    return (
      <div key={answer.userId}>
        <b>{answer.answer}</b> - by <i>{answer.username}</i> - <b>{answer.votes ? answer.votes.length : 0}</b> Votes!
      </div>
    );
  }
});
