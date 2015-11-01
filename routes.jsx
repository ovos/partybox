FlowRouter.route("/", {
  subscriptions: function() {

  },
  action: function() {
    ReactLayout.render(LayoutComp, {
      content: <HomeComp />
    });
  }
});
