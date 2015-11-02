QuestionListComp = React.createClass({
  render() {
    return (
      <div>
        {this.props.questions.map(question => <QuestionItemComp key={question._id} question={question} onQuestionClick={this.props.onQuestionClick} current={this.props.current} />)}
      </div>
    );
  }
})
