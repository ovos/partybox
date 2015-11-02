LobbyParticipants = React.createClass({
  componentDidUpdate() {
    //if(!this.props.isCurrent) {
      var sound = new buzz.sound('/sounds/notification.mp3');
      sound.play();
    //}
  },

  render() {
    return (
      <ul>
        {this.props.participants.map(participant => <LobbyParticipant participant={participant} key={participant._id}
          isCurrent={participant._id === this.props.currentUserId} />)}
      </ul>
    );
  }
});
