const EventEmitter = require("events");

module.exports = {
  scope: "singleton",
  name: "$event",
  factory: function() {
    return new EventEmitter();
  }
};
