import m from "mithril";

var events = {
    baseURL: "https://polisen.se/api/events",

    currentEvents: [],
    eventsValid: false,

    getEvents: function () {
        return m.request({
            url: events.baseURL,
            method: "GET"
        }).then(function(result) {
            events.currentEvents = result;
            events.eventsValid = true;
        });
    }
};

export default events;
