(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _controller = require('./controller');

var fonts = angular.module('Selector', []); // Main client script

fonts.controller('fontSelector', _controller.fontSelector);

// End of Main
},{"./controller":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fontSelector = fontSelector;
// Profiler persons controller
function fontSelector($scope) {

  var text = document.getElementById('textContainer');
  var style = window.getComputedStyle(text);
  var slider = new Slider('#slider', {
    formatter: function formatter(value) {
      return 'Current value: ' + value;
    }
  });
  slider.on('change', function () {
    var value = slider.getValue();
    text.style['font-size'] = value + 'px';
  });

  $scope.setProp = function () {
    $scope.fontFamily = style['font-family'];
    $scope.fontStyle = style['font-style'];
    $scope.fontStretch = style['font-stretch'];
  };

  $scope.setStyle = function (style) {
    text.style['font-style'] = style;
    $scope.setProp();
  };

  $scope.setStretch = function (stretch) {
    text.style['font-stretch'] = stretch;
    $scope.setProp();
  };

  $scope.setFont = function (name) {
    text.style['font-family'] = name;
    $scope.setProp();
  };
};

// End of Profiler persons controller
},{}]},{},[1]);
