import m from "mithril";

var auth = {
    baseURL: "https://auth.emilfolino.se/login",
    apiKey: "40af8425f603c3ecbab362566e5636ec",
    email: "",
    password: "",
    token: "",

    clear: function () {
        auth.email = "";
        auth.password = "";
    },

    login: function () {
        var payload = {
            email: auth.email,
            password: auth.password,
            api_key: auth.apiKey
        };

        return m.request({
            url: auth.baseURL,
            method: "POST",
            data: payload
        }).then(function(result) {
            auth.token = result.data.token;
            m.route.set("/allEvents");
        });
    },
    register: function () {
        var reg = {
            email: auth.email,
            password: auth.password,
            api_key: auth.apiKey
        };

        return m.request({
            url: "https://auth.emilfolino.se/register",
            method: "POST",
            data: reg
        }).then(function() {
            //console.log(result.data);
            m.route.set("/login");
        });
    }
};

export default auth;
