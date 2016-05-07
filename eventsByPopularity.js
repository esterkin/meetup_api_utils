var _ = require('underscore');
var request = require('request');

var query = {
    "key": 'YOUR MEETUP API KEY',
    "radius": 25,
    "zip": 94111,
    "time": ',2d', // The time range is unbounded on the left but status defaults to "upcoming"
}

url = 'https://api.meetup.com/2/open_events';

var projectFields = [];
var requestParams = {
    url: url,
    qs: query
}

function getEventData() {

    request(requestParams, function(error, response, body) {

        if (!error && response.statusCode == 200) {

            var jsonBody = JSON.parse(body);
            var meta = jsonBody.meta;
            var results = jsonBody.results;

            projectFields = projectFields.concat(_.map(results, function(evt) {

                return {
                    name: evt.name,
                    group: evt.group.name,
                    date: new Date(evt.time),
                    url: evt.event_url,
                    rsvp: evt.yes_rsvp_count

                };
            }));

            if (meta.next != "") {
                // recursively get the next page of data
                requestParams = meta.next;
                getEventData();
            } else {
                console.log(_.sortBy(projectFields, 'rsvp').reverse());
            }

        }
    });
}

getEventData();