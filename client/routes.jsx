FlowRouter.route("/", {
  action: function() {
    ReactLayout.render(LayoutComp, {
      content: <HomeComp />
    });
  }
});

FlowRouter.route("/lobby/:roomCode", {
  action(params) {
    ReactLayout.render(LayoutComp, {
      content: <LobbyComp roomCode={params.roomCode} />
    });
  }
});

/** ADMINISTRATIVE STUFF **/
FlowRouter.route("/question-editor", {
  action(params) {
    ReactLayout.render(LayoutComp, {
      content: <QuestionsAdminComp />
    });
  }
})
