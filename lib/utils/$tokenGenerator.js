const crypto = require("crypto");

module.exports = {
  scope: "singleton",
  name: "$tokenGenerator",
  factory: function() {
    return {
      random: function(giberish) {
        var hash = crypto.createHash("sha256");
        hash.update(giberish + Date.now());
        return hash.digest("hex");
      }
    };
  }
};
