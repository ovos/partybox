QuestionsAdminComp = React.createClass({
  mixins: [ReactMeteorData],

  getInitialState() {
    return {
      editAnswerId: false
    };
  },

  getMeteorData() {
    var handle = Meteor.subscribe('questions');

    var questions = QuestionsCollection.find().fetch();

    return {
      questions: questions
    };
  },

  createNewQuestion() {
    var answerId = QuestionsCollection.insert({
      text: 'New question'
    });

    this.setState({
      editAnswerId: answerId
    });
  },

  onQuestionClick(e, question) {
    this.setState({
      editAnswerId: question._id
    });
  },

  render() {
    var editQuestion = false;

    if (this.state.editAnswerId) {
      editQuestion = _.findWhere(this.data.questions, { _id: this.state.editAnswerId })
    }

    return (
      <div>
        <h2>Question Editor</h2>

        <div style={{width: '30%', float: 'left'}}>
          <button className="small center" onClick={this.createNewQuestion}>New question</button>
          <QuestionListComp questions={this.data.questions} onQuestionClick={this.onQuestionClick} current={this.state.editAnswerId} />
        </div>
        <div style={{width: '70%', float: 'right'}}>
          {
            editQuestion ?
            <QuestionEditorComp key={editQuestion._id} question={editQuestion}/> :
              'Select a question on the left to edit/delete it.'
          }
        </div>
      </div>
    )
  }
});
