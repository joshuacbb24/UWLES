$(document).ready(function () {
  var oldstarttime = null;
  var oldendtime = null;
  var eventlist = [];
  var choice = null;
  var noevent = true;
  var id = null;
  var day = null;
  var calday = null;
  var call = 0;
  var onmonth = 0;
  let cal = null;

  function isEmptyOrSpaces(str){
    return str === null || str.match(/^ *$/) !== null || str.length < 1;
}
  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');
function getCalendar() {
$.ajax( 
{ 
type:"GET", 
url: "createevents/", 
data:{ 
         command: "retreive",
         username: $("#myself").val()
      }, 
success: function(data, textStatus) 
{ 
for (var i = 0; i < data.events.length; i++)
{
  var theevent = data.events[i];
  var startdate = theevent.startDate;
  var starttime = theevent.startTime;
  var enddate = theevent.endDate;
  var endtime = theevent.endTime;
  var startTime = startdate.concat(' ', starttime);
  startTime = new Date (startTime);
  var endTime = enddate.concat(' ', endtime);
  endTime = new Date (endTime);
  eventlist[i] = {    
                      startDate: startTime,
                      endDate: endTime,
                      summary: theevent.summary,
                      title: theevent.title,
                      allDay: theevent.allDay,
                      eventid: theevent.eventID,
                  }
}
//console.log("theevent", theevent)
//console.log("startime", startTime)
//console.log("endtime", endTime)
//console.log("eventlist", eventlist)
if (call == 0){
  callCalendar(eventlist);
  call = null;
}
else{
if (call != 0 && onmonth == 0){
cal.settings.events = eventlist;
cal.buildCalendar(new Date(), $(cal.element).find('.calendar'));
cal.updateHeader(new Date(), $(cal.element).find('.calendar header'));
call = null;
}
if (call != 0 && onmonth != 0){
  cal.settings.events = eventlist;
  cal.buildCalendar(onmonth, $(cal.element).find('.calendar'));
  cal.updateHeader(onmonth, $(cal.element).find('.calendar header'));
  call = null;
  }
  if (day != null)
  {
  var newday = document.getElementById(day);
  $(newday).click();
  }
  $("#event-page").hide();
  $(".delete-modal").hide();
  call = null;
} 
},
dataType: 'json'
});
}
function callCalendar(events) {
  //cardContainer = $("#container")
  //var scal = new simpleCalendar(cardContainer, {
$("#container").simpleCalendar({
    fixedStartDay: 0, // begin weeks by sunday
    onDateSelect: function (date, events, clickedday, plug) {
      //console.log("after timeout/cal2");
      day = clickedday;
      cal = plug;
      calday = date;
      var taskday = date.toString();
      //console.log("plug", plug)
      taskday = taskday.split(" ");
      taskday = (taskday[0] + ", " + taskday[1] + " " + taskday[2] + " " + taskday[3]);
      $(".event-day").text("");
      $(".event-day").append(taskday);

    }, // Callback on date selection
    onMonthChange: function (month, year, value) {
      onmonth = month;
      day = null;
    },//callback on month change
    disableEmptyDetails: true,
    events: events,
    onEventSelect: function (clickedevent) {
      call = 1;
      choice = 1;
      noevent = false;
      id = clickedevent;
      //console.log("clickedevent", clickedevent)
      $.ajax( 
        { 
          type:"GET", 
          url: "createevents/", 
          data: {
                   eventid: id,
                   command: "edit"
                }, 
        success: function(data, textStatus) 
        { 
          $("#id_title").val(data.title);
          $("#id_description").val(data.summary);
          $("#id_all_day").val(data.allDay);
          $("#id_end_time").val(data.endTime);
          $("#id_start_time").val(data.startTime);
          $("#id_end_day").val(data.endDate);
          $("#id_start_day").val(data.startDate);
          $("#event-page").show();
        }
      })
    },
});
/*if (call == 0)
{
document.querySelector(".today").click();
call = null;
}*/
$("#add-event-button").on('click', function () {
  choice = 0;
  noevent = true;
  $("#id_all_day").val(false);
  $("#id_title").val("");
  $("#id_description").val("");
  $("#event-page").show();
  });
};

getCalendar();
$("#close-modal").on('click', function(){
call = 0;
document.getElementById('event-page').style.display='none'
});
/*$(".show-events").on('click', function () {
document.getElementById('show-events').style.pointerEvents = 'none';
document.getElementById('show-calendar').style.pointerEvents = 'auto';
$("#container").hide();
$(".event-container").show();
$(".show-events").css('color', 'gray');
$(".show-events").css('cursor', 'default');
$(".show-calendar").css('color', '#015D67');
$(".show-calendar").css('cursor', 'pointer');
});*/
/*$(".show-calendar").on('click', function () {
document.getElementById('show-calendar').style.pointerEvents = 'none';
document.getElementById('show-events').style.pointerEvents = 'auto';
$("#container").show();
$(".event-container").hide();
$(".show-events").css('color', '#015D67');
$(".show-events").css('cursor', 'pointer');
$(".show-calendar").css('color', 'gray');
$(".show-calendar").css('cursor', 'default');
});*/

$("#id_all_day").change(function() {
  if ($("#id_all_day").prop('checked'))
  {
  oldstarttime = $("#id_start_time").val();
  oldendtime = $("#id_end_time").val();
  var start = '00:00';
  var end = '23:59'
  /*var startday = new Date(new Date().setHours(new Date().getHours(0),0,0));
  var endday = new Date(new Date().setHours(new Date().getHours(23),59,59));
  var sday = ("0" + startday.getDate()).slice(-2);
  var smonth = ("0" + (startday.getMonth() + 1)).slice(-2);
  var eday = ("0" + endday.getDate()).slice(-2);
  var emonth = ("0" + (endday.getMonth() + 1)).slice(-2);
  var autosday = startday.getFullYear()+"-"+(smonth)+"-"+(sday);
  var autoeday = endday.getFullYear()+"-"+(emonth)+"-"+(eday);*/
  $("#id_start_time").prop('disabled', true);
  $("#id_end_time").prop('disabled', true);
  $("#id_start_time").val(start);
  //$("#id_start_day").val(autosday);
  $("#id_end_time").val(end);
  //$("#id_end_day").val(autoeday);
  }
  else 
  {
    $("#id_start_time").prop('disabled', false);
  $("#id_end_time").prop('disabled', false);
  $("#id_start_time").val(oldstarttime);
  $("#id_end_time").val(oldendtime);
  }
});
$("#canc").on('click', function () {
if (noevent === true){
  $("#event-page").hide();
  //$("#event_form").trigger("reset");
}

else {
  $(".delete-modal").show();
}
});
$("#confirmation").on('click', function () {
  $.ajax({
    type: "POST",
    url: "createevents/",
    headers: {'X-CSRFToken': csrftoken},
    data:{ 
      title: $('#id_title').val(),
      description: $('#id_description').val(),
      start_day: $('#id_start_day').val(),
      end_time: $('#id_end_time').val(),
      start_time: $('#id_start_time').val(),
      all_day: $('#id_all_day').val(),
      end_day: $('#id_end_day').val(),
      command: "delete",
      eventid: id,      
},
    success: function(data)
    {
        
    //var deletedevent = $(".event-body").find("[data-event=" + id + "]")[0];
    //deletedevent.remove();
    
    eventlist = [];
    getCalendar();
    noevent = true;
    },
    //dataType: 'json'
  });
});
$("#reverse").on('click', function () {
  $(".delete-modal").hide();
});
$("#event_form").submit(function (e) {
  if (choice == 0)
  {
  e.preventDefault();
        var titlestr = $('#id_title').val();
        var startVal = $('#id_start_day').val();
        var endVal = $('#id_end_day').val();
        var starttime = $('#id_start_time').val();
        var endtime = $('#id_end_time').val();

        /*var startday = new Date(startVal);
        var endday = new Date(endVal);
        var eventstart = startday.getFullYear() + '-' + (startday.getMonth() + 1) + '-' + startday.getDate();
        var eventend = endday.getFullYear() + '-' + (endday.getMonth() + 1) + '-' + endday.getDate();;
        //var starttime = new Date($('#id_start_day').val()).toJSON().slice(11, 16);
        //var endtime = new Date($('#id_end_day').val()).toJSON().slice(11, 16);
        */

        var errorFound = false;     
        if (isEmptyOrSpaces(titlestr)){
          $('#error-title').show("fast").delay(5000).fadeOut('fast');
          $('#id_title').addClass("input-error");
          errorFound = true; 
        }
        if (endVal < startVal){
          $('#error-start-day').show("fast").delay(5000).fadeOut('fast');
          $('#error-end-day').show("fast").delay(5000).fadeOut('fast');
          $('#id_start_day').addClass("input-error");
          $('#id_end_day').addClass("input-error");
          errorFound = true; 
        }
        if ((endVal == startVal) && (endtime < starttime)){
          $('#error-start-time').show("fast").delay(5000).fadeOut('fast');
          $('#error-end-time').show("fast").delay(5000).fadeOut('fast');
          $('#id_start_time').addClass("input-error");
          $('#id_end_time').addClass("input-error");
          errorFound = true; 
       }   
        if (!errorFound)
        {
              
          var errorfields = document.getElementsByClassName("input-error");
          for (i = 0; i < errorfields.length; i++)
          {
            var el = $(errorfields[i])[0];
            el.removeClass('input-error');
          }
  $.ajax({
    type: "POST",
    url: "createevents/",
    headers: {'X-CSRFToken': csrftoken},
    data:{ 
      title: $('#id_title').val(),
      description: $('#id_description').val(),
      start_day: $('#id_start_day').val(),
      end_time: $('#id_end_time').val(),
      start_time: $('#id_start_time').val(),
      all_day: $('#id_all_day').val(),
      end_day: $('#id_end_day').val(),
      command: "create",
    },
    success: function(data)
    {
      call = 1;
      eventlist = [];
      getCalendar();      
    },
    //dataType: 'json'
  });
   }
   else {
     errorFound = false;
   }
  
  }
  else{
    e.preventDefault();
    var titlestr = $('#id_title').val();
        var startVal = $('#id_start_day').val();
        var endVal = $('#id_end_day').val();
        var starttime = $('#id_start_time').val();
        var endtime = $('#id_end_time').val();

        /*var startday = new Date(startVal);
        var endday = new Date(endVal);
        var eventstart = startday.getFullYear() + '-' + (startday.getMonth() + 1) + '-' + startday.getDate();
        var eventend = endday.getFullYear() + '-' + (endday.getMonth() + 1) + '-' + endday.getDate();;
        //var starttime = new Date($('#id_start_day').val()).toJSON().slice(11, 16);
        //var endtime = new Date($('#id_end_day').val()).toJSON().slice(11, 16);
        */

        var errorFound = false;     
        if (isEmptyOrSpaces(titlestr)){
          $('#error-title').show("fast").delay(5000).fadeOut('fast');
          $('#error-title').addClass("input-error");
          errorFound = true; 
        }
        if (endVal < startVal){
          $('#error-start-day').show("fast").delay(5000).fadeOut('fast');
          $('#error-end-day').show("fast").delay(5000).fadeOut('fast');
          $('#error-start-day').addClass("input-error");
          $('#error-end-day').addClass("input-error");
          errorFound = true; 
        }
        if ((endVal <= startVal) && (endtime < starttime)){
          $('#error-start-time').show("fast").delay(5000).fadeOut('fast');
          $('#error-end-time').show("fast").delay(5000).fadeOut('fast');
          $('#error-start-time').addClass("input-error");
          $('#error-end-time').addClass("input-error");
          errorFound = true; 
       }       
        if (!errorFound)
        {
          var errorfields = document.getElementsByClassName("input-error");
          for (i = 0; i < errorfields.length; i++)
          {
            var el = $(errorfields[i])[0];
            el.removeClass('input-error');
          }
    $.ajax({
      type: "POST",
      url: "/createevents/",
      headers: {'X-CSRFToken': csrftoken},
      data:{ 
        title: $('#id_title').val(),
        description: $('#id_description').val(),
        start_day: $('#id_start_day').val(),
        end_time: $('#id_end_time').val(),
        start_time: $('#id_start_time').val(),
        all_day: $('#id_all_day').val(),
        end_day: $('#id_end_day').val(),
        command: "edit",
        eventid: id
      },
      success: function(data)
      {
        getCalendar();
        noevent = true;
      },
      //dataType: 'json'
    }); 
  } 
  else {
    errorFound = false;
  } 
  }
});
});
