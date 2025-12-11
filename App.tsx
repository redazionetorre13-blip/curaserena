import React, { useState } from 'react';
import { 
  Menu, X, Phone, Calendar, Scissors, Bath, 
  MapPin, Clock, CheckCircle2, HeartHandshake, User, ArrowRight,
  ChevronDown, ChevronUp, HelpCircle
} from 'lucide-react';
import ChatWidget from './components/ChatWidget';
import GeneratedImage from './components/GeneratedImage';
import { PageView } from './types';

// --- Components defined internally for simplicity of file structure ---

const Header: React.FC<{ active: PageView; setPage: (p: PageView) => void }> = ({ active, setPage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', value: PageView.HOME },
    { label: 'Servizi', value: PageView.SERVICES },
    { label: 'Chi Siamo', value: PageView.ABOUT },
    { label: 'FAQ', value: PageView.FAQ }, 
    { label: 'Contatti', value: PageView.CONTACT },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-sm border-b border-slate-100 shadow-sm">
      <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => setPage(PageView.HOME)}
        >
          <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center text-white">
            <HeartHandshake size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800 font-serif tracking-tight">CuraSerena</h1>
            <p className="text-xs text-slate-500 uppercase tracking-wider">Roma e Provincia</p>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setPage(item.value)}
              className={`text-sm font-medium transition-colors hover:text-primary-600 ${
                active === item.value ? 'text-primary-600' : 'text-slate-600'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button 
            onClick={() => setPage(PageView.CONTACT)}
            className="bg-primary-600 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-primary-700 transition-all shadow-md hover:shadow-lg"
          >
            Prenota Ora
          </button>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-slate-700"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 absolute w-full shadow-lg">
          <div className="flex flex-col p-4 gap-4">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  setPage(item.value);
                  setMobileMenuOpen(false);
                }}
                className={`text-left text-lg font-medium py-2 border-b border-slate-50 ${
                   active === item.value ? 'text-primary-600' : 'text-slate-700'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={() => {
                 setPage(PageView.CONTACT);
                 setMobileMenuOpen(false);
              }}
              className="bg-primary-600 text-white px-5 py-3 rounded-lg font-medium text-center mt-2"
            >
              Prenota Ora
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

const Footer: React.FC<{ setPage?: (p: PageView) => void }> = ({ setPage }) => (
  <footer className="bg-slate-900 text-slate-300 py-12">
    <div className="container mx-auto px-4 md:px-6">
      <div className="grid md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4 text-white">
            <HeartHandshake size={24} />
            <span className="text-xl font-bold font-serif">CuraSerena</span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            Dignità e igiene per i tuoi cari a domicilio. Servizi professionali di cura personale direttamente a letto, in tutta Roma e provincia.
          </p>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4">Link Utili</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3">
               <button onClick={() => setPage && setPage(PageView.SERVICES)} className="hover:text-white transition-colors">Servizi</button>
            </li>
            <li className="flex items-center gap-3">
               <button onClick={() => setPage && setPage(PageView.FAQ)} className="hover:text-white transition-colors">Domande Frequenti (FAQ)</button>
            </li>
            <li className="flex items-center gap-3">
               <button onClick={() => setPage && setPage(PageView.CONTACT)} className="hover:text-white transition-colors">Contatti</button>
            </li>
          </ul>
          <h3 className="text-white font-semibold mt-6 mb-4">Contatti Rapidi</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <Phone size={16} className="text-primary-400" />
              <span>+39 06 1234 5678</span>
            </li>
            <li className="flex items-center gap-3">
              <MapPin size={16} className="text-primary-400" />
              <span>Roma (RM) e Provincia</span>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4">Aree Coperte</h3>
          <div className="flex flex-wrap gap-2">
            {['Roma Centro', 'Roma Nord', 'EUR', 'Castelli Romani', 'Ostia', 'Tivoli'].map(area => (
              <span key={area} className="bg-slate-800 px-3 py-1 rounded-full text-xs text-slate-400 border border-slate-700">
                {area}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800 mt-12 pt-8 text-center text-xs text-slate-500">
        &copy; {new Date().getFullYear()} CuraSerena Roma. Tutti i diritti riservati.
      </div>
    </div>
  </footer>
);

// --- Sections ---

const HomeSection: React.FC<{ setPage: (p: PageView) => void }> = ({ setPage }) => (
  <>
    {/* Hero */}
    <section className="relative bg-primary-50 py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-sm border border-primary-100 text-primary-700 text-sm font-semibold">
              <CheckCircle2 size={16} /> Servizio attivo su Roma e Provincia
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-slate-900 leading-tight">
              Cura e dignità <br/>
              <span className="text-primary-600">direttamente a casa</span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
              Specialisti in igiene a letto, taglio barba e capelli per persone allettate. 
              Garantiamo professionalità, pulizia e un tocco umano quando serve di più.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={() => setPage(PageView.CONTACT)}
                className="bg-primary-600 text-white px-8 py-3.5 rounded-full font-semibold text-lg hover:bg-primary-700 transition-all shadow-lg hover:shadow-primary-500/30 flex items-center justify-center gap-2"
              >
                Richiedi un Appuntamento <ArrowRight size={20} />
              </button>
              <button 
                 onClick={() => setPage(PageView.SERVICES)}
                 className="bg-white text-slate-700 border border-slate-200 px-8 py-3.5 rounded-full font-semibold text-lg hover:bg-slate-50 transition-colors flex items-center justify-center"
              >
                Scopri i Servizi
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-primary-600 rounded-3xl rotate-3 opacity-10 blur-xl scale-95"></div>
            {/* Replaced static image with Gemini Generated Image */}
            <GeneratedImage
              prompt="Professional caregiver gently holding the hand of an elderly patient in a comfortable, sunny bedroom in Rome. Warm lighting, compassionate atmosphere, photorealistic, high quality, 4k"
              alt="Mani che si stringono in segno di cura"
              aspectRatio="16:9"
              className="relative rounded-3xl shadow-2xl object-cover w-full h-[400px] md:h-[500px]"
            />
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-slate-100 hidden md:block">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full text-green-600">
                  <User size={24} />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Operatori Qualificati</p>
                  <p className="font-bold text-slate-800">100% Affidabili</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Quick Features */}
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Clock className="w-8 h-8 text-primary-600" />,
              title: "Flessibilità Oraria",
              desc: "Disponibili 7 giorni su 7, con orari concordati per non disturbare la routine familiare."
            },
            {
              icon: <MapPin className="w-8 h-8 text-primary-600" />,
              title: "A Domicilio Ovunque",
              desc: "Raggiungiamo tutta Roma, il GRA e i comuni della provincia senza costi occulti."
            },
            {
              icon: <HeartHandshake className="w-8 h-8 text-primary-600" />,
              title: "Empatia e Rispetto",
              desc: "Trattiamo ogni paziente come fosse un nostro familiare, con la massima delicatezza."
            }
          ].map((feature, idx) => (
            <div key={idx} className="bg-slate-50 p-8 rounded-2xl hover:bg-white hover:shadow-xl transition-all border border-slate-100">
              <div className="mb-4 bg-white w-14 h-14 rounded-full flex items-center justify-center shadow-sm">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">{feature.title}</h3>
              <p className="text-slate-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

const ServicesSection = () => {
  const services = [
    {
      id: 1,
      title: "Igiene Completa a Letto",
      desc: "Spugnature complete, cambio pannolone, prevenzione piaghe da decubito e cambio biancheria del letto con paziente allettato.",
      icon: <Bath className="w-6 h-6" />,
      detail: "Ideale per pazienti non autosufficienti."
    },
    {
      id: 2,
      title: "Barba e Taglio Uomo",
      desc: "Rasatura barba tradizionale con panni caldi e taglio capelli a forbice o macchinetta, eseguito con massima cautela a letto.",
      icon: <Scissors className="w-6 h-6" />,
      detail: "Strumenti sterilizzati e pulizia finale."
    },
    {
      id: 3,
      title: "Parrucchiere Donna",
      desc: "Taglio, messa in piega leggera e, ove possibile, tinta. Tutto eseguito garantendo il comfort della signora a letto.",
      icon: <User className="w-6 h-6" />,
      detail: "Prodotti delicati e ipoallergenici."
    },
    {
      id: 4,
      title: "Cura Mani e Piedi",
      desc: "Taglio unghie mani e piedi (non curativo medico, ma estetico/igienico) per mantenere pulizia e ordine.",
      icon: <CheckCircle2 className="w-6 h-6" />,
      detail: "Massima attenzione per pazienti diabetici."
    }
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">I Nostri Servizi</h2>
          <p className="text-lg text-slate-600">
            Offriamo un ventaglio di servizi pensati specificamente per chi non può muoversi dal letto, portando il salone e l'assistenza direttamente a casa.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((s) => (
            <div key={s.id} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex gap-6 hover:border-primary-200 transition-colors">
              <div className="shrink-0">
                <div className="w-12 h-12 bg-primary-100 text-primary-700 rounded-xl flex items-center justify-center">
                  {s.icon}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{s.title}</h3>
                <p className="text-slate-600 mb-3">{s.desc}</p>
                <span className="text-sm font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded">
                  {s.detail}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => (
  <section className="py-20 bg-white">
    <div className="container mx-auto px-4 md:px-6">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1">
          {/* Replaced static image with Gemini Generated Image */}
          <GeneratedImage
            prompt="Portrait of a friendly and professional Italian female caregiver in a neat uniform smiling warmly, standing in a clean living room, soft daylight, trust, high quality, photorealistic"
            alt="Operatore sorridente"
            aspectRatio="1:1"
            className="rounded-3xl shadow-2xl object-cover h-[500px] w-full"
          />
        </div>
        <div className="order-1 md:order-2">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-6">Chi Siamo</h2>
          <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
            <p>
              <strong>CuraSerena Roma</strong> nasce dall'esperienza di operatori socio-sanitari e professionisti della bellezza che hanno deciso di unire le forze.
            </p>
            <p>
              Abbiamo notato quanto fosse difficile per le famiglie trovare qualcuno che si occupasse non solo dell'igiene medica, ma anche della "bellezza" e della dignità dei pazienti allettati. Un taglio di capelli, una barba ben fatta o un viso pulito possono cambiare l'umore di una persona e dei suoi cari.
            </p>
            <p>
              Operiamo con protocolli rigorosi di igiene, portando tutto il necessario (traverse, asciugamani monouso, strumenti sterilizzati) e lasciando la stanza pulita come l'abbiamo trovata.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl text-center">
              <div className="text-3xl font-bold text-primary-600">500+</div>
              <div className="text-sm text-slate-500">Famiglie Aiutate</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl text-center">
              <div className="text-3xl font-bold text-primary-600">100%</div>
              <div className="text-sm text-slate-500">Soddisfazione</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Come posso prenotare un servizio?",
      a: "Prenotare è semplice. Puoi chiamarci direttamente al numero +39 06 1234 5678, oppure compilare il modulo di contatto presente sul sito. Ti ricontatteremo entro poche ore per concordare giorno e orario."
    },
    {
      q: "Quali zone di Roma coprite?",
      a: "Copriamo tutto il territorio di Roma Capitale (entro e fuori il GRA) e gran parte della Provincia di Roma (Castelli Romani, Litorale, Tivoli, ecc.). Contattaci per verificare la disponibilità specifica nel tuo comune."
    },
    {
      q: "Quanto costa il servizio a domicilio?",
      a: "I costi variano in base al tipo di servizio (solo igiene, barba, capelli o pacchetti completi) e alla distanza. Offriamo preventivi trasparenti e senza impegno prima della conferma dell'appuntamento."
    },
    {
      q: "I vostri operatori sono qualificati?",
      a: "Assolutamente sì. Collaboriamo esclusivamente con Operatori Socio-Sanitari (OSS) certificati per l'igiene e con barbieri/parrucchieri esperti nel trattamento di persone allettate."
    },
    {
      q: "Quali misure di igiene e sicurezza adottate?",
      a: "La sicurezza è la nostra priorità. Utilizziamo sempre mascherine FFP2, guanti monouso e camici protettivi. Tutti gli strumenti (forbici, rasoi) sono sterilizzati e imbustati singolarmente prima di ogni utilizzo."
    },
    {
      q: "Effettuate prestazioni mediche o infermieristiche?",
      a: "No. CuraSerena si occupa esclusivamente di servizi socio-assistenziali (igiene personale) ed estetici (barba, capelli, unghie). Per iniezioni, medicazioni complesse o terapie, vi invitiamo a rivolgervi a personale infermieristico o medico."
    },
    {
      q: "Devo fornire io gli asciugamani o lo shampoo?",
      a: "Non è necessario. Portiamo noi tutto il materiale occorrente: traverse monouso, asciugamani, prodotti per l'igiene, shampoo a secco o con catino specifico per letto. Se preferisci utilizzare i tuoi prodotti personali, saremo lieti di usarli."
    }
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">Domande Frequenti</h2>
            <p className="text-lg text-slate-600">
              Risposte chiare ai dubbi più comuni sui nostri servizi di assistenza a domicilio.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all hover:shadow-md"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className={`font-semibold text-lg ${openIndex === idx ? 'text-primary-600' : 'text-slate-800'}`}>
                    {faq.q}
                  </span>
                  {openIndex === idx ? (
                    <ChevronUp className="text-primary-600" />
                  ) : (
                    <ChevronDown className="text-slate-400" />
                  )}
                </button>
                {openIndex === idx && (
                  <div className="px-6 pb-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-50 mt-2">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center bg-primary-50 p-8 rounded-2xl border border-primary-100">
            <HelpCircle className="w-10 h-10 text-primary-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">Hai altre domande?</h3>
            <p className="text-slate-600 mb-6">
              Siamo qui per aiutarti. Contattaci direttamente o chiedi alla nostra assistente virtuale Serena.
            </p>
            <button 
              className="font-medium text-primary-700 hover:text-primary-900 underline"
            >
              Vai alla pagina Contatti
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setFormStatus('success');
    setTimeout(() => setFormStatus('idle'), 5000);
  };

  return (
    <section className="py-20 bg-primary-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12 bg-primary-700 text-white flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-serif font-bold mb-4">Contattaci</h2>
                <p className="text-primary-100 mb-8">
                  Compila il modulo per richiedere un preventivo gratuito o per prenotare un servizio. Rispondiamo solitamente entro 2 ore.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="text-primary-300" />
                    <span>+39 06 1234 5678</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="text-primary-300" />
                    <span>Servizio a Domicilio - Roma</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="text-primary-300" />
                    <span>Disponibili Lun - Sab</span>
                  </div>
                </div>
              </div>
              <div className="mt-12">
                <p className="text-sm opacity-60">
                  I tuoi dati sono trattati nel rispetto della privacy (GDPR).
                </p>
              </div>
            </div>

            <div className="p-8 md:p-12">
              {formStatus === 'success' ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800">Richiesta Inviata!</h3>
                  <p className="text-slate-600">Grazie. Ti contatteremo al più presto per confermare i dettagli.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Nome e Cognome</label>
                    <input required type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none" placeholder="Mario Rossi" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Telefono</label>
                    <input required type="tel" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none" placeholder="333 1234567" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Zona di Roma (Quartiere/Via)</label>
                    <input required type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none" placeholder="Es. Monteverde, Eur..." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Servizio Richiesto</label>
                    <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none">
                      <option>Igiene Completa</option>
                      <option>Barba e Capelli Uomo</option>
                      <option>Parrucchiere Donna</option>
                      <option>Altro / Pacchetto Misto</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Messaggio (Opzionale)</label>
                    <textarea rows={3} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none" placeholder="Note particolari..."></textarea>
                  </div>
                  <button type="submit" className="w-full bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors">
                    Invia Richiesta
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Main App ---

function App() {
  const [currentPage, setCurrentPage] = useState<PageView>(PageView.HOME);

  const renderPage = () => {
    switch(currentPage) {
      case PageView.HOME:
        return (
          <>
            <HomeSection setPage={setCurrentPage} />
            <ServicesSection />
            <AboutSection />
            <ContactSection />
          </>
        );
      case PageView.SERVICES:
        return (
          <>
             <div className="bg-slate-900 text-white py-12 text-center">
               <h1 className="text-4xl font-serif font-bold">I Nostri Servizi</h1>
               <p className="text-slate-400 mt-2">Dettaglio dell'offerta per i vostri cari</p>
             </div>
             <ServicesSection />
             <ContactSection />
          </>
        );
      case PageView.ABOUT:
        return (
           <>
             <div className="bg-primary-700 text-white py-12 text-center">
               <h1 className="text-4xl font-serif font-bold">La Nostra Missione</h1>
             </div>
             <AboutSection />
             <ContactSection />
           </>
        );
      case PageView.FAQ:
        return (
          <>
             <div className="bg-white pt-8 pb-4 border-b border-slate-100">
             </div>
             <FAQSection />
             <ContactSection />
          </>
        );
      case PageView.CONTACT:
        return (
          <>
            <div className="bg-slate-50 py-8"></div>
            <ContactSection />
          </>
        );
      default:
        return <HomeSection setPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header active={currentPage} setPage={setCurrentPage} />
      
      <main className="flex-grow">
        {renderPage()}
      </main>

      <Footer setPage={setCurrentPage} />
      <ChatWidget />
    </div>
  );
}

export default App;