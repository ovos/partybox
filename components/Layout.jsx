LayoutComp = React.createClass({
  render() {
    return (
      <div>
        <div className="main-container">
          {this.props.content}
        </div>
      </div>
    );
  }
});
