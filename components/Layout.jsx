LayoutComp = React.createClass({
  render() {
    return (
      <div>
        {this.props.content}
        {this.renderFooter()}
      </div>
    );
  },

  renderFooter() {
    return (
      <div></div>
    )
  }
});
