GameQuestionComp = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    var question = QuestionsCollection.find().fetch(); // todo: find current question
    var data = {};

    if(question.length) {
      data = {
        question: question
      }
    } else {
      FlowRouter.go('/');
    }
    return data;

  },

  render() {
    if(!this.data.question) return null;

    var game = this.props.game;
    switch(game.state.type) {
      case GameStates.QUESTION_ANSWERING:
        return <GameQuestionAnsweringComp game={game} question={this.data.question} currentUserId={this.props.currentUserId}/>;
        break;
      case GameStates.QUESTION_VOTING:
      case GameStates.QUESTION_RESULTS:
    }
    return '';
  }

})
