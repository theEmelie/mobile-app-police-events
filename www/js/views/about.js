import m from "mithril";

var about = {
    view: function() {
        return [
            m("nav.top-nav", "Om Polis Händelser"),
            m("div", [
                m("h3", "Polis Händelser visar senaste händelserna hos polisen och " +
                "alla polisstationer i Sverige."),
                m("p", "Den här appen hämtar brott från polisen och visar polisstationer" +
                " runt om i Sverige. Platsen för varje händelse är skapad automatiskt och det" +
                " kan därför förekomma fel. För mer info hänvisar vi till polisen."),
                m("img", {src: "img/crimescene.jpg"}),
                m("h3", "Skaparen utav denna app är Emelie Åslund."),
                m("p", "Och detta är ett resultat av ett ett projekt i kursen webapp som " +
                "lärs ut på Blekinge Tekniska Högskola."),
                m("span.bold", "Datakällorna som använts är öppna för allmänheten: "),
                m("a.urls.redU", {href: "https://polisen.se/api/policestations"},
                    "https://polisen.se/api/policestations, "),
                m("a.urls.redU", {href: "https://polisen.se/api/events"},
                    "https://polisen.se/api/events"),
            ])
        ];
    }
};

export default about;
