Specifikation
================
Min app handlar om att visa dom senaste händelserna från polisen. På första sidan kommer dom senaste händelserna visas och med både en karta, plats, tid och beskrivning. Sedan finns det en "Polisstationer" sida, där kommer jag först ha en lista på alla polisstationer och sedan om man trycker på en utav dom så visas en karta på alla polisstationen och användarens position. Sedan har jag en "Filtrering" sida där man först måste logga in/registrera sig och sedan kan filtrera alla händelser/brott på typ, och då visas endast händelser/brott av den typen. Och till sist finns det en "Om" sida som berättar om appens syfte, skaparen av appen och datakällorna.

Datakällor
================
Min första datakälla är https://oppnadata.se/datamangd/#esc_entry=996&esc_context=182, där visas polisens aktuella händelser.
Den andra datakällan är https://oppnadata.se/datamangd/#esc_entry=994&esc_context=182, där visas alla polisstationer i Sverige.

Jag har valt dessa för att jag tycker att det är intressant med vad som händer runt omkring oss, och då såg att det även finns API för polisstationer, och jag tycker att det verkade passande till det första API:t om händelserna.

Arkitektur
================
All kod görs med mithril. Och alla sidor/menyer har en egen vy, som sedan använder sig utav en modell där man hämtar data ifrån API:t och liknande. Sedan för att få en vy att fungera så måste dom läggas in i /js/index.js. Vill du att en sida ska ha autentisering så lägger du in det där också. Vill du lägga till en ny sida/meny gör du det i /views/menu.js. Layout filen i vyn läggs till i index på alla vyer, på så sätt inkluderar vi en main.container på ett enkelt sätt till alla sidor. All kod som du skriver ska vara under www/js/.
