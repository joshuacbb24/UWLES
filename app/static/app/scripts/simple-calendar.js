// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
{

  // Create the defaults once
  var pluginName = "simpleCalendar",
    defaults = {
      months: ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'], //string of months starting from january
      days: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'], //string of days starting from sunday
      displayYear: true, // display year in header
      fixedStartDay: true, // Week begin always by monday or by day set by number 0 = sunday, 7 = saturday, false = month always begin by first day of the month
      displayEvent: true, // display existing event
      disableEventDetails: false, // disable showing event details
      disableEmptyDetails: false, // disable showing empty date details
      events: [], // List of event
      onInit: function (calendar) {}, // Callback after first initialization
      onMonthChange: function (month, year, value) {}, // Callback on month change
      onDateSelect: function (date, events, clickedday, plug) {}, // Callback on date selection
      onEventSelect: function (clickedevent) {},              // Callback fired when an event is selected     - see $(this).data('event')
      onEventCreate: function( $el ) {},          // Callback fired when an HTML event is created - see $(this).data('event')
      onEventDelete: function ($el) {},           // Callback fired when an event is deleted
      onDayCreate:   function( $el, d, m, y ) {}  // Callback fired when an HTML day is created   - see $(this).data('today'), .data('todayEvents')
    };

  // The actual plugin constructor
  function Plugin(element, options) {
    this.element = element;
    // Merge defaults and options, without modifying defaults
    this.settings = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.currentDate = new Date();

    this.init();
  }

  // Avoid Plugin.prototype conflicts
  $.extend(Plugin.prototype, {
    init: function () {
      var container = $(this.element);
      var todayDate = this.currentDate;

      var calendar = $('<div class="calendar"></div>');
          var header = $('<header>' +
          '<div class="changer" style="justify-content: center;text-align: center;width: 50%;">'+
         '<i class="fas fa-chevron-left"></i>' +
         '<h2 class="month"></h2>' +
         '<i class="fas fa-chevron-right"></i>' +
         '</div>'+
         '<div class="adder" style="font-size: 20px; float: right;justify-content: right;margin-left: 58%;"></div>'+
          '</header>');
          //footer += + ('<i class="las la-trash"></i><i class="las la-calendar"></i><i class="las la-calendar-plus"></i>');

          //var footer = $('<footer>' + '<span id="eventContainer" class="event-Container"></span>'  + '</footer>');
      this.updateHeader(todayDate, header);
      calendar.append(header);

      this.buildCalendar(todayDate, calendar);
          container.append(calendar);
          //container.append(footer);
      this.bindEvents();
      this.settings.onInit(this);
      document.querySelector(".today").click();

    },

    //Update the current month header
    updateHeader: function (date, header) {
      var monthText = this.settings.months[date.getMonth()];
      monthText += this.settings.displayYear ? ' ' + date.getFullYear() : '';
      console.log("monthtext", monthText);
      header.find('.month').text(monthText);
    },

    //Build calendar of a month from date
    buildCalendar: function (fromDate, calendar) {
      var plugin = this;

      calendar.find('table').remove();

      var body = $('<table></table>');
      var thead = $('<thead></thead>');
      var tbody = $('<tbody style="position: relative; font-size: 0.8em; height: 21em;"></tbody>');

      //setting current year and month
      var y = fromDate.getFullYear(), m = fromDate.getMonth();

      //first day of the month
      var firstDay = new Date(y, m, 1);
      //last day of the month
      var lastDay = new Date(y, m + 1, 0);
      // Start day of weeks
      var startDayOfWeek = firstDay.getDay();

      if (this.settings.fixedStartDay !== false) {
        // Backward compatibility
        startDayOfWeek =  this.settings.fixedStartDay ? 1 : this.settings.fixedStartDay;

        // If first day of month is different from startDayOfWeek
        while (firstDay.getDay() !== startDayOfWeek) {
          firstDay.setDate(firstDay.getDate() - 1);
        }
        // If last day of month is different from startDayOfWeek + 7
        while (lastDay.getDay() !== ((startDayOfWeek + 7) % 7)) {
          lastDay.setDate(lastDay.getDate() + 1);
        }
        }
        var range = parseInt((lastDay - firstDay) / (1000 * 3600 * 24));
        // Ensure there are enough days in the range to show 6 weeks
        if (range < 42) {
            lastDay.setDate(lastDay.getDate() + 7);
        }

      //Header day in a week ( (x to x + 7) % 7 to start the week by monday if x = 1)
      for (var i = startDayOfWeek; i < startDayOfWeek + 7; i++) {
        thead.append($('<td>' + this.settings.days[i % 7].substring(0, 1) + '</td>'));
      }

      //For firstDay to lastDay
      var weeksShown = 0;
      for (var day = firstDay; day <= lastDay; day.setDate(day.getDate())) {
        var tr = $('<tr></tr>');
        //For each row
        for (var i = 0; i < 7; i++) {
          var idday = day.getFullYear() + " " + day.getMonth() + " " + day.getDate();
          var td = $('<td><div class="day" id="' + idday + '" data-date="' + day.toISOString() + '">' + day.getDate() + '</div></td>');

          var $day = td.find('.day');

          //if today is this day
          if (day.toDateString() === (new Date).toDateString()) {
            $day.addClass("today");
          }

          //if day is not in this month
          if (day.getMonth() != fromDate.getMonth()) {
            $day.addClass("wrong-month");
          }

          // filter today's events
          var todayEvents = plugin.getDateEvents(day);

          if (todayEvents.length && plugin.settings.displayEvent) {
            $day.addClass(plugin.settings.disableEventDetails ? "has-event disabled" : "has-event");
          } else {
            $day.addClass(plugin.settings.disableEmptyDetails ? "disabled" : "");
          }

          // associate some data available from the onDayCreate callback
          $day.data( 'todayEvents', todayEvents );

          // simplify further customization
          this.settings.onDayCreate( $day, day.getDate(), m, y );

          tr.append(td);
          day.setDate(day.getDate() + 1);
        }
        tbody.append(tr);
        weeksShown++;
        // Ensure that at most 6 weeks are shown
        if (weeksShown >= 6) {
          break;
        }
      }

      body.append(thead);
      body.append(tbody);

      //var eventContainer = $('<div class="event-container"><div class="event-wrapper"></div></div>');

      calendar.append(body);
      //calendar.append(eventContainer);
    },
    changeMonth: function (value) {
      this.currentDate.setMonth(this.currentDate.getMonth() + value, 1);
      this.buildCalendar(this.currentDate, $(this.element).find('.calendar'));
      this.updateHeader(this.currentDate, $(this.element).find('.calendar header'));
      this.settings.onMonthChange(this.currentDate, this.currentDate.getFullYear(), value, this)
    },
    eventclicked: function(wasclicked) {
      var plugin = this;
      $("#" + wasclicked).on('click', function ( e ) {
        var clickedevent = $(this).data('event');
        plugin.settings.onEventSelect(clickedevent);
      });
    },
    //Init global events listeners
    bindEvents: function () {
      var plugin = this;

      //Click previous month
      $(plugin.element).on('click', '.fa-chevron-left', function ( e ) {
        plugin.changeMonth(-1)
        e.preventDefault();
      });

      //Click next month
      $(plugin.element).on('click', '.fa-chevron-right', function ( e ) {
        plugin.changeMonth(1);
        e.preventDefault();
      });

      

      //Binding day event
      //add border to selected date unless today
      //change variables and load into form as preset selections when create event is clicked
        $(plugin.element).on('click', '.day', function (e) {
        var count = 0;
        console.log('event click +++');
        $(".event-body").empty();
        var date = new Date($(this).data('date'));
        console.log("the date", date);
        var clickedday = this.id;
        console.log("clickedday", clickedday);
        var events = plugin.getDateEvents(date);
        var days = document.getElementsByClassName('day-border')
        var selectedday;
        var ul = document.getElementById("container");
        var li = ul.getElementsByClassName("day");
        for (i = 0; i < li.length; i++) {
          var a = li[i].classList.contains('day-border');
          if (a === true)
          {
            li[i].classList.remove('day-border');
          }
          else
          {

          }
        }

        selectedday = $(this).data( "date" );
        var borderday = $("div").find(`[data-date='${selectedday}']`)[0];
        $(borderday).addClass('day-border');

        //selectedday = $(this).innerhtml
                //document.getElementById("eventContainer").innerHTML = "No events";
        if ($(this).hasClass('today'))
        {
          var startday = new Date(new Date(date).setHours(new Date().getHours() + 1,0,0));
          var endday = new Date(new Date(date).setHours(new Date().getHours() + 2,0,0));
          var sday = ("0" + startday.getDate()).slice(-2);
          var smonth = ("0" + (startday.getMonth() + 1)).slice(-2);
          var eday = ("0" + endday.getDate()).slice(-2);
          var emonth = ("0" + (endday.getMonth() + 1)).slice(-2);
          var autosday = startday.getFullYear()+"-"+(smonth)+"-"+(sday);
          var autoeday = endday.getFullYear()+"-"+(emonth)+"-"+(eday);
          var shour=startday.getHours();
          var smin=startday.getMinutes();
          //var sampm = shour >= 12 ? 'pm' : 'am';
          if (shour < 10)
          {
            shour = '0'+shour
          }
          if (smin < 10)
          {
            smin = '0'+smin
          }
          var startTime = shour + ':' + smin;
          /*shour = shour % 12;
          shour = shour ? shour : 12; // the hour '0' should be '12'
          smin = smin < 10 ? '0'+smin : smin;
          var startTime = shour + ':' + smin + ' ' + sampm;
          */
          var ehour= endday.getHours();
          var emin= endday.getMinutes();
          if (ehour < 10)
          {
            ehour = '0'+ehour
          }
          if (emin < 10)
          {
            emin = '0'+emin
          }
          //var eampm= ehour >= 12 ? 'pm' : 'am';
    
          var endTime = ehour + ':' + emin;
          
          /*ehour = ehour % 12;
          ehour = ehour ? ehour : 12; // the hour '0' should be '12'
          emin = emin < 10 ? '0'+emin : emin;
          var endTime = ehour + ':' + emin + ' ' + eampm;
          */
          $("#id_start_time").val(startTime);
          $("#id_start_day").val(autosday);
          $("#id_end_time").val(endTime);
          $("#id_end_day").val(autoeday);
        }
        else{
          var startday = new Date(new Date(date).setHours(8,0,0));
          var endday = new Date(new Date(date).setHours(9,0,0));
          var sday = ("0" + startday.getDate()).slice(-2);
          var smonth = ("0" + (startday.getMonth() + 1)).slice(-2);
          var eday = ("0" + endday.getDate()).slice(-2);
          var emonth = ("0" + (endday.getMonth() + 1)).slice(-2);
          var autosday = startday.getFullYear()+"-"+(smonth)+"-"+(sday);
          var autoeday = endday.getFullYear()+"-"+(emonth)+"-"+(eday);
          var shour=startday.getHours();
          var smin=startday.getMinutes();
          //var sampm = shour >= 12 ? 'pm' : 'am';
          if (shour < 10)
          {
            shour = '0'+shour
          }
          if (smin < 10)
          {
            smin = '0'+smin
          }
          var startTime = shour + ':' + smin;
          /*shour = shour % 12;
          shour = shour ? shour : 12; // the hour '0' should be '12'
          smin = smin < 10 ? '0'+smin : smin;
          var startTime = shour + ':' + smin + ' ' + sampm;
          */
          var ehour= endday.getHours();
          var emin= endday.getMinutes();
          if (ehour < 10)
          {
            ehour = '0'+ehour
          }
          if (emin < 10)
          {
            emin = '0'+emin
          }
          //var eampm= ehour >= 12 ? 'pm' : 'am';
    
          var endTime = ehour + ':' + emin;
          
          /*ehour = ehour % 12;
          ehour = ehour ? ehour : 12; // the hour '0' should be '12'
          emin = emin < 10 ? '0'+emin : emin;
          var endTime = ehour + ':' + emin + ' ' + eampm;
          */
          $("#id_start_time").val(startTime);
          $("#id_start_day").val(autosday);
          $("#id_end_time").val(endTime);
          $("#id_end_day").val(autoeday);
        }
        if (!$(this).hasClass('disabled')) {
            // plugin.fillUp(e.pageX, e.pageY);
            // plugin.displayEvents(events);
            $(".show-events").css('color', '#015D67');
            $(".show-events").css('cursor', 'pointer');
            $(".show-calendar").css('color', '#015D67');
            $(".show-calendar").css('cursor', 'pointer');
            
            var status = null;
            var today = new Date().toJSON().slice(0, 10);
            var chosenday = new Date(date).toJSON().slice(0, 10);
            //if date is before today
            if (chosenday < today)
            {
              status = -1;
            }
            
            //if date is today
            else if (chosenday == today) {
              status = 0;
            }
            //if date is after today
            else {
              status = 1;
            }

            plugin.displayEventTexts(events, status, today);
            

        }
        else 
        {
          $(".show-events").css('color', '#015D67');
          $(".show-events").css('cursor', 'pointer');
          $(".show-calendar").css('color', '#015D67');
          $(".show-calendar").css('cursor', 'pointer');
        }
        
        //call eventStatus after every minute to check the status of event
        //Is it possible to only do it if event container is shown and quit when not to cut back on processing time?
        /*if (intervalID != null)
          {
            clearInterval(intervalID);
            // release our intervalID from the variable
            intervalID = null; 
          }
        */
       // intervalID = setInterval(plugin.eventStatus, 60000, events);

        plugin.settings.onDateSelect(date, events, clickedday, plugin);
      });

      //Binding event container close
      $(plugin.element).on('click', '.event-container .close', function (e) {
        plugin.empty(e.pageX, e.pageY);
      });
      },
      displayEventTexts: function (events, status) {
        var count = 0;
          var circle = 1;
          var line = 1;
          var plugin = this;
          //var container = $(this.element).find('.eventContainer');
          var container = $(".event-body");
          var today = new Date();
          var intervalID = null;

          function formatAMPM(date) {
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0'+minutes : minutes;
            var strTime = hours + ':' + minutes + ' ' + ampm;
            return strTime;
          }
          events.forEach(function (event) {
              var startDate = new Date(event.startDate);
              var endDate = new Date(event.endDate);
              //var eventId = event.eventID; //id for each event
              var eventId = event.eventid; //id for each event

              if (!event.allDay)
              {
                if(line > 1)
                {
                  var prevline = line-1;
                  var eventline = document.getElementById("line-" + prevline);
                  $(eventline).show();
                }
              var $event = `<div style="margin-left: 20px;"><div style="display: inline-flex;width: 100%;margin-top: -4px;" ><div class="event-circle" id="circle-${circle}"></div><div class="event-list" data-event="${eventId}" id="edit-${eventId}">`+`<div class="event-in-list" data-eventtext="${eventId}">` + formatAMPM(startDate) + ' - ' + formatAMPM(endDate) + ': ' + event.title +`</div>`+ ` <div data-eventdescription="${eventId}" class="event-description" style="word-wrap: break-word; display: none;">` + event.summary + `</div></div></div><div class="event-line" id="line-${line}"></div></div>`;
              }
              else{
              var $event = `<div style="margin-left: 20px;"><div style="display: inline-flex;width: 100%;margin-top: -4px;"><div class="event-circle" id="circle-${circle}"></div><div class="event-list" data-event="${eventId}" id="edit-${eventId}">`+`<div class="event-in-list" data-eventtext="${eventId}">`+  event.title +`</div>`+ ` <div data-eventdescription="${eventId}" class="event-description" style="word-wrap: break-word; display: none;">` + event.summary + `</div></div></div><div class="event-line" id="line-${line}"></div></div>`;
              }
              // $event.data('event', event);
              console.log('event data +++', $event);
              //document.getElementsByClassName("event-wrapper").innerHTML = JSON.stringify($event);
             



              // $event.click(plugin.settings.onEventSelect);

              // simplify further customization
              // plugin.settings.onEventCreate($event);

              container.append($event);
              plugin.eventclicked(`edit-${eventId}`);
              /*if (status == -1)
              {
                var thisCircle = circle;
                var thisLine = line;
                var circleid = "circle-"+thisCircle;
                var lineid = "line-"+thisLine;
                var eventcircle = document.getElementById(circleid);
                var eventline = document.getElementById(lineid);
                $(eventline).addClass("expired-line");
                $(eventcircle).addClass("expired-circle");
              }*/
              /*if (event.allDay && status == 0)
              {
                var thisCircle = circle;
                var thisLine = line;
                var circleid = "circle-"+thisCircle;
                var lineid = "line-"+thisLine;
                var eventcircle = document.getElementById(circleid);
                var eventline = document.getElementById(lineid);
                $(eventcircle).addClass("active-circle");
                $(`#edit-${eventId}`).css("font-weight","Bold");
              }*/
              if (startDate <= today && endDate >= today)
              {
                var thisCircle = circle;
                var thisLine = line-1;
                var circleid = "circle-"+thisCircle;
                var lineid = "line-"+thisLine;
                var eventcircle = document.getElementById(circleid);
                var eventline = document.getElementById(lineid);
                $(eventcircle).addClass("active-circle");
                if (circle >= 2) 
                {
                  thisCircle = circle-1;
                  circleid = "circle-"+thisCircle;
                  eventcircle = document.getElementById(circleid);
                  if ($(eventcircle).hasClass("active-circle"))
                  {
                  $(eventline).addClass("active-line");
                  }
                  else{
                    $(eventline).addClass("expired-line");
                  }
                }
                $(`#edit-${eventId}`).css("font-weight","Bold");
              }
              if (endDate < today)
              {
                var thisCircle = circle;
                var thisLine = line-1;
                var circleid = "circle-"+thisCircle;
                var lineid = "line-"+thisLine;
                var eventcircle = document.getElementById(circleid);
                var eventline = document.getElementById(lineid);
                $(eventcircle).addClass("expired-circle");
                if (circle >= 2) 
                {
                  thisCircle = circle-1;
                  circleid = "circle-"+thisCircle;
                  eventcircle = document.getElementById(circleid);
                  if ($(eventcircle).hasClass("active-circle"))
                  {
                  $(eventline).addClass("active-line");
                  }
                  else{
                    $(eventline).addClass("expired-line");
                  }
                }
                $(`#edit-${eventId}`).css("font-weight","Normal");
              }

              circle++;
              line++;
          })

      },
    eventStatus: function (events) {
      var circle = 1;
      var line = 1;
      var newtoday = new Date();
      /*
      var status = null;
      var today = new Date().toJSON().slice(0, 10);
      var chosenday = new Date(date).toJSON().slice(0, 10);
      
      //if date is before today
      if (chosenday < today)
      {
        status = -1;
      }
      
      //if date is today
      else if (chosenday == today) {
        status = 0;
      }
      //if date is after today
      else {
        status = 1;
      }
      */
      events.forEach(function (event) {
        var startDate = new Date(event.startDate);
        var endDate = new Date(event.endDate);
        /*
every thirty seconds 
check the event start time
check the current time
subtract the event start time from the current time and store it in array
if the event will become active within the next 30 seconds (if 30 added to current time will be equal or greater than start time but less than endtime of event)
store event id in array for active events;
if the event will expire within the next 30 seconds (if 30 added to current time will be equal or greater than end time )
store event id in array for expired events;
end looping of events
wait for the stored amount of time from earlier (maybe settimeout)
then change class on the events in the array
*/
        /*if (status == -1)
        {
          var thisCircle = circle;
          var thisLine = line;
          var circleid = "circle-"+thisCircle;
          var lineid = "line-"+thisLine;
          var eventcircle = document.getElementById(circleid);
          var eventline = document.getElementById(lineid);
          $(eventline).addClass("expired-line");
          $(eventcircle).addClass("expired-circle");
        }
        if (event.allDay && status == 0)
        {
          var thisCircle = circle;
          var thisLine = line;
          var circleid = "circle-"+thisCircle;
          var lineid = "line-"+thisLine;
          var eventcircle = document.getElementById(circleid);
          var eventline = document.getElementById(lineid);
          $(eventcircle).addClass("active-circle");
          $(`#edit-${eventId}`).css("font-weight","Bold");
        }*/
        if (startDate <= newtoday && endDate >= newtoday)
        {
          var thisCircle = circle;
          var thisLine = line-1;
          var circleid = "circle-"+thisCircle;
          var lineid = "line-"+thisLine;
          var eventcircle = document.getElementById(circleid);
          var eventline = document.getElementById(lineid);
          $(eventcircle).addClass("active-circle");
          if (circle >= 2) 
          {
            thisCircle = circle-1;
            circleid = "circle-"+thisCircle;
            eventcircle = document.getElementById(circleid);
            if ($(eventcircle).hasClass("active-circle"))
            {
            $(eventline).addClass("active-line");
            }
            else{
              $(eventline).addClass("expired-line");
            }
          }
          $(`#edit-${eventId}`).css("font-weight","Bold");
        }
        if (endDate < newtoday)
        {
          var thisCircle = circle;
          var thisLine = line-1;
          var circleid = "circle-"+thisCircle;
          var lineid = "line-"+thisLine;
          var eventcircle = document.getElementById(circleid);
          var eventline = document.getElementById(lineid);
          $(eventcircle).addClass("expired-circle");
          if (circle >= 2) 
          {
            thisCircle = circle-1;
            circleid = "circle-"+thisCircle;
            eventcircle = document.getElementById(circleid);
            if ($(eventcircle).hasClass("active-circle"))
            {
            $(eventline).addClass("active-line");
            }
            else{
              $(eventline).addClass("expired-line");
            }
          }
          $(`#edit-${eventId}`).css("font-weight","Normal");
        }

        circle++;
        line++;


      })
    },
    displayEvents: function (events) {
      var plugin = this;
      var container = $(this.element).find('.event-wrapper');
                  var count = 0;


      events.forEach(function (event) {
        var startDate = new Date(event.startDate);
        var endDate = new Date(event.endDate);
        var $event = $('' +
          '<div class="event">' +
          ' <div class="event-hour">' + startDate.getHours() + ':' + (startDate.getMinutes() < 10 ? '0' : '') + startDate.getMinutes() + '</div>' +
          ' <div class="event-date">' + plugin.formatDateEvent(startDate, endDate) + '</div>' +
          ' <div class="event-summary">' + event.title + '</div>' +
          ' <div class="event-description">' + event.summary + '</div>' +
          '</div>');

        $event.data( 'event', event );
        $event.click( plugin.settings.onEventSelect );

        // simplify further customization
        plugin.settings.onEventCreate( $event );

        container.append($event);
      })
      },
    getDateEvents: function (d) {
      var plugin = this;
      return plugin.settings.events.filter(function (event) {
        return plugin.isDayBetween(d, new Date(event.startDate), new Date(event.endDate));
      });
      },

    isDayBetween: function (d, dStart, dEnd) {
      dStart.setHours(0,0,0);
      dEnd.setHours(23,59,59,999);
      d.setHours(12,0,0);
      //console.log("dstart",dStart);
      //console.log("dend",dEnd);
      //console.log("d",d);
      var returnvalue = dStart <= d && d <= dEnd
      //console.log("return",returnvalue);

      //for repeating events do an if statement for the categories
      return dStart <= d && d <= dEnd;
    },
    formatDateEvent: function (dateStart, dateEnd) {
      var formatted = '';
      formatted += this.settings.days[dateStart.getDay()] + ' - ' + dateStart.getDate() + ' ' + this.settings.months[dateStart.getMonth()].substring(0, 3);

      if (dateEnd.getDate() !== dateStart.getDate()) {
        formatted += ' to ' + dateEnd.getDate() + ' ' + this.settings.months[dateEnd.getMonth()].substring(0, 3)
      }
      return formatted;
    }
  });

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[pluginName] = function (options) {
    return this.each(function () {
      if (!$.data(this, "plugin_" + pluginName)) {
        $.data(this, "plugin_" + pluginName, new Plugin(this, options));
      }
    });
  };

}

