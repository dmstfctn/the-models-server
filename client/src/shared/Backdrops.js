const all = [
    {
      "id": 26,
      "description": "Ingresso al circo con struttura che sostiene la tabella con la scritta \"circo\". Appesi alla struttura anche uno stendardo col volto di un clown e un cartello con la scritta \"questa sera ore 21\"."
    },
    {
      "id": 44,
      "description": "Ingresso al circo con varco protetto da un tendaggio rosso."
    },
    {
      "id": 47,
      "description": "La scenografia rappresenta un'osteria. In una sala con colonne che reggono volte a crociera, si vedono un tavolo con sedie, una botte e una credenza. Attraverso un passaggio ad arco vi è l'accesso ad una scala per il piano superiore."
    },
    {
      "id": 59,
      "description": "L'arena del circo con tre ordini di stalli per gli spettatori."
    },
    {
      "id": 73,
      "description": "Vista di Piazza San Marco verso la laguna, con le colonne che reggono rispettivamente il leone di San Marco e la staua di San Giorgio e il drago. A sinistra si vede lo scorcio del Palazzo Ducale e a destra della Libreria Marciana. Al di là della laguna, l'isola di San Giorgio e la Giudecca."
    },
    {
      "id": 82,
      "description": "A destra si vede Palazzo Re Enzo e in fondo le due torri."
    },
    {
      "id": 87,
      "description": "Veduta di piazza Maggiore con Palazzo d'Accursio con l'orologio, il Palazzo de' Notai e la scalinata di San Petronio."
    },
    {
      "id": 91,
      "description": "Piazza su cui danno edifici dai muri rosa e ocra. Nel fondo porta di città con mura merlate e torre con orologio."
    },
    {
      "id": 66,
      "description": "Siamo al circo, c'é una grande faccia gioco, con occhi gialli e bocca aperta, circondata dalle fiamme."
    },
    {
      "id": 46,
      "description": "Stanza vista in prospettiva centrale dominata da un grande camino. Nel soffitto si vedono travi grezze, sotto l'intonaco si intravedono i mattoni."
    },
    {
      "id": 54,
      "description": "Stanza vista in prospettiva centrale, piuttosto spoglia, con camino, un tavolo e una sedia."
    },
    {
      "id": 64,
      "description": "Stanza con scala all'ingresso, arredata solo con un tavolo e una sedia."
    },
    {
      "id": 74,
      "description": "Raffigurazione di una stanza arredata con una cassapanca e un panchetto, su cui si trovano una brocca e un fiasco. Ad un chiodo nella parete è appeso un indumento blu. Nella parete di fondo la finestra ha un vetro rotto."
    },
    {
      "id": 98,
      "description": "Interno di cascina con bucato steso."
    },
    {
      "id": 99,
      "description": "Nella stanza si vedono un cassettone con specchio, un camino acceso e un dipinto col volto di Cristo."
    },
    {
      "id": 107,
      "description": "Cucina con camino e acquaio arredata con una madia, una rastrelliera per appendere suppellettili e una panca."
    },
    {
      "id": 19,
      "description": "Parte mediana della parete azzurro e verde chiaro. Zoccolo rosso mattone con rudimentale marmorizzazione. In alto fascia con festoni. A destra dell'apertura uno specchio rettangolare, a sinistra uno ovale."
    },
    {
      "id": 21,
      "description": "Cornicioni in varie tonalità di verde. Soffitto blu-indaco e pareti rosse."
    },
    {
      "id": 30,
      "description": "Sala con fuga di archi moreschi, sostenuti da colonne a tortiglione. Pareti dipinte con motivi floreali stilizzati e geometrici."
    },
    {
      "id": 34,
      "description": "Sala con tre finestroni ad arco protetti da tendaggi. Pavimento a rombi rossi e blu."
    },
    {
      "id": 39,
      "description": "Nella parete di fondo della sala, dipinta in azzurro, si aprono due porte schermate da tendaggi blu. Al centro della stessa parete, gli stalli dei consiglieri sono posti su una pedana."
    },
    {
      "id": 40,
      "description": "Stanza vista in prospettiva centrale. Pareti di colore rosa carico. Pavimento a scacchi. Al centro della parete di fondo campeggia un orologio a pendolo."
    },
    {
      "id": 48,
      "description": "Sala dal soffitto con stucchi decorativi, colonne con specchiature verdi, pavimento a scacchi. Nel fondo si apre una porta con tendaggio. Da una finestra a sinistra la luce del sole si proietta sul pavimento."
    },
    {
      "id": 50,
      "description": "Al centro della scena, al vertice di una scalinata si trova il trono. A destra e a sinistra una fitta teoria di colonne e di basamenti con animali mitologici. Scena dai colori brillanti."
    },
    {
      "id": 81,
      "description": "Stanza dalle pareti azzurre. Nella parete di fondo una porta con specchiature verdi. Nella stanza non ci sono mobili, alle pareti sono appesi due quadri e uno specchio."
    },
    {
      "id": 1,
      "description": "Dall'interno della grotta si guarda verso l'uscita. L'azzurro dell'acqua si riflette sulla volta e sulle pareti dell'antro. Notte con luna"
    },
    {
      "id": 2,
      "description": "Portico con volte a crociera e scale. Dagli occhi di portico si intravede un cortile. Notte."
    },
    {
      "id": 3,
      "description": "Scena notturna illuminata dalla luna piena. Un vialetto di cimitero circondato da cipressi si snoda fra tombe di varie tipologie. In fondo si intravede l'uscita del cimitero."
    },
    {
      "id": 4,
      "description": "Un ampio androne con passaggi dai soffitti a volta è illuminato da una lama di luce che sembra venire dall'interno del castello. Da uno dei passaggi si vede un cortile interno. Notte."
    },
    {
      "id": 5,
      "description": "Veduta di piazza con chiesa e campanile nel fondo. A destra un palazzo con portico. Nella piazza sono presenti numerosi lampioni che gettano la loro lunga ombra nel chiaro di luna della notte."
    },
    {
      "id": 6,
      "description": "Visione notturna di un chiostro chiuso su tre lati da un portico con volte a crociera. Il quarto lato è aperto."
    },
    {
      "id": 7,
      "description": "L'isola di San Giorgio e la laguna illuminate dalla luna."
    },
    {
      "id": 8,
      "description": "La luna raffigurata come un volto di profilo sorge su un globo azzurro."
    },
    {
      "id": 106,
      "description": "Veduta notturna di castello con mura merlate e torri, circondato da fossato e con ponte levatoio all'ingresso"
    },
    {
      "id": 9,
      "description": "Paesaggio con mare agitato da onde spumose. Nelle parte destra lo specchio di mare è delimitato da alture. Il cielo sfumato rosa e azzurro è disseminato di nubi stracciate dal vento."
    },
    {
      "id": 10,
      "description": "Alcuni alberi in un paesaggio brullo. Sulla destra si vede un muretto. Nello sfondo, in lontananza, si innalzano delle colline."
    },
    {
      "id": 11,
      "description": "Al centro della scena innevata è un incrocio fra stradine di campagna con un pilastrino o forse una fontana. A destra un borgo con campanile. A sinistra una casa colonica. In lontananza si vede una chiesa sullo sfondo di monti innevati."
    },
    {
      "id": 12,
      "description": "Tronchi d'albero a perdita d'occhio occupano quasi tutta la scena. Nella parte alta si vede l'inizio delle chiome. A destra una parte di radura."
    },
    {
      "id": 14,
      "description": "Ai piedi di alcuni alberi, fra le rocce si vede l'ingresso di una grotta."
    },
    {
      "id": 15,
      "description": "Nelle parte sinistra lo specchio di mare è delimitato da alture. Il cielo è sfumato di azzurro e verde chiaro."
    },
    {
      "id": 71,
      "description": "In secondo piano si trovano alcune case vicino ad un lago montano che si intravede dietro una cortina di alberi."
    },
    {
      "id": 80,
      "description": "A destra è raffigurato lo scorcio di un castello con mura merlate. Nello sfondo si vede uno specchio di mare delimitato da un promontorio in fondo al quale si erge un faro."
    },
    {
      "id": 86,
      "description": "Un viottolo si inoltra nella campagna passando in mezzo ad alcuni cipressi. Nello sfondo un paesaggio collinare. Il cielo ha una sfumatura rosata di alba o tramonto."
    },
    {
      "id": 96,
      "description": "Su di un'altura si vede un castello con torri e bifore."
    },
    {
      "id": 105,
      "description": "Veduta di un giardino chiuso da un elaborato cancello. Al centro della scena una vasca circolare con una statuetta al centro."
    },
    {
      "id": 16,
      "description": "Interno di prigione con colonne a sostegno delle volte. Da una finestra entra un raggio di luce che illumina parte del muro."
    },
    {
      "id": 23,
      "description": "Una grande quantità di scheletri sono dipinti su tutta la superficie della scenografia."
    },
    {
      "id": 29,
      "description": "Sarcofagi e croci disseminati in un prato circondato da cipressi. La scena sfuma in una bruma azzurrina."
    },
    {
      "id": 41,
      "description": "Interno di grotta con pertugio che guarda verso il mare aperto, dove si nota uno scoglio isolato. Il cielo è nuvoloso e il mare spumoso. All'interno della grotta si vedono riflessi di luce dorata."
    },
    {
      "id": 57,
      "description": "Entrata delle prigioni, si nota sulla destra la discesa dal castello. Su una piccola scalinata una finestra con grata e una porta. Al centro una colonna sorregge le volte."
    },
    {
      "id": 65,
      "description": "Interno di una cella con due finestre. Nella parete sinistra una mensola con una brocca."
    },
    {
      "id": 67,
      "description": "Ingresso di una prigione con colonne squadrate che reggono le volte."
    },
    {
      "id": 72,
      "description": "Semplici tombe sono allineate ai lati del vialetto del cimitero. Nel fondo si vede il muro col cancello e alcuni cipressi."
    },
    {
      "id": 76,
      "description": "Grotta o miniera. Nel fondo si vede un piccolo passaggio."
    },
    {
      "id": 77,
      "description": "Grotta con laghetto sotterraneo o forse grotta costiera in cui si insinua il mare."
    },
    {
      "id": 78,
      "description": "Castello con mura merlate e torrioni."
    },
    {
      "id": 22,
      "description": "Un ampio androne con soffitto a volta conduce ad un cortile e ad un altro passaggio soffuso di luce rosata."
    },
    {
      "id": 45,
      "description": "Ampio fossato con ponte che unisce un torrione al castello."
    },
    {
      "id": 55,
      "description": "Veduta di prospetto di un edificio, con pronao a quattro colonne e timpano, che occupa il lato di una piazza."
    },
    {
      "id": 75,
      "description": "Piazza con una chiesa, un edificio giallo a sinistra e uno azzurro a destra."
    },
    {
      "id": 79,
      "description": "A sinistra è raffigurata parte di una casa. Dalla casa parte un muretto con cancello che dà accesso a una carraia. A destra, dietro il muretto un albero si protende verso il centro della scena."
    },
    {
      "id": 83,
      "description": "Veduta del colle della Guardia col Santuario di San Luca e di una parte del portico che da Bologna conduce al Santuario."
    },
    {
      "id": 101,
      "description": "Nella scenografia è raffigurata una chiesa sulla riva di un fiume attraversato da un ponticello. Una stradina separa la chiesa da un borgo. Nello sfondo una rupe con una rocca."
    },
    {
      "id": 102,
      "description": "Veduta di piazza dall'angolo di un portico. Nel lato più lontano della piazza inizia una strada in fondo alla quale si vede lo scorcio di una chiesa."
    }
]


const Backdrops = {
    getAll: function(){
        return all;
    },
    getRandom: function(){
        return all[ Math.floor(Math.random() * all.length) ];
    },
    getByID: function( id ){
      return all.find( ( backdrop ) => backdrop.id === id );
    }
}

export default Backdrops;