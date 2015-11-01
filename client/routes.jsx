FlowRouter.route("/", {
  action: function() {
    ReactLayout.render(LayoutComp, {
      content: <HomeComp />
    });
  }
});

FlowRouter.route('/play/:roomCode', {
  action(params) {
    ReactLayout.render(LayoutComp, {
      content: <GameComp roomCode={params.roomCode} />
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
