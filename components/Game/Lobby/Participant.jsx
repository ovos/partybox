LobbyParticipant = React.createClass({
  render() {
    var className = 'participant ' + (this.props.isCurrent ? 'self' : 'opponent');
    return (
      <li className={className}>{this.props.participant.name}{this.props.participant.isCreator ? ' - creator' : ''}</li>
    )
  }
});
