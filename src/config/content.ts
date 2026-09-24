/**
 * Teksten van reviewplus.io, overgenomen van de Framer-site (september 2026) met kleine taalcorrecties.
 * Cijfers (900+ bedrijven, 220 uur, 15%, 28%) komen van de huidige site; Jordan is verantwoordelijk voor de onderbouwing.
 */

export const stats = {
  bedrijven: '900+',
  bedrijvenTekst: 'Meer dan 900 bedrijven vertrouwen al op onze review-oplossing.',
  items: [
    { waarde: 220, suffix: 'U', label: 'Tijd bespaard door automatiseringen', icoon: 'klok', stijl: 'licht' },
    { waarde: 15, suffix: '%', label: 'Gemiddelde omzetstijging', icoon: 'pijl', stijl: 'licht' },
    { waarde: 28, suffix: '%', label: 'Meer clicks in lokale zoekresultaten', icoon: 'pijl', stijl: 'blauw' },
  ],
} as const;

export const hoofdfuncties = [
  {
    titel: 'Eenvoudig reviews verzamelen',
    tekst: 'Verzamel moeiteloos meer reviews via NFC-kaarten, QR-codes en slimme links. Zie precies welke medewerker of locatie de meeste reviews binnenhaalt.',
  },
  {
    titel: 'AI die automatisch op al je reviews reageert',
    tekst: 'Onze AI beantwoordt al je reviews — snel, professioneel en in jouw stijl. Jij bespaart tijd, terwijl klanten zich gehoord voelen.',
  },
  {
    titel: 'Overzicht van al je reviewplatformen in één dashboard',
    tekst: 'Monitor reviews centraal en zie direct wat beter kan.',
  },
] as const;

export const extraFuncties = [
  { titel: 'Widgets', tekst: 'Toon reviews op je website met eenvoudige widgets.', kleur: 'blauw', icoon: 'widget' },
  { titel: 'Review Reports', tekst: 'Krijg maandelijks inzicht in je reviewprestaties.', kleur: 'blauw', icoon: 'rapport' },
  { titel: 'Custom QR Codes', tekst: 'Maak unieke QR-codes om reviews te tracken.', kleur: 'lichtblauw', icoon: 'qr' },
  { titel: 'Social Media Tool', tekst: 'Deel je mooiste reviews direct op social media met kant-en-klare visuals.', kleur: 'roze', icoon: 'social' },
  { titel: 'Beloningen voor Reviews', tekst: 'Stimuleer klanten om feedback te geven met leuke acties en beloningen.', kleur: 'groen', icoon: 'beloning' },
  { titel: 'Negatieve Review Filtering', tekst: 'Ontvang negatieve feedback privé, zonder impact op je score.', kleur: 'geel', icoon: 'filter' },
] as const;

export const uitkomsten = [
  {
    label: 'Meer én betere reviews',
    titel: 'Krijg meer positieve reviews zonder extra moeite',
    tekst: 'Automatiseer het verzamelen van reviews via WhatsApp, e-mail, sms, NFC-kaarten en QR-codes. Review Plus vergroot je zichtbaarheid én je reputatie — terwijl jij gewoon doorgaat met ondernemen.',
    punten: ['Laat je score stijgen, automatisch.', 'Trek meer klanten aan met een sterke online reputatie.'],
    beeld: 'statistieken',
  },
  {
    label: 'Tijd- en stressbesparing',
    titel: 'Krijg volledige controle over je online reputatie',
    tekst: 'Review Plus neemt al het werk rondom reviews van je over — van reageren tot monitoren. Onze AI houdt alles bij, zodat jij je kunt richten op je bedrijf in plaats van op negatieve feedback of gemiste berichten.',
    punten: ['Werk met minder stress.', 'Besteed je tijd aan wat écht belangrijk is.'],
    beeld: 'snelheid',
  },
  {
    label: 'Volledig inzicht en controle',
    titel: 'Ervaar totale duidelijkheid over je online reputatie',
    tekst: 'Met Review Plus zie je al je reviews, scores en platformen in één overzicht. Je weet precies wat er speelt, wat goed gaat en waar kansen liggen — zonder te zoeken of meerdere schermen te openen.',
    punten: ['Houd al je reviewplatformen overzichtelijk bij.', 'Gemoedsrust door één duidelijk dashboard.'],
    beeld: 'controle',
  },
] as const;

