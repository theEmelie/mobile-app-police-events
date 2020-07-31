import m from "mithril";
import stations from "../models/stations.js";

var police = {
    oninit: stations.getStations,
    view: function () {
        return [
            m("nav.top-nav", "Polisstationer i Sverige"),
            m("div", stations.station.map(function(policeStation) {
                return m("div.policeStations", [
                    m("a.stationName", {href: "/police/" +
                        policeStation.id, oncreate: m.route.link}, policeStation.name),
                ]);
            }))
        ];
    }
};

export default police;
