// THIS FILE MUST be loaded BEFORE adapt.min.js


// Called by Adapt.js
function myCallback(i, width) {
  // Replace HTML tag's ID.
  document.documentElement.id = 'range_' + i;

  // Note: Not making use of width here, but I'm sure
  // you could think of an interesting way to use it.
}

// Edit to suit your needs.
var ADAPT_CONFIG = {
  path: 'javascripts/libs/adapt/styles/',
  // false = Only run once, when page first loads.
  // true = Change on window resize and page tilt.
  dynamic: true,

  // Optional callback... myCallback(i, width)
  callback: myCallback,

  // First range entry is the minimum.
  // Last range entry is the maximum.
  // Separate ranges by "to" keyword.
  range: [
  //  '0px    to 760px  = mobile.css',
    '760px  to 980px  = 720.css',
    '980px  to 1280px = 960.css',
    '1280px to 1600px = 1200.css',
    '1600px to 1920px = 1560.css',
    '1940px to 2540px = 1920.css',
    '2540px           = 2520.css'
  ]
};
