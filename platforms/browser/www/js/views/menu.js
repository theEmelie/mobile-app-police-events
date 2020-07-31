// "use strict";
import m from "mithril";

var menu = {
    view: function(vnode) {
        return m("main", [
            m("navbar", [
                m("div.container", [
                    m("div.bottom-nav", [
                        m(vnode.attrs.page == "Hem" ? "a.selectedB" : "a",
                            {href: "/", oncreate: m.route.link},
                            m("i.material-icons", "home"), "Senaste"),
                        m(vnode.attrs.page == "Polisstationer" ? "a.selectedB" : "a",
                            {href: "/police", oncreate: m.route.link},
                            m("i.material-icons", "language"), "Polisstationer"),
                        m(vnode.attrs.page == "Handelser" ? "a.selectedB" : "a",
                            {href: "/allEvents", oncreate: m.route.link},
                            m("i.material-icons", "place"), "Filtrering"),
                        m(vnode.attrs.page == "Om" ? "a.selectedB" : "a",
                            {href: "/about", oncreate: m.route.link},
                            m("i.material-icons", "info"), "Om"),
                    ])
                ])
            ]),
            m("section.container", vnode.children)
        ]);
    }
};

export default menu;
