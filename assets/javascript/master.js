// Master JS file
var dnlswan = new function() {
  var self = this,
      speed = 500;
  this.init = function() {
    // Initialize all functions on page load
    self.scrollBelowFold();
  };

  // Base functions
  this.easeInOutQuart = function(t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
    return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
  }
  this.scrollTo = function (element, destination, duration) {
    // Scrolls the window to a destination over time
    if (typeof(element) != 'undefined' && element != null || duration > 0) {
      var origin = element.scrollTop;
      var start = new Date().getTime();

      var timer = setInterval(function() {
        var time = new Date().getTime() - start;
        var currPosition = self.easeInOutQuart(time, origin, destination - origin, duration);
        element.scrollTop = currPosition;
        if (time >= duration) clearInterval(timer);
      }, 10);
    }
  };

  // Applied functions
  this.scrollBelowFold = function() {
    var scrollDownButton = document.querySelector('.down-arrow');
    scrollDownButton.onclick = function() {
      var destination = document.querySelector('.hero').offsetHeight;
      self.scrollTo(document.body, destination, speed);
    }
  }

}
dnlswan.init();
