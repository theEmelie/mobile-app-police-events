import m from "mithril";
import events from "../models/events.js";

import L from "leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet/dist/images/marker-icon-2x.png";
import "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/images/marker-shadow.png";

var map = [];
var selectedEvent = "";

function renderMarker(gps, id) {
    var mapId = "map" + id;
    // console.log(id);
    var latLong = gps.split(",");
    var pos1 = L.latLng(latLong[0], latLong[1]);

    if (map[id]) {
        map[id].remove();
        delete map[id];
        // console.log("removing map " + id);
    }

    map[id] = L.map(mapId).setView(pos1, 11);
    // console.log(map);
    map[id].scrollWheelZoom.disable();
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: `&copy;
        <a href="https://www.openstreetmap.org/copyright">
        OpenStreetMap</a> contributors`
    }).addTo(map[id]);
    L.circle(pos1, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.1,
        radius: 1000
    }).addTo(map[id]);
}

function removeMaps() {
    map.forEach(function(mm) {
        mm.off();
        mm.remove();
    });
    map.length = 0;
}

function eventFilter(event) {
    return event.type.toLowerCase() === selectedEvent.toLowerCase();
}

function eventTypeDropdown() {
    var eventTypes = [ "Anträffad död", "Arbetsplatsolycka", "Djur", "Bråk", "Brand",
        "Inbrott, försök", "Misshandel", "Mord/dråp", "Olaga hot", "Olovlig körning",
        "Stöld", "Stöld/inbrott", "Rattfylleri", "Rån", "Rån väpnat", "Trafikolycka",
        "Trafikolycka, personskada", "Våldtäkt", "Våldtäkt, försök" ];

    var dropdown =  [
        m("select.input", {
            onchange: function (e) {
                selectedEvent = e.target.value;
                removeMaps();
            }},
        m("option", "Välj brott"),
        eventTypes.map(function(eType) {
            return m("option[value=" + eType + "]", eType);
        })),
    ];

    return dropdown;
}

var allEvents = {
    maxEvents: 25,
    oninit: function () {
        events.getEvents();
    },

    oncreate: function () {
        events.currentEvents.filter(eventFilter).slice(0, allEvents.maxEvents)
            .map(function(policeEvent) {
                renderMarker(policeEvent.location.gps, policeEvent.id);
            });
    },

    onremove: function () {
        removeMaps();
    },

    onupdate: function () {
        events.currentEvents.filter(eventFilter).slice(0, allEvents.maxEvents)
            .map(function(policeEvent) {
                renderMarker(policeEvent.location.gps, policeEvent.id);
            });
    },

    view: function () {
        var eventDiv = [
            m("nav.top-nav", "Filtrera brott"),
            eventTypeDropdown(),
            events.eventsValid == true ?
                m("div",  events.currentEvents.filter(eventFilter).length > 0
                    ? events.currentEvents.filter(eventFilter)
                        .slice(0, allEvents.maxEvents).map(function(policeEvent) {
                            var polEveDiv = m("div.policeEvent", [
                                m("div.#map" + policeEvent.id + ".map", ""),
                                m("h2.pType", policeEvent.type),
                                m("p",
                                    m("i.material-icons md-18 ", "location_on"),
                                    policeEvent.location.name),
                                m("p",
                                    m("i.material-icons md-18 ", "access_time"),
                                    policeEvent.datetime),
                                m("p", policeEvent.summary),
                            ]);

                            return polEveDiv;
                        }): (selectedEvent != "" && selectedEvent != "Välj brott")
                        ? m("p", "Inga brott av denna typ för tillfället.")
                        : m("p", "Välj ett brott från listan."))
                : m("img.spinner", {src: "img/Spinner-1s-200px.gif"})
        ];

        return eventDiv;
    }
};

export default allEvents;
