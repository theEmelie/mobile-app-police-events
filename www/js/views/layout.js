import m from "mithril";

var layout = {
    view: function (vnode) {
        return [
            m("main.container", vnode.children)
        ];
    }
};

export default layout;
