// Master JS file
var dnlswan = new function() {
  var self = this,
      speed = 500;
  this.init = function() {
    // Initialize all functions on page load
    self.scrollBelowFold();
    self.scrollToWork();
    self.scrollToAbout();
  };

  // Base functions
  this.easeInOutQuart = function(t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
    return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
  }
  this.scrollTo = function (destination, duration) {
    // Scrolls the window to a destination over time
    if (typeof(window) !== 'undefined' && window !== null || duration > 0) {
      var origin = window.scrollY;
      var start = new Date().getTime();

      var timer = setInterval(function() {
        console.log('[LOG] interval is running')
        var time = new Date().getTime() - start;
        var currPosition = self.easeInOutQuart(time, origin, destination - origin, duration);
        window.scrollTo(0, currPosition);
        if (time >= duration) clearInterval(timer);
      }, 16.67);
    }
  };

  // Applied functions
  this.scrollBelowFold = function() {
    var scrollDownButton = document.querySelector('.hero-down_arrow');
    if (typeof(scrollDownButton) !== 'undefined' && scrollDownButton !== null) {
      scrollDownButton.onclick = function() {
        var destination = document.querySelector('.hero').offsetHeight;
        self.scrollTo(destination, speed);
      }
    }
  };
  this.scrollToWork = function(){
    var workAnchor = document.querySelector('a.nav-link.work');
    if (typeof(workAnchor) !== 'undefined' && workAnchor !== null) {
      workAnchor.onclick = function(evt) {
        evt.preventDefault();
        var destination = document.getElementById('work').getBoundingClientRect().top;
        self.scrollTo(destination, speed);
      }
    }
  };
  this.scrollToAbout = function() {
    var aboutAnchor = document.querySelector('a.nav-link.about');
    if (typeof(aboutAnchor) !== 'undefined' && aboutAnchor !== null) {
      aboutAnchor.onclick = function(evt) {
        evt.preventDefault();
        var destination = document.querySelector('section.about-section').getBoundingClientRect().top;
        self.scrollTo(destination, speed);
      }
    }
  }

}
dnlswan.init();
