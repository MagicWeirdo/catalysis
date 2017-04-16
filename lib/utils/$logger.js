module.exports = {
  scope: "singleton",
  name: "$logger",
  factory: function() {
    return {
      /**
       * @public
       * @param {String} message
       * @param {Array} args
       * @description
       * logging a message
      **/
      log: function(message, args) {
        console.log.apply(global, this._addHeader(arguments));
      },
      /**
       * @public
       * @param {String} message
       * @description
       * logging an error
      **/
      error: function(message) {
        console.error(new Error(message));
      },
      /**
       * @public
       * @param {String} label
       * @description
       * starts a timer to compute the duration of an operation
      **/
      time: function(label) {
        console.time(this._getStamp() + " " + label);
      },
      /**
       * @public
       * @param {String} label
       * @description
       * stops a timer that was previously started by calling $logger.time()
      **/
      timeEnd: function(label) {
        console.timeEnd(this._getStamp() + " " + label);
      },
      /**
       * @private
       * @param {Array} args
       * @return {Array}
       * @description
       * add head to message and return the transformed message
      **/
      _addHeader: function(args) {
        var arr = [this._getStamp() + " " + arguments[0][0]];
        for(var i = 1;i < arguments[0].length;i++) {
          arr.push(arguments[0][i]);
        }

        return arr;
      },
      /**
       * @private
       * @return {String}
       * @description
       * get the current timestamp
      **/
      _getStamp: function() {
        let now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth();
        let day = now.getDate();
        let hour = now.getHours();
        let minute = now.getMinutes();
        let second = now.getSeconds();

        let timeStamp = "[" + year + "-" + month + "-" + day + " " + hour +
          ":" + minute + ":" + second + "] [CATALYSIS]";

        return timeStamp;
      }
    };
  }
};
