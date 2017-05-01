const email = require("emailjs");

module.exports = {
  /**
   * @public
   * @param {object} message
   * @param {Function} callback
   * @description
   * send an email via SMTP protocol
  **/
  send: function(message, callback) {
    if($config.email !== undefined) {
      var server = email.server.connect($config.email);
      server.send(message, callback);

      callback();
    }else {
      $logger.error("smtp has to be configured to be able to send email");
    }
  }
};
