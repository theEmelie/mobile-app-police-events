/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
// "use strict";

import m from "mithril";

import layout from "./views/layout.js";
import login from "./views/login.js";
import menu from "./views/menu.js";
import home from "./views/home.js";
import register from "./views/register.js";
import about from "./views/about.js";
import police from "./views/police.js";
import allEvents from "./views/allEvents.js";
import policeStation from "./views/policeStation.js";

import auth from "./models/auth.js";

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function() {
        m.route(document.body, "/", {
            "/": {
                render: function () {
                    return m(layout, m(home), m(menu, {page: "Hem"}));
                }
            },
            "/login": {
                render: function () {
                    return m(layout, m(login), m(menu, {page: "Handelser"}));
                }
            },
            "/register": {
                render: function () {
                    return m(layout, m(register), m(menu, {page: "Handelser"}));
                }
            },
            "/police": {
                render: function () {
                    return m(layout, m(police),
                        m(menu, {page: "Polisstationer"}));
                }
            },
            "/police/:id": {
                render: function (vnode) {
                    return m(layout, m(policeStation, vnode.attrs),
                        m(menu, {page: "Polisstationer"}));
                }
            },
            "/about": {
                render: function () {
                    return m("div.slide-in", m(layout, m(about), m(menu, {page: "Om"})));
                }
            },
            "/allEvents": {
                render: function () {
                    if (auth.token) {
                        return m(layout, m(allEvents),
                            m(menu, {page: "Handelser"}));
                    }
                    return m.route.set("/login");
                }
            },
        });
    }
};

app.initialize();
