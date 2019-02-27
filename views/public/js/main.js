// Dont Work
// // cria um modulo
// angular.module("hourCount",[]);

// // seleciona o modulo
// angular.module("hourCount").controller("mainController", function($scope)
// {
//     var timer = new easytimer.Timer();
//     timer.start();
//     $scope.time = timer.getTimeValues();
// });

var timer = new easytimer.Timer();
timer.start();
timer.addEventListener("secondsUpdated", function(e) {
  $("#clock").html(timer.getTimeValues().toString());
});

function nextTask() {
  $.ajax({
    type: "POST",
    url: "next-task",
    data: {
      elapsedTime: $("#clock")
        .html()
        .toString()
    }
  });
}
