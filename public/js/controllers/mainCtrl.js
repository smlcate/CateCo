app.controller('mainCtrl', ['$scope', '$http', '$window', '$compile', '$location', function($scope, $http, $window, $compile, $location) {

  var monthNames =  ['January','February','March','April','May','June','July','August','September','October','November','December'];

  var monthDays = [31,28,31,30,31,30,31,31,30,31,30,31];

  var daysOfWeek = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];


  $scope.packages = {
    select:'',
    features: [
      {
        full:'17,500',
        red:'17,500',
        inc:'Included',
        price:'12,500'
      },
      {
        full:'28,000',
        red:'15,500',
        inc:'Included',
        price:'28,000'
      },
      {
        full:'12,500',
        red:'8,750',
        inc:'Included',
        price:'12,500'
      },
      {
        full:'16,000',
        red:'13,750',
        inc:'Included',
        price:'16,000'
      },
      {
        full:'35,000',
        red:'27,000',
        inc:'Included',
        price:'35,000'
      },
      {
        full:'8,500',
        red:'7,000',
        inc:'Included',
        price:'8,500'
      },
      {
        full:'13,500',
        red:'12,000',
        inc:'Included',
        price:'13,500'
      },
    ]
  }

  $scope.schedule = [];

  $scope.selectedDayIndex = null;
  $scope.selectedTimeIndex = null;

  $scope.formContinue = false;

  $scope.currentScheduleMonth = '';
  $scope.selectedScheduleDay = null;

  $scope.toMeet = {
   email:'',
   name:'',
   summary:''
  };

  

  function showNewPrices(p) {
    if(p == 0) {

    } else if(p == 1) {
      $scope.packages.features[5].price = $scope.packages.features[5].red;
      $scope.packages.features[6].price = $scope.packages.features[6].red;
    } else if(p == 2) {
      $scope.packages.features[0].price = $scope.packages.features[0].inc;
      $scope.packages.features[1].price = $scope.packages.features[1].red;
      $scope.packages.features[4].price = $scope.packages.features[4].red;

    }
  }
  function showRegPrices(p) {
    if(p == 0) {

    } else if(p == 1) {
      $scope.packages.features[5].price = $scope.packages.features[5].full;
      $scope.packages.features[6].price = $scope.packages.features[6].full;
    } else if(p == 2) {
      $scope.packages.features[0].price = $scope.packages.features[0].full;
      $scope.packages.features[1].price = $scope.packages.features[1].full;
      $scope.packages.features[4].price = $scope.packages.features[4].full;
    }
  }

  function getSchedule() {
    $http.get('getSchedule')
    .then(function(res) {
      console.log(res);
      if(res.data.length > 0) {
        $scope.schedule = JSON.parse(res.data[res.data.length - 1].scheduleData);
        buildMeetingPlanner();
      } else {
        buildMeetingPlanner();
      }
    })
    .catch(function(err) {
      console.log(err);
    })
  }

  function buildMeetingPlanner() {
    var now = new Date()
    var weekday = now.getDay();
    var today = now.getDate() + 1;
    var month = now.getMonth();
    var countDays = monthDays[month];
    var adjusted = false;

    if ($scope.schedule.length == 0) {

      for (var i = -1*(today); i < countDays; i++) {

        var d = {
          day: today + i - 1,
          displayDate:today + i - 1,
          weekday: weekday,
          month: month,
          timeslots:[]
        }

        if(i <= 0) {
          d.day = i;
        }

        if (weekday + i > 6) {
          d.weekday = i % 7;
        } else if(weekday + i > 12) {
          d.weekday = (i-4) % 7;
        } else {
          d.weekday = weekday + i;
        }

        if (today + i - 1 > monthDays[month]) {
          d.day = today + i - monthDays[month] - 1;
          d.month += 1;
          d.displayMonth = monthNames[month + 1];
        }

        d.displayDay = daysOfWeek[d.weekday];
        d.displayMonth = monthNames[d.month];

        for (var j = 0; j < 12; j++) {

          for (var k = 0; k < 4; k++) {
            slot = {
              hour: j + 8,
              min: 0 + (15*k),
              slot: null
            }
            d.timeslots.push(slot);
          }

        }

        $scope.schedule.push(d)

      }
    } else {
      for (var i = 0; i < $scope.schedule.length; i++) {
        console.log(month, $scope.schedule[i].month);
        if (month == $scope.schedule[i].month && today > $scope.schedule[i].day) {
          $scope.schedule[i].day = 0;
          console.log($scope.schedule[i].day);
        }
      }
    }

    console.log($scope.schedule);
  }

  function selectScheduleDay(s, index) {
    $('.scheduleDayCells').css('display', 'none');

    $('#websitesScheduleDisplay').css('flex-direction', 'column');
    $('#websitesScheduleDisplay').css('height', '14em');

    $('#scheduleDayCell' + index + ' .scheduleDayManagerDateDisplays').css('height','3em');
    $('#scheduleDayCell' + index + ' .scheduleDayManagerDateDisplays').css('justify-content','space-between');
    $('#scheduleDayCell' + index + ' .scheduleDayManagerDateDisplays').css('margin-top','1em');

    $('#scheduleDayCell'+index).css('display','flex');
    $('#scheduleDayCell'+index).css('font-size','2em');
    $('#scheduleDayCell'+index).css('margin','0px')
    $('#scheduleDayCell'+index).css('width','50%')

    $('#scheduleDayCell'+index).css('justify-content','space-between');

    $('#scheduleHeader').css('width','50%');


    $('.weekDays').css('display','none');
    $('#weekDay'+s.weekday).css('display','flex');
    $('#weekDay'+s.weekday).css('width', '50%');

    $('#scheduleDayManagerDisplay'+index).css('display','flex');

    $scope.selectedScheduleDay = s;
    $scope.selectedDayIndex = index;

    for (var i = 0; i < $scope.selectedScheduleDay.timeslots.length; i++) {
      if ($scope.selectedScheduleDay.timeslots[i + 3] && $scope.selectedScheduleDay.timeslots[i + 3].slot != null) {
        $('#scheduleDayManagerDisplay' + index + ' #scheduleDayManagerTimeslot' + i).css('pointer-events','none');
        $('#scheduleDayManagerDisplay' + index + ' #scheduleDayManagerTimeslot' + i).css('cursor','default');
        $('#scheduleDayManagerDisplay' + index + ' #scheduleDayManagerTimeslot' + i).css('color','rgba(0, 21, 36,0.5)');
      }
      if ($scope.selectedScheduleDay.timeslots[i].slot != null) {
        $('#scheduleDayManagerDisplay' + index + ' #scheduleDayManagerTimeslot' + i).css('background','#EF5B5B');
        $('#scheduleDayManagerDisplay' + index + ' #scheduleDayManagerTimeslot' + i).css('pointer-events','none');
        $('#scheduleDayManagerDisplay' + index + ' #scheduleDayManagerTimeslot' + i).css('cursor','default');
        $('#scheduleDayManagerDisplay' + index + ' #scheduleDayManagerTimeslot' + i).css('color','rgba(0, 21, 36,0.5)');
      }
    }
  }

  function deselectScheduleDay(s, index) {
    $scope.selectedScheduleDay = null;
    $scope.formContinue = false;
    $('.scheduleDayCells').css('display', 'flex');

    $('#websitesScheduleDisplay').css('flex-direction', 'row');
    $('#websitesScheduleDisplay').css('height', 'auto');

    $('#scheduleDayCell' + index + ' .scheduleDayManagerDateDisplays').css('height','auto');
    $('#scheduleDayCell' + index + ' .scheduleDayManagerDateDisplays').css('justify-content','space-between');
    $('#scheduleDayCell' + index + ' .scheduleDayManagerDateDisplays').css('margin-top','0px');

    $('#scheduleDayCell'+index).css('font-size','1em');
    $('#scheduleDayCell'+index).css('width','2.1277em');
    $('#scheduleDayCell'+index).css('justify-content','center');

    $('#scheduleHeader').css('width','100%');

    $('.weekDays').css('display','flex');
    $('#weekDay'+s.weekday).css('width', '2.1277em');

    $('#scheduleDayManagerDisplay'+index).css('display','none');
    $('.exitScheduleFormAncs').css('display','none');
    $('.continueToScheduleFormAncs').css('display','none');


  }

  function selectScheduleDayTimeslot(slot, index) {
    $('.scheduleDayManagerTimeslots p').css('background','none')
    $('#scheduleDayCell' + $scope.selectedDayIndex + ' .continueToScheduleFormAncs').css('display','flex');
    $('.exitScheduleFormAncs').css('display','flex');
    $scope.selectedTimeIndex = index;
    for (var i = 0; i < 4; i++) {
      $('#scheduleDayManagerTimeslot' + (index + i) + ' p').css('background','#7FB069');
    }

  }

  function continueToScheduleInfoForm() {

    $('#scheduleDayManagerDisplay'+$scope.selectedDayIndex).css('display','none');
    $('.scheduleDayManagerTimeslots p').css('display','flex')

    $scope.formContinue = true;
  }

  function exitScheduleInfoForm() {

    $('#scheduleDayManagerDisplay'+$scope.selectedDayIndex ).css('display','flex');

    $('#scheduleDayCell' + $scope.selectedDayIndex + ' .continueToScheduleFormAncs').css('display','none');

    $scope.formContinue = false;
  }

  function addToSchedule() {
    for (var i = 0; i < 4; i++) {

      $scope.schedule[$scope.selectedDayIndex].timeslots[$scope.selectedTimeIndex + i].slot = $scope.toMeet;

    }
    $http.post('addToSchedule',{schedule:JSON.stringify($scope.schedule)})
    .then(function(res) {
      console.log(res.data);
    })
    .catch(function(err) {
      console.log(err);
    })
  }

  $scope.showNewPrices = function(p) {
    showNewPrices(p);
  }
  $scope.showRegPrices = function(p) {
    showRegPrices(p);
  }

  $scope.selectScheduleDay = function(s, index) {

    if ($scope.selectedScheduleDay != null) {
      deselectScheduleDay(s, index);
    } else {
      selectScheduleDay(s, index);
    }

  }

  $scope.selectScheduleDayTimeslot = function(slot, index) {
    selectScheduleDayTimeslot(slot, index);
  }

  $('.scheduleDayManagerTimeslots').hover(
    function() {
      console.log('hit');
      var id = $('this').attr('id');
      var index = id.charAt(id.length-1);
      for (var i = 0; i < 4; i++) {
        $('#scheduleDayManagerDisplay' + $scope.selectedDayIndex + ' #scheduleDayManagerTimeslot' + (index + i)).css('background','#7FB069');
      }
    }, function() {
      console.log('hit 2');
      var id = $('this').attr('id');
      var index = id.charAt(id.length-1);
      for (var i = 0; i < 4; i++) {
        $('#scheduleDayManagerDisplay' + $scope.selectedDayIndex + ' #scheduleDayManagerTimeslot' + (index + i)).css('background','none');
      }
    }
  );

  $scope.continueToScheduleInfoForm = function() {
    continueToScheduleInfoForm();
  }
  $scope.exitScheduleInfoForm = function() {
    exitScheduleInfoForm();
  }
  $scope.addToSchedule = function() {
    addToSchedule();
  }

  function start() {
    getSchedule();
    $('#welcomeHomeDiv').animate({
      background: "#001524"
    },1500);
  }
  start();
}]);
