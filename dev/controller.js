// Profiler persons controller
export function fontSelector ($scope) {

  var text = document.getElementById('textContainer');
  var style = window.getComputedStyle(text);
  var slider = new Slider('#slider', {
    formatter: function(value) {
      return 'Current value: ' + value;
    }
  });
  slider.on('change', function(){
    var value = slider.getValue();
    text.style['font-size']= value+'px';
  })

  $scope.setProp = function(){
    $scope.fontFamily = style['font-family'];
    $scope.fontStyle = style['font-style'];
    $scope.fontStretch = style['font-stretch'];
  }

  $scope.setStyle = function(style) {
    text.style['font-style']= style;
    $scope.setProp();
  }

  $scope.setStretch = function(stretch) {
    text.style['font-stretch']= stretch;
    $scope.setProp();
  }

  $scope.setFont = function(name) {
    text.style['font-family']= name;
    $scope.setProp();
  }

};

// End of Profiler persons controller
