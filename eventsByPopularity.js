var _ = require('underscore');
var request = require('request');

var query = {
	"key":'YOUR MEETUP API KEY',
	"radius":10,
	"zip":94121,
	"time":",1w" // The time range is unbounded on the left but status defaults to "upcoming"
}

request({url:'https://api.meetup.com/2/open_events', qs:query}, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        
         var results = JSON.parse(body).results;

         var projectFields = _.map(results, function(evt){
         	 return {
         	 	name: evt.name, 
         	 	group: evt.group.name,
         	 	date: new Date(evt.time),
         	 	url: evt.event_url,
         	 	rsvp:evt.yes_rsvp_count

			 };
         });

         console.log(_.sortBy(projectFields,'rsvp').reverse());
    }
});