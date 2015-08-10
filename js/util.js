var Util = {
  exists: function(x) {
    return x !== null && x !== undefined;
  },

  isUpperCase: function(s) {
    return s.toUpperCase() === s;
  }
};

module.exports = Util;
