QuestionEditorComp = React.createClass({
  getInitialState(){
    return {
      questionText: this.props.question.text
    };
  },

  saveQuestion() {
    QuestionsCollection.update(this.props.question._id, {
      $set: {
        text: this.state.questionText
      }
    });
  },

  deleteQuestion() {
    QuestionsCollection.remove(this.props.question._id);
  },

  updateQuestionText(e) {
    this.setState({
      questionText: e.target.value
    });
  },

  render() {
    return (
      <div>
        <input type="text" onChange={this.updateQuestionText} value={this.state.questionText} />
        <button onClick={this.saveQuestion}>Save!</button>
        <button className="red" onClick={this.deleteQuestion}>Delete...</button>
      </div>
    )
  }
})
