$(document).ready(function () {
    var oldstarttime = null;
    var oldendtime = null;
    var eventlist = [];
    var choice = null;
    var noevent = true;
    var id = null;
    var day = null;
    var call = 0;
    var onmonth = 0;
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
callCalendar();
},
dataType: 'json'
});
}
function callCalendar() {
  $("#container").simpleCalendar({
      fixedStartDay: 0, // begin weeks by sunday
      onDateSelect: function (date, events, clickedday, plug) {
        day = clickedday;
        if (call = 1)
        {
        plug.changeMonth(onmonth);
        }
        console.log("plug", plug)
      }, // Callback on date selection
      onMonthChange: function (month, year, value) {
        onmonth = onmonth + value;
      },//callback on month change
      disableEmptyDetails: true,
      events: eventlist,
      onEventSelect: function (clickedevent) {
        call = 1;
        choice = 1;
        noevent = false;
        id = clickedevent;
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
  if (call = 0)
  {
  document.querySelector(".today").click();
  }
  else {
    day.click();
  }
  $("#add-event-button").on('click', function () {
    choice = 0;
    noevent = true;
    $("#members-page").show();
    });
};
getCalendar();


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
  if (noevent === true){
    $("#members-page").hide();
    $("#event_form").trigger("reset");
  }
  else {
    $.ajax({
      type: "POST",
      url: "createevents/",
      data:{ 
        command: "delete",
        eventid: id        
 }, // serializes the form's elements.
      success: function(data)
      {/*
          var list = document.getElementById("event-body");
          var deletedevent = $(".event-list").find("[data-event=" + id + "]")[0];
      list.removeChild(deletedevent);*/
      getCalendar();
      $("#members-page").hide();
      $("#event_form").trigger("reset");
      noevent = true;
      call = 0;
      },
      //dataType: 'json'
    });

  }
  });
  $("#event_form").submit(function (e) {
    if (choice == 0)
    {
    e.preventDefault();
    var form = $(this);
    $.ajax({
      type: "POST",
      url: "createevents/",
      data:{ eventform: form.serialize(),
        command: "create",
      }, // serializes the form's elements.
      success: function(data)
      {
        /*var list = document.getElementById("event-body");
        var startdate = data.startDate;
        var starttime = data.startTime;
        var enddate = data.endDate;
        var endtime = data.endTime;
        var startTime = startdate.concat(' ', starttime);
        startTime = new Date (startTime);
        var endTime = enddate.concat(' ', endtime);
        endTime = new Date (endTime);
        if (!data.allDay)
        {
        var $event = `<li class="event-list" data-event="${data.eventID}">`+`<div class="event-in-list" data-eventtext="${data.eventID}">`+ '@ ' + startTime.getHours() + ':' + (startTime.getMinutes() < 10 ? '0' : '') + startTime.getMinutes() + ' On ' + plugin.formatDateEvent(startTime, endTime) + ' ' +  data.title +`</div>`+ ` <div data-eventdescription="${data.eventID}" class="event-description" style="word-wrap: break-word;">` + data.summary + `</div>` +`</li>`;
        list.append($event);
        }
        else{
        var $event = `<li class="event-list" data-event="${data.eventID}">`+`<div class="event-in-list" data-eventtext="${data.eventID}">`+  data.title +`</div>`+ ` <div data-eventdescription="${data.eventID}" class="event-description" style="word-wrap: break-word;">` + data.summary + `</div>` +`</li>`;
        list.append($event);
        }*/
        getCalendar();
        $("#members-page").hide();
        $("#event_form").trigger("reset");
      },
      //dataType: 'json'
    });

    
    }
    else{
      e.preventDefault();
      var form = $(this);   
      var id = event_id;
      $.ajax({
        type: "POST",
        url: "createevents/",
        data:{ eventform: form.serialize(),
               command: "edit",
               eventid: id
        }, // serializes the form's elements.
        success: function(data)
        {
          /*var editevent = $(".event-in-list").find("[data-eventtext=" + id + "]")[0];
          var editdescription = $(".event-description").find("[data-eventdescription=" + id + "]")[0];

            var startdate = data.startDate;
            var starttime = data.startTime;
            var enddate = data.endDate;
            var endtime = data.endTime;
            var startTime = startdate.concat(' ', starttime);
            startTime = new Date (startTime);
            var endTime = enddate.concat(' ', endtime);
            endTime = new Date (endTime);
            editevent.text("");
            editdescription.text("");
            if (!data.allDay)
            {
              var $event = '@ ' + startTime.getHours() + ':' + (startTime.getMinutes() < 10 ? '0' : '') + startTime.getMinutes() + ' On ' + plugin.formatDateEvent(startTime, endTime) + ' ' +  data.title;
              var $description = data.summary;
              editevent.text($event);
              editdescription.text($description);
          }
          else{
            var $event = data.title;
            var $description = data.summary;
            editevent.text($event);
            editdescription.text($description);           
          }*/

          getCalendar();
          $("#members-page").hide();
          $("#event_form").trigger("reset");
          noevent = true;
          call = 0;
        },
        //dataType: 'json'
      });   
    }
});
});