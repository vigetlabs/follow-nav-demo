// setting up namespace for project
var vigetHowTo = vigetHowTo || {};

/*
  Handles smooth scrolling animations in nav
*/
vigetHowTo.smoothNavScroll = function() {
  var navLinks = document.querySelectorAll('.nav-link');
  console.log(navLinks);
  var animateScroll = function(e) {
    e.preventDefault();
    var slug = this.getAttribute('data-name');
    var scrollTarget = document.getElementById(slug).offsetTop;

    // using function defined in smooth-scroll-to
    smoothScrollTo(document.documentElement, scrollTarget, 200);
    smoothScrollTo(document.body, scrollTarget, 200);
  }

  // loop through the navLinks array and add an event listener to each
  for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener('click', animateScroll, false);
  }
}

/*
  A basic module for sticking nav to window when
  its top edge is in line with window's top edge
*/
vigetHowTo.followNavAdjust = function() {

  // target to get 'stuck' plus its parent container
  var followNav = document.getElementById('followNav');
  // parent container
  var followContainer = document.getElementById('followContainer');

  // gathering a few heights to set up a scroll range
  var followNavHeight = followNav.offsetHeight;
  var followNavOffset = followContainer.lastElementChild.offsetTop;
  var followContainerOffset = followContainer.offsetTop;
  var followContainerHeight = followContainer.offsetHeight;
  // followNavHeight * 2 adds extra space to account for the heigh in calculations
  var scrollMaxRange = (followContainerHeight + followContainerOffset) - (followNavHeight*2);

  // rescroll checking
  var scrollPosition = window.scrollY;

  // if the scroll position goes less than the range of the section, reset it
  if (scrollPosition < followNavOffset) {
    followNav.style.transform = 'translateY(0px)';

  // if the scroll position is beyond the range of the section, set it to bottom
  } else if (scrollPosition > scrollMaxRange) {
    followNav.style.transform = 'translateY(' + ( followContainerHeight - (followNavHeight*2) )+ 'px)';
  }

  // otherwise, it is in the range and needs to follow the scroll position
  else {
    followNav.style.transform = 'translateY(' + (scrollPosition - followNavOffset) + 'px)';
  }
}


vigetHowTo.init = function() {
  vigetHowTo.smoothNavScroll();
};

// scripts to fire on page load
vigetHowTo.init();

// scripts to fire on page scroll
window.addEventListener('scroll', debounce(vigetHowTo.followNavAdjust, 200));