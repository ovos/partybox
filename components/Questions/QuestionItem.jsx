QuestionItemComp = React.createClass({
  getDefaultProps() {
    return {
      style: {}
    };
  },

  onQuestionClick(e) {
    this.props.onQuestionClick(e, this.props.question);
  },

  render() {
    return (
      <div style={this.getStyle()} onClick={this.onQuestionClick}>{this.props.question.text}</div>
    );
  },

  getStyle() {
    return {...this.props.style}
  }
});