export const faq = [
  {
    vraag: 'Hoe kan ik reviews verzamelen met Review Plus?',
    antwoord: 'Met Review Plus verzamel je eenvoudig meer online reviews via meerdere kanalen. Je kunt automatische reviewverzoeken versturen via e-mail en sms. Daarnaast werkt onze software naadloos samen met fysieke reviewtools zoals NFC- en QR-codekaarten, standaards en platen. Zo kunnen klanten direct een review achterlaten na een aankoop of bezoek.',
  },
  {
    vraag: 'Heb ik technische kennis nodig om Review Plus te gebruiken?',
    antwoord: 'Nee, je hebt geen technische kennis nodig om Review Plus te gebruiken. Onze reputatiemanagementsoftware is ontwikkeld voor ondernemers en teams zonder IT-achtergrond. Dankzij de gebruiksvriendelijke interface beheer je eenvoudig al je online reviews, zonder programmeerkennis of complexe instellingen.',
  },
  {
    vraag: 'Kan ik Review Plus gebruiken voor mijn bedrijf buiten Nederland?',
    antwoord: 'Ja, Review Plus is geschikt voor internationale bedrijven. Wij ondersteunen organisaties in heel Europa. Het platform biedt ondersteuning voor meerdere talen, valuta en tijdzones. Ook onze fysieke reviewproducten kunnen internationaal worden verzonden.',
  },
  {
    vraag: 'Welke reviewplatformen ondersteunt Review Plus?',
    antwoord: 'Review Plus ondersteunt alle belangrijke reviewplatformen, waaronder Google Reviews, Trustpilot en Facebook. Daarnaast kun je ook reviews verzamelen via een eigen reviewpagina. Alle reviews worden centraal weergegeven in één overzichtelijk dashboard.',
  },
  {
    vraag: 'Is Review Plus geschikt voor bedrijven met meerdere locaties?',
    antwoord: 'Ja, Review Plus is ideaal voor bedrijven met meerdere vestigingen. Je beheert alle locaties, reviews en prestaties centraal vanuit één account. Dit maakt Review Plus zeer geschikt voor ketens, franchises en groeiende organisaties.',
  },
] as const;

/**
 * Plannen. Prijzen per maand excl. btw: `maand` bij maandelijkse, `jaar` bij jaarlijkse facturering.
 * LET OP: de prijzen staan ook in het Make-scenario (route "Abonnement afgesloten"). Wijzig ze daar ook.
 */
export const plannen = [
  { id: '1-jaar', maanden: 12, looptijd: '1 jaar', naam: 'Review Plus Online (1 jaar)', label: '1 jaar', maand: '149,95', jaar: '79,95', pakket: '5 NFC-kaarten & 3 NFC-totems', pakketKort: '5 kaarten + 3 totems', support: 'Standaard', uitgelicht: false },
  { id: '2-jaar', maanden: 24, looptijd: '2 jaar', naam: 'Review Plus Online (2 jaar)', label: 'Populair', maand: '124,95', jaar: '69,95', pakket: '10 NFC-kaarten & 5 NFC-totems', pakketKort: '10 kaarten + 5 totems', support: 'Prioriteit', uitgelicht: true },
  { id: '3-jaar', maanden: 36, looptijd: '3 jaar', naam: 'Review Plus Online (3 jaar)', label: 'Beste keuze', maand: '99,95', jaar: '59,95', pakket: '15 NFC-kaarten & 7 NFC-totems', pakketKort: '15 kaarten + 7 totems', support: 'Prioriteit', uitgelicht: false },
] as const;

export const planKenmerken = ['Automatisch reviews verzamelen', 'AI-reacties op reviews', 'Dashboard met alle platformen'] as const;

/**
 * Vergelijkingstabel: alleen de echte rijen van de huidige site (template-rijen als "Budgeting" zijn verwijderd).
 * TODO: Jordan controleert of alle functies in alle drie de plannen zitten.
 */
export const vergelijking = [
  { groep: 'Kernfuncties', rijen: ['Reviewcampagnes', 'Review-widgets', 'AI-reacties op reviews', 'Alles in één dashboard'] },
  { groep: 'Groei & zichtbaarheid', rijen: ['Local Search Grid', 'NFC-kaarten & QR-codes', 'Feedback afvangen'] },
  { groep: 'Extra voordelen', rijen: ['Integraties', 'Rapportages'] },
] as const;

/**
 * Logo's in de blauwe band op de homepage. Iconen uit Iconify: "si:" = Simple Icons, "logos:" = SVG Logos (wit gemaakt).
 * Zonder `icoon` wordt alleen de naam getoond (Mollie, Teamleader en Moneybird staan niet in deze sets).
 */
export const platformen: readonly { naam: string; icoon?: string; woordmerk?: boolean }[] = [
  { naam: 'Google', icoon: 'si:google' },
  { naam: 'ChatGPT', icoon: 'si:openai' },
  { naam: 'Anthropic', icoon: 'si:anthropic' },
  { naam: 'Claude Code', icoon: 'si:claude' },
  { naam: 'Grok', icoon: 'logos:grok-icon' },
  { naam: 'Gemini', icoon: 'si:googlegemini' },
  { naam: 'Meta AI', icoon: 'si:metaai' },
  { naam: 'WhatsApp Business', icoon: 'si:whatsapp' },
  { naam: 'Make', icoon: 'si:make' },
  { naam: 'Mollie' },
  { naam: 'GitHub', icoon: 'si:github' },
  { naam: 'Teamleader Focus' },
  { naam: 'Umami Cloud', icoon: 'si:umami' },
  { naam: 'Cloudflare', icoon: 'si:cloudflare' },
  { naam: 'Slack', icoon: 'si:slack' },
  { naam: 'Notion', icoon: 'si:notion' },
  { naam: 'GoDaddy', icoon: 'si:godaddy' },
  { naam: 'OpenAI', icoon: 'si:openai' },
  { naam: 'Google Workspace', icoon: 'logos:google-workspace', woordmerk: true },
  { naam: 'Moneybird' },
];
