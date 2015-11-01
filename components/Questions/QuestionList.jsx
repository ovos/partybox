QuestionListComp = React.createClass({
  render() {
    return (
      <div>
        <ul>
          {this.props.questions.map(question => <QuestionItemComp key={question._id} question={question} onQuestionClick={this.props.onQuestionClick} />)}
        </ul>
      </div>
    );
  }
})
