$(document).ready(function () {
    var oldstarttime = null;
    var oldendtime = null;
    var eventlist = [];

$.ajax( 
{ 
  type:"GET", 
  url: "createevents/", 
  data:{ 
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
                    }
  }
//console.log("theevent", theevent)
//console.log("startime", startTime)
//console.log("endtime", endTime)
console.log("eventlist", eventlist)
callCalendar();
},
dataType: 'json'
}) 
function callCalendar() {
  $("#container").simpleCalendar({
      fixedStartDay: 0, // begin weeks by sunday
      onDateSelect: function (date, events) {}, // Callback on date selection
      disableEmptyDetails: true,
      events: eventlist,

      /*events: [
          // generate new event after tomorrow for one hour
          {
              startDate: new Date(new Date().setHours(new Date().getHours() + 24)).toDateString(),
              endDate: new Date(new Date().setHours(new Date().getHours() + 25)).toISOString(),
              summary: 'Visit of the Eiffel Tower'
          },
          {
              startDate: new Date(new Date().setHours(new Date().getHours() + 24)).toDateString(),
              endDate: new Date(new Date().setHours(new Date().getHours() + 25)).toISOString(),
              summary: 'Visit of the Eiffel Tower'
          },
          // generate new event for yesterday at noon
          {
              startDate: new Date(new Date().setHours(new Date().getHours() - new Date().getHours() - 12, 0)).toISOString(),
              endDate: new Date(new Date().setHours(new Date().getHours() - new Date().getHours() - 11)).getTime(),
              summary: 'Restaurant'
          },
          // generate new event for the last two days
          {
              startDate: new Date(new Date().setHours(new Date().getHours() - 48)).toISOString(),
              endDate: new Date(new Date().setHours(new Date().getHours() - 24)).getTime(),
              summary: 'Visit of the Louvre'
          }
      ],*/
  });
};

  $("#add-event-button").on('click', function () {
  $("#members-page").show();
  });
  $(".show-events").on('click', function () {
  document.getElementById('show-events').style.pointerEvents = 'none';
  document.getElementById('show-calendar').style.pointerEvents = 'auto';
  $("#container").hide();
  $(".event-container").show();
  $(".show-events").css('color', 'gray');
  $(".show-events").css('cursor', 'default');
  $(".show-calendar").css('color', '#015D67');
  $(".show-calendar").css('cursor', 'pointer');
  });
  $(".show-calendar").on('click', function () {
  document.getElementById('show-calendar').style.pointerEvents = 'none';
  document.getElementById('show-events').style.pointerEvents = 'auto';
  $("#container").show();
  $(".event-container").hide();
  $(".show-events").css('color', '#015D67');
  $(".show-events").css('cursor', 'pointer');
  $(".show-calendar").css('color', 'gray');
  $(".show-calendar").css('cursor', 'default');
  });
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
    $("#members-page").hide();
    $("#event_form").trigger("reset");
  })
});