QuestionItemComp = React.createClass({
  onQuestionClick(e) {
    this.props.onQuestionClick(e, this.props.question);
  },

  render() {
    var className = 'question-list-item';

    if (this.props.current === this.props.question._id) {
      className += ' active';
    }

    return (
      <div className={className} onClick={this.onQuestionClick}>{this.props.question.text}</div>
    );
  }
});
