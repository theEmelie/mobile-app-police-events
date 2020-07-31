import m from "mithril";
import L from "leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";

import "leaflet/dist/leaflet.css";
import "leaflet/dist/images/marker-icon-2x.png";
import "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/images/marker-shadow.png";

import stations from "../models/stations.js";
import position from "../models/position.js";

var map;

function showPosition() {
    var locationMarker = L.icon({
        iconUrl: 'location.png',

        iconSize:     [24, 24],
        iconAnchor:   [12, 12],
        popupAnchor:  [0, 0]
    });

    if (position.currentPosition.latitude && position.currentPosition.longitude) {
        L.marker(
            [position.currentPosition.latitude, position.currentPosition.longitude],
            {icon: locationMarker}
        ).addTo(map).bindPopup("Din plats");
    }
}

function showMap() {
    new OpenStreetMapProvider();
}

function renderMarker(gps) {
    var latLong = gps.split(",");
    var pos1 = L.latLng(latLong[0], latLong[1]);

    if (position.currentPosition.latitude && position.currentPosition.longitude) {
        var pos2 = L.latLng(position.currentPosition.latitude,
            position.currentPosition.longitude);
        var bounds = L.latLngBounds(pos1, pos2);

        // if (map) {
        //     map.remove();
        // }

        map = L.map("map").fitBounds(bounds);
        showPosition();
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: `&copy;
            <a href="https://www.openstreetmap.org/copyright">
            OpenStreetMap</a> contributors`
        }).addTo(map);
        L.marker(pos1).addTo(map);
    }
}

var policeStation = {
    oninit: function (vnode) {
        // console.log(vnode.attrs.id);
        stations.getCurrentStation(vnode.attrs.id);
        position.getPosition();
    },
    oncreate: showMap,
    onremove: function () {
        stations.currentStation = [];
        stations.validStation = false;
    },
    view: function () {
        // console.log(stations.currentStation);
        var stationDiv;
        var nameDiv;

        if (stations.validStation === true) {
            var thisStation = stations.currentStation;

            nameDiv = m("h3", thisStation.name);

            renderMarker(thisStation.location.gps);
            stationDiv = m("div.station",
                m("ul", m("span.bold", "Adress: "), m("li", thisStation.location.name)),
                m("ul",  m("span.bold", "Tjänster: "), thisStation.services.map(function(service) {
                    console.log(service.name);
                    return m("li", service.name);
                })),
                m("ul",  m("li.bold", "Hemsida: "),
                    m("a.urls", {href: thisStation.Url}, thisStation.Url))
            );
        }
        return [
            m("nav.top-nav",
                m("a", {href: "/police/", oncreate: m.route.link},
                    m("i.material-icons", "arrow_back"),
                    m("span.backB", "TILLBAKA")),
                m("span.policeP", "Polisstation")
            ),
            m("div.stationDetails",
                m("div", nameDiv),
                m("div.#map.map", ""),
                stationDiv,
            )
        ];
    }
};

export default policeStation;
