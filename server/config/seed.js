/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

/*var Thing = require('../api/thing/thing.model');


Thing.find({}).remove(function() {
  Thing.create({
    name : 'Development Tools',
    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name : 'Server and Client integration',
    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name : 'Smart Build System',
    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
    name : 'Modular Structure',
    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
    name : 'Optimized Build',
    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
    name : 'Deployment Ready',
    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  });
});*/

var Story = require('../api/story/story.model');

Story.find({}).remove(function() {
    Story.create({
        date: new Date(2014, 6, 21),
        content: 'Na dworzec autobusowy dotarłem koło 6:30, czyli jakieś 30 min. przed czasem, tak na wszelki wypadek, ale Janas już tam był od pół godziny. Podróż autokarem była dla mnie dość męcząca bo nie jestem w stanie zasnąć na siedząco, a całą noc nie spałem. W Katowicach do autokaru wsiadła pani z około dziesięcioletnim chłopczykiem i siedli przed nami. Pani mówiła do niego na zmianę po polsku i po angielsku. Niezły patent, moim zdaniem. \n\nWyciągnąłem laptopa i zacząłem oglądać drugą część Hobbita. Janas powiedział, że nie będzie trzeciej części ze względu na to, że rodzina Tolkiena była niezadowolona z ekranizacji drugiej części i zabrali im prawa. Sprawdziłem to w internecie - Janas kłamał. Po jakimś czasie strasznie zachciało mi się spać, więc w połowie filmu wyłączyłem go i trochę się zdrzemnąłem, choć co 15 minut się budziłem.\n\nGdy autokar dotarł pod Berlin, pierwszym widokiem po zjechaniu z autostrady była grupka (stadko?) cyganów z takimi wycieraczkami do szyb którzy myli samochody, gdy te stały na czerwonym świetle. Naszego autokaru nie umyli, bo mieli chyba za wysoko. Mimo wszystko byli bardzo weseli, może coś brali? Jadąc dalej widziałem jak na następnych światłach na przejście dla pieszych wyjechał na monocyklu błazen i żonglował kręglami.\n\nMinęliśmy też jakiś olbrzymi, dziwny betonowy pomnik, który trochę przypominał architekturę z Mordoru. Za nami siedziało dwóch Niemców. Jeden powiedział "ooo hmmm Denkmal". Jego znajomy zgodził się z nim.\n\nGdy wysiedliśmy z autokaru, musieliśmy przejść na peron 11 głównego berlińskiego dworca. Nic ciekawego się po drodze nie zdarzyło. Na peronie okazało się, że pociąg opóźnił się o 5 minut. Janas powiedział, żeby spytać się obsługi czy na pewno mamy bilet na dobry pociąg, bo na tablicy informacyjnej był inny numer niż na bilecie, mimo że pociąg był tej samej linii. Spytałem się, i babka powiedziała, że tak.\n\nW pociągu nie było numerowanych miejsc, więc bardziej przypominał on duży, piętrowy tramwaj. Miejsce siedzące znaleźliśmy dopiero na piętrze, musieliśmy przedtem wspindrać się po barzdo wąskich schodkach. Tutaj może warto zaznaczyć, że moja walizka ważyła około 40kg bo spakowałem troche za dużo itemków. Oprócz tego miałem plecak oraz torbę z laptopem. W tym momencie zaczynałem tego żałować. Usiedliśmy obok pary chińczyków, nasze walizki prawie blokowały przejście. Naprzeciw nas siedział koleś który wyglądał jak bardzo duży Jakub Jurczyk. Trzymał na smyczy szczeniaczka (spaniel), który bał się walizki Janasa. Na szczęście ten fragment podróży trwał tylko około godziny. Chińczycy (chłopak i dziewczyna) zajmowali się graniem w jakąś grę na smartfonie (chyba tenis) i co chwilę wydawali taki dzwięk jakby wciąganego powietrza, takie zdziwienie, gdy miała miejsce jakaś niewiarygodna w ich przekonaniu zwagrywka.\n\nPo wysiadce czekał nas ostatni fragment podróży, czyli podmiejski pociąg (zaledwie dwa przystanki). Musieliśmy się najpierw przemieścić z peronu 1 na peron 2. Niestety okazało się, że jedyną opcją są mega-schody które pełniły niejako funkcję wiaduktu nad torami. Było ich około 10x5 w górę i tyle samo w dół ({image1}). Tutaj już bardzo pożałowałem swojego spakowania się, no ale nie było wyjścia więc musiałem wchodzić. Po wyjściu na górę byłem już mokry jak Płazak, a jeszcze trzeba było to staszczyć w dół. Myślałem, żeby po prostu puścić walizkę w dół, ale byli ludzie więc nie wypadało robić wiochy. Poza tym miałem spakowaną tę szklaną podkładkę pod myszkę, więc bałem się, że się stłucze. W połowie drogi w dół, jakaś kobieta spytała się mnie, czy nie potrzebuje pomocy, ale postanowiłem zachować honor i powiedziałem, że nie. Po zejściu na dół, Janas zaczął się ze mnie śmiać, ale chuj mu w dupę bo jego bagaż był dwa razy lżejszy. \n\nPodjechaliśmy dwa przystanki pociągiem (który był de facto tramwajem) i wysiedliśmy w Zeuthen. Żeby wyjść z dworca znowu trzeba było wyjśc po schodach, na szczęście było ich trochę mniej. Potem poszliśmy szukać tego całego DESY. Janas powiedział wcześniej, że wie jak tam dojść, bo czytał mapę, ale okazało się że gówno wie i poszliśmy w złą stronę, na szczęście szybko spytaliśmy o drogę jakąś babkę, więc nie musieliśmy dużo nadrabiać. Tutaj już byłem mocno wkurwiony bo było strasznie gorąco i duszno a walizka źle się ciągneła po bruku i musiałem co chwilę ją podnosić. W dodatku ta rączka za którą się ciągnie jest na takim sznurku, który jest za krótki przez co musiałem się cały czas trochę schylać i bolały mnie plecy. Szliśmy długą ulicą, a z naprzeciwka szedł jakiś dziad, Janas powiedział, żeby spytać się o drogę. No więc spytaliśmy się, ale on nie ogarniał o co nam chodzi, mimo że wyraźnie mówiliśmy "DESY". Janas powiedział "DESY Zeuthen" na co on odparł, że przecież jesteśmy w Zeuthen. Poddaliśmy się wtedy i on sobie poszedł, byłem już mocno zły i powiedziałem dość głośno i wściekle "co za pierdolony zgred przecież tu nic innego nie ma oprócz tego DESY", na szczęście on się nie zorientował. Na szczęście okazało się, że staliśmy dosłownie pod drogowskazem, który pokazywał na DESY, więc poszliśmy tam i po paru minutach byliśmy na miejscu. W tym momencie pot dosłownie lał mi się z czoła, przez tę zasraną walizkę no i upał.\n\nPrzy wejściu był szlaban i kanciapa (ale bardzo hi-tech) portiera, który nie mówił po angielsku, no ale ogarął, żeby dać nam klucze i kazał podpisać jakieś papierki z naszymi danymi. Gdy z nim gadałem, Janas co chwilę wtrącał się pojedyńczymi angielskimi słowami. Potem dał nam klucze, przy okazji zwracając się do Janasa per Mister James. Nasz budyneczek był zaraz obok portierni (zresztą okno w moim pokoju jest centralnie naprzeciw tego szlabanu) i gdy się do niego zbliżyliśmy, otwarło się na parterze okno i wyłoniła się z niego wątpliwej urody Chinka. Spytała się nas, czy też jesteśmy na stażu i czy tu mieszkamy, więc powiedzieliśmy, że tak i weszliśmy do środka. Ona wyszła wtedy ze swojego mieszkania, żeby się z nami przywitać. Przedstawiła się, ale nie byłem w stanie powtórzyć jej imienia. Janas powiedział, że nazywa się Krzysiek, i ona też nie była w stanie tego powtórzyć. Nasz apartament jest na pierwszym piętrze, więc zaczęliśmy wychodzić po schodach. Spytała się, czy nam pomóc, wtedy Janas dał jej swoją torbę z laptopem, więc ja też. Mogłem teraz oburącz chwycić walizkę, więc jak kurwa Herkules wytachałem ją na to piętro jak gdyby nigdy nic. Otwarliśmy drzwi do apartamentu i oczom naszym ukazał się bardzo przyjemny widok ({video1}). Pożegnaliśmy się z nową koleżanką i poszliśmy się rozpakowywać. Trochę mi to zajęło, bo tak jak mówie spakowałem mega dużo rzeczy. Przypadł mi większy pokój, ale za to z oknem od strony tej z której wali słońce i bez zasłon (tylko firanki). W moim pokoju znajduje się też małe łóżeczko dla dziecka. W łazience w szafce znaleźliśmy też nocnik.\n\nOd razu chciałem powsadzać przyniesione przez siebie żarcie do lodówki. Niestety z lodówki trochę waliło bo poprzedni goście ją zamknęli zamiast zostawić otwartą. Janas powiedział, że spoko i że on wyczyści, więc się za to zabrał, ale najpierw przyniósł do kuchni laptopa i puścił Metallicę. Chyba z dwie godziny w sumie zajęło mu rozmontowanie tych wszystkich plastikowych części z lodówki i dokładne ich umycie, w międzyczasie ja poszedłem jeszcze kończyć wypakowywanie się i organizację swoich itemków, chciałem też ogarnąć co z internetem, bo wifi coś nie działało. Zszedłem na dół spytać się Chinki, okazało się, że trzeba pójść gdzieś z laptoptem i podać swój adres MAC tak żeby oni mogli go dodać do sieci czy coś, bo inaczej nie zadziała. Przy okazji poznałem też kolejną koleżankę (tym razem z Anglii), również wątpliwej urody i dodatku gruba, natomiast bardzo poczciwa. W końcu Janas powiedział, że skończył z lodówką, i można wkładać do niej rzeczy. Faktycznie ładnie ją wyczyścił, tutaj po raz pierwszy byłem zadowolony z jego obecności.\n\nRobiło się już późno, więc postanowiliśmy pójść jeszcze do sklepu rozeznać jaki jest wybór i kupić jakieś podstawy. Po drodze chcieliśmy zobaczyć, czy jeszcze ktoś urzęduje tam, gdzie można ustawić internet, ale było zamknięte, więc poszliśmy do sklepu. Okazuje się, że supermarket "Kaiser\'s" jest bardzo blisko (jakieś 500m) i jest dość dobrze wyposażony. Kupiłem parę potrzebnych mi itemków. Janas uparł się, żeby kupić na spółkę wódkę, więc kupił jakąś niemiecką biedowódkę, bo była w śmiesznej butelce (ta butelka wyglądała jak jakieś naczynie laboratoryjne, miała bardzo długą szyjkę i takie obłe dno). Janas powiedział, że będzie na potem fajna butelka; niestety już następnego dnia przez pomyłkę wypieprzyłem ją do śmietnika po imprezie, bo Janas ją po sobie pozostawił.\n\nPonieważ nie było internetu, więc dokończyłem oglądać Hobbita (bez szału) po czym poszedłem spać bo było już po północy. Trochę chujowo mi się spało przez ten mega upał, mimo że otwarłem okno na oścież. I tak właśnie wyglądał mój pierwszy (zerowy?) dzień stażu.',
        media: {
            images: ['image0001.jpg'],
            videos: ['Video0000.mp4']
        }
    })
});