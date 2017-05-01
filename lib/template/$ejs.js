const ejs = require("ejs");

module.exports = {
  compile: (str, options) => {
    return ejs.compile(str, options);
  },
  render: (str, data, options) => {
    return ejs.render(str, data, options);
  },
  renderFile: (filename, data, options, callback) => {
    ejs.renderFile(filename, data, options, callback);
  }
};
