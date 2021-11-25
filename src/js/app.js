// ------------------- imports
import $ from 'jquery';
import isMobile from 'ismobilejs';

// -------------------  dev widget
import pageWidgetInit from './dev_vendors/dev_widget';
// -------------------  dev widget###

// ------------------  components
import './components/test.js';
// ------------------  components###

window.jQuery = $;
window.$ = $;

// -------------------  global variables
let $body;
let windowHeight;
let windowWidth;
let isMobileData;
const degree = 0.0174532925;
const mediaPoint1 = 1024;
const mediaPoint2 = 768;
const mediaPoint3 = 480;
const mediaPoint4 = 320;
const projectDevStatus = process.env.NODE_ENV === 'development';
// -------------------  global variables###

// eslint-disable-next-line no-shadow
$(document).ready(function ($) {
  isMobileData = isMobile();
  $body = $('body');

  if (projectDevStatus) {
    console.log(process.env.NODE_ENV);
    pageWidgetInit();
  }
});

$(window).on('load', function () {
  updateSizes();
  loadFunc();
});

$(window).on('resize', function () {
  resizeFunc();
});

$(window).on('scroll', function () {
  scrollFunc();
});

function loadFunc() {
  // calcViewportHeight();
}

function resizeFunc() {
  updateSizes();
  // calcViewportHeight();
}

function scrollFunc() {}

function calcViewportHeight() {
  const isApple = isMobileData.apple.phone;
  const isAndroid = isMobileData.android.phone;
  const isSeven = isMobileData.seven_inch;

  if (isApple || isAndroid || isSeven) {
    const vh = window.innerHeight * 0.01;
    // var vh2 = document.documentElement.clientHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh + 'px');
  }
}

function updateSizes() {
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
}

// eslint-disable-next-line no-unused-vars
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// eslint-disable-next-line no-unused-vars
function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

const styles = ['color: #fff', 'background: #cf8e1f'].join(';');
const message = 'Developed by Glivera-team https://glivera-team.com/';

// eslint-disable-next-line no-console
console.info('%c%s', styles, message);
