// "use strict";

import m from "mithril";
import auth from "../models/auth.js";

var register = {
    view: function () {
        return [
            m("nav.top-nav", "Registrera en ny användare"),
            m("form", {
                onsubmit: function (event) {
                    event.preventDefault();
                    auth.register();
                }
            }, [
                m("label.input-label", "E-post"),
                m("input[type=email][placeholder=din@epost.se].input", {
                    oninput: function (e) {
                        auth.email = e.target.value;
                    }
                }),
                m("label.input-label", "Lösenord"),
                m("input[type=password].input", {
                    oninput: function (e) {
                        auth.password = e.target.value;
                    }
                }),
                m("input[type=submit][value=Registrera].button.full-width-button", "Registrera")
            ])
        ];
    }
};

export default register;
