VotingComp = React.createClass({
  onAnswerClick(e, answer) {
    Meteor.call(
      'game.voteForAnswer',
      this.props.game._id,
      answer.userId,
      this.props.playerData.userId
    );
  },

  render() {
    return (
      <div>
        <h1>Vote!</h1>
        <p>{this.props.game.state.question.text}</p>
        {this.props.game.state.answers.map(this.renderAnswer)}
      </div>
    );
  },

  renderAnswer(answer, index) {
    return (
      <AnswerItemComp key={answer.userId} answer={answer} playerData={this.props.playerData} onClick={this.onAnswerClick} allowVoting={this.allowVoting()}
      hide={this.isOwnAnswer(answer)}
      disabled={!this.allowVoting() && this.isAnswerVotedByUser(answer)}/>
    );
  },

  isOwnAnswer(answer) {
    return answer.userId === this.props.playerData.userId;
  },

  allowVoting() {
    var answers = this.props.game.state.answers;
    var votes = answers.map(answer => this.isAnswerVotedByUser(answer));

    return !_.contains(votes, true);
  },

  isAnswerVotedByUser(answer) {
    if (answer.votes) {
      return answer.votes.indexOf(this.props.playerData.userId) > -1;
    }

    return false;
  }
});
