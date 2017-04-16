module.exports = {
  scope: "singleton",
  name: "$date",
  factory: function() {
    return {
      /**
       * @private
       * @param {Date} date
       * @return {object}
       * @description
       * create a date object with the given date
      **/
      _createDateObject: function(date) {
        return {
          _date: date,
          /**
           * @public
           * @return {Integer}
           * @description
           * get the year of the date
          **/
          getYear: function() {
            return this._date.getFullYear();
          },
          /**
           * @public
           * @param {Integer} year
           * @description
           * set the year of the date
          **/
          setYear: function(year) {
            this._date.setFullYear(year);
          },
          /**
           * @public
           * @return {Integer}
           * @description
           * get the month of the date
          **/
          getMonth: function() {
            return this._date.getMonth() + 1;
          },
          /**
           * @public
           * @param {Integer} month
           * @description
           * set the month of the date
          **/
          setMonth: function(month) {
            this._date.setMonth(month - 1);
          },
          /**
           * @public
           * @return {Integer}
           * @description
           * get the day of the date
          **/
          getDay: function() {
            return this._date.getDate();
          },
          /**
           * @public
           * @param {Integer} day
           * @description
           * set the day of the date
          **/
          setDay: function(day) {
            this._date.setDate(day);
          },
          /**
           * @public
           * @return {Integer}
           * @description
           * get the hours of the date
          **/
          getHour: function() {
            return this._date.getHours();
          },
          /**
           * @public
           * @param {Integer} hour
           * @description
           * set the hour of the date
          **/
          setHour: function(hour) {
            this._date.setHours(hour);
          },
          /**
           * @public
           * @return {Integer}
           * @description
           * get the minutes of the date
          **/
          getMinute: function() {
            return this._date.getMinutes();
          },
          /**
           * @public
           * @param {Integer} minutes
           * @description
           * set the minutes of the date
          **/
          setMinute: function(minutes) {
            this._date.setMinutes(minutes);
          },
          /**
           * @public
           * @return {Integer}
           * @description
           * get the seconds of the date
          **/
          getSecond: function() {
            return this._date.getSeconds();
          },
          /**
           * @public
           * @param {Integer} seconds
           * @description
           * set the seconds of the date
          **/
          setSecond: function(seconds) {
            this._date.setSeconds(seconds);
          },
          /**
           * @public
           * @return {Integer}
           * @description
           * get the milliseconds representation of the date
          **/
          getAsMilliseconds: function() {
            return this._date.getTime();
          },
          /**
           * @public
           * @return {Date}
           * @description
           * get the Date representation of the date
          **/
          getAsDate: function() {
            return this._date;
          }
        }
      },
      /**
       * @public
       * @return {object}
       * @description
       * get the date object of now
      **/
      now: function() {
        return this._createDateObject(new Date());
      },
      /**
       * @public
       * @param {Integer} milliseconds
       * @return {Date}
       * @description
       * transforme milliseconds to date object
      **/
      millisecondsToDate: function(milliseconds) {
        var date = new Date();
        date.setTime(milliseconds);

        return this._createDateObject(date);
      },
      /**
       * @public
       * @param {object} a
       * @param {object} b
       * @return {Integer}
       * @description
       * compare the dates.
       * return 1 if a is larger than b
       * return 0 if a and b are equal
       * return -1 if a is smaller than b
      **/
      compare: function(a, b) {
        var date1 = {
          year: a.getYear(),
          month: a.getMonth(),
          day: a.getDay(),
          hour: a.getHour(),
          minute: a.getMinute(),
          second: a.getSecond()
        };

        var date2 = {
          year: b.getYear(),
          month: b.getMonth(),
          day: b.getDay(),
          hour: b.getHour(),
          minute: b.getMinute(),
          second: b.getSecond()
        };

        if(date1.year > date2.year) {
          return 1;
        }else if(date1.year < date2.year) {
          return -1;
        }else {
          if(date1.month > date2.month) {
            return 1;
          }else if(date1.month < date2.month) {
            return -1;
          }else {
            if(date1.day > date2.day) {
              return 1;
            }else if(date1.day < date2.day) {
              return -1;
            }else {
              if(date1.hour > date2.hour) {
                return 1;
              }else if(date1.hour < date2.hour) {
                return -1;
              }else {
                if(date1.minute > date2.minute) {
                  return 1;
                }else if(date1.minute < date2.minute) {
                  return -1;
                }else {
                  if(date1.second > date2.second) {
                    return 1;
                  }else if(date1.second < date2.second) {
                    return -1;
                  }else {
                    return 0;
                  }
                }
              }
            }
          }
        }
      }
    };
  }
};
