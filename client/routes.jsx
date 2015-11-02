FlowRouter.route("/", {
  action: function() {
    ReactLayout.render(LayoutComp, {
      content: <HomeComp />
    });
  }
});

FlowRouter.route('/play', {
  action(params) {
    ReactLayout.render(LayoutComp, {
      content: <GameComp />
    })
  }
})

/** ADMINISTRATIVE STUFF **/
FlowRouter.route("/question-editor", {
  action(params) {
    ReactLayout.render(LayoutComp, {
      content: <QuestionsAdminComp />
    });
  }
})
