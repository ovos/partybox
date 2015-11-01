GameVotingComp = React.createClass({
  render() {
    return (
      <div>
        <h1>Vote!</h1>
        {this.props.game.state.answers.map(this.renderAnswer)}
      </div>
    );
  },

  renderAnswer(answer, index) {
    return (
      <div key={answer.userId}>
        {answer.userId + ' : ' + answer.answer}
      </div>
    )
  }
});
