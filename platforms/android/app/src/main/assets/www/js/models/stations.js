import m from "mithril";

var stations = {
    baseURL: "https://polisen.se/api/policestations",

    station: [],
    getStations: function () {
        return m.request({
            url: stations.baseURL,
            method: "GET"
        }).then(function(result) {
            stations.station = result;
            //console.log(result);
        });
    },

    currentStation: [],
    validStation: false,
    getCurrentStation: function (id) {
        return m.request({
            url: stations.baseURL + "/" + id,
            method: "GET"
        }).then(function(result) {
            stations.currentStation = result;
            stations.validStation = true;
            //console.log(stations.currentStation);
        });
    }
};

export default stations;
