AnswerItemComp = React.createClass({
  onClick(e) {
    if (this.props.allowVoting) {
      this.props.onClick(e, this.props.answer);
    }
  },

  render() {
    var className = 'answer-item';

    if (this.props.disabled) {
      className += ' disabled';
    }

    if (this.props.hide) {
      className += ' hide';
    }

    return (
      <div className={className} onClick={this.onClick}>
        {this.props.answer.answer} - {this.props.answer.username}
      </div>
    );
  }
});
