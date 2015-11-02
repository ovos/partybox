FinalResultsComp = React.createClass({
  render(){
    var { history } = this.props.game;

    var points = {};

    this.props.participants.map(user => {
      points[user._id] = { points: 0, name: user.name };
    });

    _.each(history, function(question) {
      question.answers.map(function(answer) {
        if (answer.votes && points[answer.userId]) {
          points[answer.userId].points += ( answer.votes.length * 100 );
        }
      });
    });

    var sortedPoints = _.sortBy(points, 'points');

    return (
      <div>
        {(() => {
          var results = [];
          _.each(sortedPoints, (points) => {
            results.push(this.renderPoints(points));
          });
          return results;
        })()}
        <button onClick={() => { FlowRouter.go('/') }}>Go Home!</button>
      </div>
    );
  },

  renderPoints(result) {
    return (
      <div className="result" key={(new Date()).getTime()+result.name}>
        <b>{result.name}</b>: {result.points}
      </div>
    )
  }
});
