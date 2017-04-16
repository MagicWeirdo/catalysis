const MarkdownIt = require("markdown-it");

module.exports = {
  scope: "singleton",
  name: "$markdown",
  factory: function() {
    return new MarkdownIt();
  }
};
