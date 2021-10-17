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
    return str === null || str.match(/^ *$/) !== null || str.value.length < 1;
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
console.log("eventlist", eventlist)
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
  $("#members-page").hide();
  $(".confirmation-chat-modal").hide();
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
      day = clickedday;
      cal = plug;
      calday = date;
      var taskday = date.toString();
      console.log("plug", plug)
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
      console.log("clickedevent", clickedevent)
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
          $("#members-page").show();
        }
      })
    },
});
if (call == 0)
{
document.querySelector(".today").click();
call = null;
}
$("#add-event-button").on('click', function () {
  choice = 0;
  noevent = true;
  $("#id_all_day").val(false);
  $("#id_title").val("");
  $("#id_description").val("");
  $("#members-page").show();
  });
};

getCalendar();
$("#close-modal").on('click', function(){
call = 0;
document.getElementById('members-page').style.display='none'
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
  $("#members-page").hide();
  //$("#event_form").trigger("reset");
}

else {
  $(".confirmation-chat-modal").show();
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
  $(".confirmation-chat-modal").hide();
});
$("#event_form").submit(function (e) {
  if (choice == 0)
  {
  e.preventDefault();
  
  
    /*
    error list
starttime.on change 
-(end time cannot be before start time)
if it is disable submit button and give error
startday.on change
-(end day cannot be before start day)
if it is disable submit button and give error
endtime.on change 
-(end time cannot be before start time)
if it is disable submit button and give error
endday.on change
-(end day cannot be before start day)
if it is disable submit button and give error
        $('#id_title').val(),
        $('#id_start_day').val(),
        $('#id_start_time').val(),
        $('#id_end_day').val(),
        $('#id_end_time').val(),
    */
        var titlestr = $('#id_title').val();
        var startday = new Date($('#id_start_day').val()).toJSON().slice(0, 10);
        var endday = new Date($('#id_end_day').val()).toJSON().slice(0, 10);
        //var starttime = new Date($('#id_start_day').val()).toJSON().slice(11, 16);
        //var endtime = new Date($('#id_end_day').val()).toJSON().slice(11, 16);
        var starttime = new Date($('#id_start_day').val());
        var endtime = new Date($('#id_end_day').val());        
        if (isEmptyOrSpaces(titlestr)){
     
        }
        else if (endday < startday){
     
        }
        else if (Date.parse(endtime) < Date.parse(starttime)){
     
       }   
        else {
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
  
  }
  else{
    e.preventDefault();
    /*
error list
starttime.on change 
-(end time cannot be before start time)
if it is disable submit button and give error
startday.on change
-(end day cannot be before start day)
if it is disable submit button and give error
endtime.on change 
-(end time cannot be before start time)
if it is disable submit button and give error
endday.on change
-(end day cannot be before start day)
if it is disable submit button and give error
        $('#id_title').val(),
        $('#id_start_day').val(),
        $('#id_start_time').val(),
        $('#id_end_day').val(),
        $('#id_end_time').val(),
    */
        var titlestr = $('#id_title').val();
        var startday = new Date($('#id_start_day').val()).toJSON().slice(0, 10);
        var endday = new Date($('#id_end_day').val()).toJSON().slice(0, 10);
        //var starttime = new Date($('#id_start_day').val()).toJSON().slice(11, 16);
        //var endtime = new Date($('#id_end_day').val()).toJSON().slice(11, 16);
        var starttime = new Date($('#id_start_day').val());
        var endtime = new Date($('#id_end_day').val());        
        if (isEmptyOrSpaces(titlestr)){
     
        }
        else if (endday < startday){
     
        }
        else if (Date.parse(endtime) < Date.parse(starttime)){
     
       }   
        else {
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
  }
});
});
