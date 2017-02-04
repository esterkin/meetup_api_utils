var results = (function getEvents(){

var items = document.querySelectorAll(".row.event-listing");
var results = [];
for(var i = 0; i < items.length;i++){
	var event = items[i];
	var attendeeCount = event.getElementsByClassName("attendee-count")[0] ? event.getElementsByClassName("attendee-count")[0].innerHTML.split("\n")[1]:"";
	var eventName = event.querySelectorAll("span[itemprop='name']")[1].innerHTML;
	var groupName = event.querySelectorAll("span[itemprop='name']")[0].innerHTML;
	var date = event.querySelectorAll("time[itemprop='startDate']")[0].getAttribute("datetime");
	
	var resultEvent = {};
	resultEvent.name = eventName;
	resultEvent.group = groupName;
	resultEvent.attendees = parseInt(attendeeCount);
	resultEvent.date = new Date(date);
	results.push(resultEvent);
}


return JSON.stringify(_.sortBy(results,"attendees").reverse());

})();