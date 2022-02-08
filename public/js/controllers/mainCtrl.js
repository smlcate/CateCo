app.controller('mainCtrl', ['$scope', '$http', '$window', '$compile', '$location', function($scope, $http, $window, $compile, $location) {

  var monthNames =  ['January','February','March','April','May','June','July','August','September','October','November','December'];

  var monthDays = [31,28,31,30,31,30,31,31,30,31,30,31];

  var daysOfWeek = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

   $scope.schedule = [];

   $scope.selectedDayIndex = null;
   $scope.selectedTimeIndex = null;

   $scope.formContinue = false;

   $scope.currentScheduleMonth = '';
   $scope.selectedScheduleDay = null;

  // function buildMeetingPlanner() {
  //   var now = new Date()
  //   var weekday = now.getDay();
  //   var today = now.getDate();
  //   var month = now.getMonth();
  //   console.log(today);
  //   for (var i = 0; i < 7; i++) {
  //
  //     var d = {
  //       day: today + i,
  //       weekday: weekday,
  //       month: month,
  //       timeslots:[]
  //     }
  //
  //     if (weekday + i > 6) {
  //       d.weekday = weekday + i - 7;
  //     } else {
  //       d.weekday = weekday + i;
  //     }
  //
  //     if (today + i > monthDays[month]) {
  //       d.day = today + i - monthDays[month];
  //     }
  //
  //     d.displayDay = daysOfWeek[d.weekday];
  //     d.displayMonth = monthNames[d.month];
  //
  //     for (var j = 0; j < 12; j++) {
  //
  //
  //       for (var k = 0; k < 5; k++) {
  //         slot = {
  //           hour: j + 8,
  //           min: 0 + (15*k)
  //         }
  //         d.timeslots.push(slot);
  //       }
  //
  //     }
  //
  //     $scope.schedule.push(d)
  //
  //   }
  //   console.log($scope.schedule);
  //
  // }

  function buildMeetingPlanner() {
    var now = new Date()
    var weekday = now.getDay();
    var today = now.getDate() + 1;
    var month = now.getMonth();
    var countDays = monthDays[month];
    var adjusted = false;
    for (var i = -1*(today); i < countDays; i++) {
      if (i == -1*today && today > 6 && adjusted == false) {
        console.log("hit")
        // countDays -= 7*(((today*10)%7));
        // countDays += today;
      }
      console.log(i);
      var d = {
        day: today + i -1,
        displayDate:today + i -1,
        weekday: weekday,
        month: month,
        timeslots:[]
      }

      if (i < today) {
        // d.displayDate += today;
      }

      if(i < 0) {
        d.day = i;
      }

      if (weekday + i > 6) {
        d.weekday = i % 7;
      } else {
        d.weekday = weekday + i;
      }

      if (today + i - 1 > monthDays[month]) {
        d.day = today + i - monthDays[month] - 1;
        d.displayMonth = monthNames[month + 1];
      }

      d.displayDay = daysOfWeek[d.weekday];
      d.displayMonth = monthNames[d.month];

      console.log(d);

      for (var j = 0; j < 12; j++) {


        for (var k = 0; k < 4; k++) {
          slot = {
            hour: j + 8,
            min: 0 + (15*k)
          }
          d.timeslots.push(slot);
        }

      }

      $scope.schedule.push(d)

    }
  }

  buildMeetingPlanner();

  function selectScheduleDay(s, index) {
    console.log(s, index);
    $('.scheduleDayCells').css('display', 'none');

    $('#websitesScheduleDisplay').css('flex-direction', 'column');

    $('#scheduleDayCell' + index + ' .scheduleDayManagerDateDisplays').css('height','3em');
    $('#scheduleDayCell' + index + ' .scheduleDayManagerDateDisplays').css('justify-content','space-between');
    $('#scheduleDayCell' + index + ' .scheduleDayManagerDateDisplays').css('margin-top','1em');


    $('#scheduleDayCell'+index).css('display','flex');
    $('#scheduleDayCell'+index).css('font-size','2em');
    $('#scheduleDayCell'+index).css('margin','0px')
    $('#scheduleDayCell'+index).css('width','50%')
    $('#scheduleDayCell'+index).css('height','2em')
    $('#scheduleDayCell'+index).css('justify-content','space-between');

    $('#scheduleHeader').css('width','50%');


    $('.weekDays').css('display','none');
    $('#weekDay'+s.weekday).css('display','flex');
    $('#weekDay'+s.weekday).css('width', '50%');

    $('#scheduleDayManagerDisplay'+index).css('display','flex');

    $scope.selectedScheduleDay = s;
    $scope.selectedDayIndex = index;
    console.log($scope.selectedScheduleDay);
  }

  function deselectScheduleDay(s, index) {
    $scope.selectedScheduleDay = null;

    $('.scheduleDayCells').css('display', 'flex');

    $('#websitesScheduleDisplay').css('flex-direction', 'row');

    $('#scheduleDayCell'+index).css('font-size','1em');
    $('#scheduleDayCell'+index).css('width','2.1277em');
    $('#scheduleDayCell'+index).css('justify-content','center');

    $('#scheduleHeader').css('width','100%');

    $('.weekDays').css('display','flex');
    $('#weekDay'+s.weekday).css('width', '2.1277em');
    $('#weekDay'+s.weekday).css('justify-content', 'center');

    $('#scheduleDayManagerDisplay'+index).css('display','none');

  }

  function selectScheduleDayTimeslot(slot, index) {
    console.log(slot, index);
    $('.scheduleDayManagerTimeslots p').css('background','none')
    $('#scheduleDayCell' + $scope.selectedDayIndex + ' .continueToScheduleFormAncs').css('display','flex');
    $scope.selectedTimeIndex = index;
    for (var i = 0; i < 4; i++) {
      $('#scheduleDayManagerTimeslot' + (index + i) + ' p').css('background','lightgreen');
    }

  }

  function continueToScheduleInfoForm() {
    console.log($scope.selectedScheduleDay);
    $('#scheduleDayManagerDisplay'+$scope.selectedDayIndex).css('display','none');
    // $('#scheduleDayInfoForms'+$scope.selectedDayIndex).css('display','flex');
    $scope.formContinue = true;
  }
  function exitScheduleInfoForm() {
    console.log($scope.selectedScheduleDay);
    $('#scheduleDayManagerDisplay'+$scope.selectedDayIndex ).css('display','flex');
    // $('#scheduleDayInfoForms'+$scope.selectedDayIndex).css('display','none');

    $scope.formContinue = false;
  }

  $scope.selectScheduleDay = function(s, index) {
    console.log('hello');
    if ($scope.selectedScheduleDay != null) {
      deselectScheduleDay(s, index);
    } else {
      selectScheduleDay(s, index);
    }
  }

  $scope.selectScheduleDayTimeslot = function(slot, index) {
    selectScheduleDayTimeslot(slot, index);
  }

  $scope.continueToScheduleInfoForm = function() {
    console.log('hit');
    continueToScheduleInfoForm();
  }
  $scope.exitScheduleInfoForm = function() {
    console.log('hit');
    exitScheduleInfoForm();
  }

}]);
