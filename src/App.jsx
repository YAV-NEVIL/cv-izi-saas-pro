import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ShieldCheck, 
  MapPin, 
  Clock, 
  Smartphone, 
  Navigation, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight, 
  Star, 
  PhoneCall, 
  MessageSquare, 
  Send, 
  Radio, 
  Crosshair, 
  Lock, 
  Download, 
  Activity,
  Menu,
  X,
  CreditCard,
  Building2,
  Sparkles
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [appModalOpen, setAppModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    email: '',
    commune: 'Gombe',
    subject: 'Devis Entreprise',
    message: ''
  });
  
  // Interactive Mixer state (Card 1)
  const [mixerItems, setMixerItems] = useState([
    { id: 1, title: "Colis VIP Urgent", location: "Gombe \u2192 Ngaliema", time: "28 min", status: "En cours", code: "LEX-8841" },
    { id: 2, title: "Documents Juridiques", location: "Boulevard \u2192 Kintambo", time: "19 min", status: "Assign\u00e9", code: "LEX-9022" },
    { id: 3, title: "Commande Resto Chaud", location: "Limete \u2192 Bandal", time: "34 min", status: "Livr\u00e9", code: "LEX-7419" },
  ]);

  // Telemetry typewriter state (Card 2)
  const [typewriterText, setTypewriterText] = useState("");
  const fullLogText = "LIVREXPRESS_GPS // Motard #142 localis\u00e9 \u00e0 Bd du 30 Juin... Trafic fluide... ETA Gombe: 7 min... OTP S\u00e9curis\u00e9 pr\u00eat.";

  // Cursor planner state (Card 3)
  const [activeDay, setActiveDay] = useState(2); // Wednesday default
  const [isSaved, setIsSaved] = useState(false);

  // Live Toast Notifications (Kinshasa Realtime Stream)
  const [toastNotification, setToastNotification] = useState(null);

  const heroRef = useRef(null);
  const manifestoRef = useRef(null);
  const mainRef = useRef(null);

  // Array Unshift/Pop cycling effect for Card 1
  useEffect(() => {
    const interval = setInterval(() => {
      setMixerItems((prevItems) => {
        const next = [...prevItems];
        const last = next.pop();
        if (last) next.unshift(last);
        return next;
      });
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  // Typewriter effect for Telemetry Card 2
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullLogText.length) {
        setTypewriterText(fullLogText.slice(0, index));
        index++;
      } else {
        index = 0;
      }
    }, 80);
    return () => clearInterval(timer);
  }, []);

  // Simulated live delivery toast stream
  useEffect(() => {
    const toasts = [
      "\u26a1 Nouvelle livraison effectu\u00e9e \u00e0 Gombe (24 min)",
      "\ud83d\udce6 Coursier assign\u00e9 \u00e0 Limete - Secteur Industriel",
      "\ud83d\ude80 Colis Express livr\u00e9 avec succ\u00e8s \u00e0 Ngaliema Ma Campagne",
      "\ud83d\udcf1 Paiement M-Pesa confirm\u00e9 pour le colis #LEX-9910"
    ];
    let toastIndex = 0;
    const toastTimer = setInterval(() => {
      setToastNotification(toasts[toastIndex % toasts.length]);
      toastIndex++;
      setTimeout(() => setToastNotification(null), 4000);
    }, 9000);
    return () => clearInterval(toastTimer);
  }, []);

  // Scroll listener for floating navbar morphing
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP Animations setup
  useEffect(() => {
    let ctx = gsap.context(() => {
      // Hero fade-up stagger
      gsap.from('.gsap-hero-anim', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out',
      });

      // Features section scroll fade in
      gsap.from('.gsap-feature-card', {
        scrollTrigger: {
          trigger: '#features',
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
      });

      // Manifesto text scroll fade
      gsap.from('.gsap-manifesto-text', {
        scrollTrigger: {
          trigger: manifestoRef.current,
          start: 'top 75%',
        },
        y: 35,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
      });

      // Protocol stacked cards effect
      const protocolCards = gsap.utils.toArray('.gsap-protocol-card');
      protocolCards.forEach((card, index) => {
        if (index < protocolCards.length - 1) {
          gsap.to(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 15%',
              endTrigger: protocolCards[index + 1],
              end: 'top 15%',
              scrub: true,
            },
            scale: 0.92,
            filter: 'blur(8px)',
            opacity: 0.4,
            ease: 'none',
          });
        }
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="min-h-screen bg-obsidian text-ivoire font-sans relative overflow-x-hidden selection:bg-electric selection:text-white">
      {/* SVG Global Noise Texture Filter */}
      <div className="noise-bg"></div>

      {/* Realtime Toast Notification Stream */}
      {toastNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-navy-800/90 backdrop-blur-xl border border-electric/30 text-white text-xs md:text-sm px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce">
          <span className="w-2.5 h-2.5 rounded-full bg-cyanAccent animate-ping"></span>
          <span>{toastNotification}</span>
        </div>
      )}

      {/* NAVBAR */}
      <header className={`fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-5xl transition-all duration-500 rounded-full px-5 md:px-8 py-3.5 flex items-center justify-between ${
        scrolled 
          ? 'bg-obsidian/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-electric/10' 
          : 'bg-white/5 backdrop-blur-md border border-white/10'
      }`}>
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-electric via-cyanAccent to-champagne flex items-center justify-center shadow-lg shadow-electric/30 group-hover:scale-105 transition-transform">
            <Zap className="w-5 h-5 text-obsidian fill-obsidian" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg md:text-xl tracking-tight text-white flex items-center gap-1.5">
              LivrExpress
              <span className="inline-block w-2 h-2 rounded-full bg-cyanAccent animate-pulse"></span>
            </span>
            <span className="text-[9px] uppercase tracking-widest text-champagne font-mono font-semibold">Kinshasa 45m</span>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/80">
          <a href="#features" className="hover:text-cyanAccent transition-colors interactive-lift">Avantages</a>
          <a href="#protocole" className="hover:text-cyanAccent transition-colors interactive-lift">3 \u00c9tapes</a>
          <a href="#temoignages" className="hover:text-cyanAccent transition-colors interactive-lift">Avis Kinshasa</a>
          <a href="#tarifs" className="hover:text-cyanAccent transition-colors interactive-lift">Tarifs</a>
          <button 
            onClick={() => setContactModalOpen(true)}
            className="hover:text-champagne transition-colors interactive-lift text-sm font-semibold text-champagne flex items-center gap-1.5"
          >
            <MessageSquare className="w-4 h-4" />
            Nous contacter
          </button>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button 
            onClick={() => setAppModalOpen(true)}
            className="btn-magnetic bg-gradient-to-r from-electric to-cyanAccent text-obsidian font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full shadow-lg shadow-electric/25 flex items-center gap-2"
          >
            <span className="btn-slide-bg bg-white/30"></span>
            <Smartphone className="w-4 h-4 relative z-10" />
            <span className="relative z-10">L'Application</span>
          </button>
        </div>

        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white p-2 rounded-xl bg-white/10"
          aria-label="Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-obsidian/95 backdrop-blur-2xl flex flex-col justify-center px-8 py-12 space-y-6 md:hidden">
          <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold text-white hover:text-cyanAccent">Avantages Cl\u00e9s</a>
          <a href="#protocole" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold text-white hover:text-cyanAccent">Comment \u00e7a marche</a>
          <a href="#temoignages" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold text-white hover:text-cyanAccent">T\u00e9moignages</a>
          <a href="#tarifs" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold text-white hover:text-cyanAccent">Tarifs & Offres</a>
          <button 
            onClick={() => { setMobileMenuOpen(false); setContactModalOpen(true); }}
            className="text-2xl font-bold text-left text-champagne hover:text-white flex items-center gap-3"
          >
            <MessageSquare className="w-6 h-6" />
            Nous contacter
          </button>
          <div className="pt-6 border-t border-white/10">
            <button 
              onClick={() => { setMobileMenuOpen(false); setAppModalOpen(true); }}
              className="w-full bg-electric text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              T\u00e9l\u00e9charger l'Application LivrExpress
            </button>
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <section ref={heroRef} className="relative min-h-[100dvh] flex flex-col justify-end pb-16 md:pb-24 pt-32 px-6 md:px-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=2000&q=80" 
            alt="LivrExpress Coursier Moto Kinshasa Traffic" 
            className="w-full h-full object-cover opacity-45 scale-105 transform transition-transform duration-10000 object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/75 to-navy-900/40"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/60 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="gsap-hero-anim inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-800/80 border border-cyanAccent/30 text-cyanAccent text-xs md:text-sm font-mono tracking-wide">
            <Radio className="w-3.5 h-3.5 animate-pulse text-cyanAccent" />
            <span>EXPRESS LOGISTICS KINSHASA \u2022 45 MINUTES CHRONO</span>
          </div>

          <h1 className="gsap-hero-anim text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.08] text-white">
            <span className="block font-sans uppercase text-slate-100">LivrExpress Kinshasa</span>
            <span className="block text-3xl sm:text-5xl md:text-6xl font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-champagne via-cyanAccent to-white mt-1">
              rencontre l'\u00c9lite de la Vitesse.
            </span>
          </h1>

          <p className="gsap-hero-anim text-lg md:text-xl text-slate-300 max-w-2xl font-light leading-relaxed">
            Vos colis, documents urgents et commandes livr\u00e9s en <strong className="text-white font-semibold underline decoration-cyanAccent decoration-2">45 minutes chrono</strong> dans toute la ville de Kinshasa. Suivi GPS en direct par coursier certifi\u00e9.
          </p>

          <div className="gsap-hero-anim pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button 
              onClick={() => setAppModalOpen(true)}
              className="btn-magnetic bg-gradient-to-r from-electric via-blue-600 to-cyanAccent text-white font-bold text-base px-8 py-4 rounded-full shadow-2xl shadow-electric/40 flex items-center justify-center gap-3 group"
            >
              <span className="btn-slide-bg bg-white/20"></span>
              <Smartphone className="w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform" />
              <span className="relative z-10">T\u00e9l\u00e9charger l'application LivrExpress</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            </button>

            <a 
              href="#protocole"
              className="px-6 py-4 rounded-full border border-white/20 text-white hover:bg-white/10 font-semibold text-sm flex items-center justify-center gap-2 transition-all"
            >
              D\u00e9couvrir les 3 \u00e9tapes
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          <div className="gsap-hero-anim pt-8 grid grid-cols-3 gap-4 border-t border-white/10 max-w-lg">
            <div>
              <p className="text-2xl md:text-3xl font-extrabold text-white font-mono">45<span className="text-cyanAccent text-lg">min</span></p>
              <p className="text-xs text-slate-400 font-medium">Temps moyen garanti</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-extrabold text-champagne font-mono">99.8<span className="text-xs">%</span></p>
              <p className="text-xs text-slate-400 font-medium">Colis livr\u00e9s \u00e0 temps</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-extrabold text-white font-mono">24/7</p>
              <p className="text-xs text-slate-400 font-medium">Disponibilit\u00e9 Kinshasa</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-mono uppercase tracking-widest text-champagne">Arguments de Vente Exclusifs</h2>
          <p className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Une technologie de livraison con\u00e7ue pour <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-cyanAccent">Kinshasa</span>.
          </p>
          <p className="text-slate-400 text-base md:text-lg">
            Trois innovations majeures garantissent la s\u00e9curit\u00e9 et la vitesse de vos exp\u00e9ditions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Card 1 - Mixer */}
          <div className="gsap-feature-card glass-card glass-card-hover rounded-[2.5rem] p-8 flex flex-col justify-between relative overflow-hidden min-h-[440px]">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-electric/20 border border-electric/40 flex items-center justify-center text-electric">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white">Livraison 45 Minutes Chrono</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Algorithme d'optimisation de trajet adapt\u00e9 au trafic de la capitale (Gombe, Ngaliema, Limete, etc.).
              </p>
            </div>

            <div className="mt-8 relative h-48 flex items-center justify-center">
              {mixerItems.map((item, idx) => (
                <div 
                  key={item.id}
                  className="absolute w-full p-4 rounded-2xl bg-navy-800/90 border border-white/10 shadow-xl transition-all duration-700 ease-out"
                  style={{
                    transform: `translateY(${(idx - 1) * 28}px) scale(${1 - Math.abs(idx - 1) * 0.08})`,
                    zIndex: 3 - idx,
                    opacity: 1 - Math.abs(idx - 1) * 0.3,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-champagne">{item.code}</span>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-cyanAccent/20 text-cyanAccent font-semibold">
                      {item.status}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-white mt-1">{item.title}</h4>
                  <div className="flex items-center justify-between text-xs text-slate-400 mt-2">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-electric" />
                      {item.location}
                    </span>
                    <span className="font-mono text-cyanAccent font-bold">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 text-xs font-mono text-slate-500 text-center">
              \u21bb R\u00e9partition dynamique en temps r\u00e9el
            </div>
          </div>

          {/* Card 2 - Telemetry */}
          <div className="gsap-feature-card glass-card glass-card-hover rounded-[2.5rem] p-8 flex flex-col justify-between relative overflow-hidden min-h-[440px]">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-cyanAccent/20 border border-cyanAccent/40 flex items-center justify-center text-cyanAccent">
                <Navigation className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white">G\u00e9olocalisation & Suivi GPS</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Suivez votre coursier m\u00e8tre par m\u00e8tre sur la carte en temps r\u00e9el avec notification d'approche.
              </p>
            </div>

            <div className="mt-6 p-5 rounded-2xl bg-obsidian border border-cyanAccent/30 font-mono text-xs text-cyanAccent space-y-3 shadow-inner">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                  <span className="text-[10px] text-white font-bold tracking-wider uppercase">FLUX EN DIRECT</span>
                </div>
                <span className="text-[9px] text-slate-500">SATELLITE ACTIVE</span>
              </div>
              <p className="min-h-[70px] text-slate-200 font-mono leading-relaxed">
                {typewriterText}
                <span className="inline-block w-2 h-4 bg-cyanAccent ml-1 animate-pulse"></span>
              </p>
              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-white/10">
                <span>PR\u00c9CISION GPS: 1.2M</span>
                <span className="text-emerald-400 font-semibold">SIGNAL FORME 100%</span>
              </div>
            </div>

            <div className="pt-4 text-xs font-mono text-slate-500 text-center">
              \u25cf Tra\u00e7abilit\u00e9 continue par satellite
            </div>
          </div>

          {/* Card 3 - Planner */}
          <div className="gsap-feature-card glass-card glass-card-hover rounded-[2.5rem] p-8 flex flex-col justify-between relative overflow-hidden min-h-[440px]">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-champagne/20 border border-champagne/40 flex items-center justify-center text-champagne">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white">Coursiers V\u00e9rifi\u00e9s & Paiement Flex</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Personnel s\u00e9lectionn\u00e9 avec contr\u00f4le d'identit\u00e9. R\u00e9glez par M-Pesa, Orange Money, Airtel ou Cash \u00e0 la livraison.
              </p>
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-navy-800/80 border border-white/10 space-y-4">
              <div className="flex justify-between text-xs text-slate-400 font-mono">
                <span>Planifier une r\u00e9currence:</span>
                <span className="text-champagne font-bold">{isSaved ? "Sauvegard\u00e9 \u2713" : "S\u00e9lectionner jour"}</span>
              </div>

              <div className="grid grid-cols-7 gap-1.5 text-center">
                {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, i) => (
                  <button
                    key={i}
                    onClick={() => { setActiveDay(i); setIsSaved(false); }}
                    className={`py-2 text-xs font-bold rounded-xl transition-all ${
                      activeDay === i 
                        ? 'bg-gradient-to-t from-electric to-cyanAccent text-obsidian shadow-lg scale-105' 
                        : 'bg-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setIsSaved(true)}
                className={`w-full py-2.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  isSaved 
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                    : 'bg-electric hover:bg-blue-600 text-white'
                }`}
              >
                {isSaved ? <CheckCircle2 className="w-4 h-4" /> : <Lock className="w-3.5 h-3.5" />}
                {isSaved ? "Cr\u00e9neau S\u00e9curis\u00e9" : "Valider la course planifi\u00e9e"}
              </button>
            </div>

            <div className="pt-4 text-xs font-mono text-slate-500 text-center">
              \ud83d\udd12 Code OTP requis \u00e0 la r\u00e9ception
            </div>
          </div>
        </div>
      </section>

      {/* MANIFESTO SECTION */}
      <section ref={manifestoRef} className="py-28 px-6 md:px-16 bg-navy-900 border-y border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-15">
          <img 
            src="https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=2000&q=80" 
            alt="Kinshasa Texture" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto space-y-12 text-left">
          <div className="gsap-manifesto-text space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-cyanAccent">Notre Manifeste</span>
            <p className="text-slate-400 text-lg md:text-xl font-light">
              La plupart des services de livraison \u00e0 Kinshasa se concentrent sur : <span className="text-slate-300 italic">la simple mise en relation sans garantie de d\u00e9lai ni suivi pr\u00e9cis.</span>
            </p>
          </div>

          <div className="gsap-manifesto-text">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif italic text-white leading-tight">
              Nous nous concentrons sur : <br className="hidden md:block" />
              <span className="font-sans not-italic font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-champagne via-cyanAccent to-white">
                la pr\u00e9cision chirurgicale et la garantie absolue de vos colis.
              </span>
            </h2>
          </div>

          <div className="gsap-manifesto-text pt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-champagne font-mono text-xl font-bold mb-1">01. S\u00e9curit\u00e9 OTP</p>
              <p className="text-slate-300 text-sm">Chaque colis est verrouill\u00e9 num\u00e9riquement jusqu'au d\u00e9verrouillage par votre code confidentiel.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-cyanAccent font-mono text-xl font-bold mb-1">02. R\u00e9seau Optimis\u00e9</p>
              <p className="text-slate-300 text-sm">Des coursiers positionn\u00e9s strat\u00e9giquement \u00e0 Gombe, Ngaliema, Limete et Bandal.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-white font-mono text-xl font-bold mb-1">03. Support WhatsApp 24/7</p>
              <p className="text-slate-300 text-sm">Une \u00e9quipe d\u00e9di\u00e9e vous r\u00e9ponds instantan\u00e9ment \u00e0 n'importe quelle heure du jour ou de la nuit.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PROTOCOL SECTION */}
      <section id="protocole" className="py-24 px-6 md:px-16 max-w-6xl mx-auto space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-champagne">Comment \u00c7a Marche</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white">Votre livraison en 3 \u00e9tapes simples</h2>
          <p className="text-slate-400 text-sm md:text-base">Un processus fluide con\u00e7u pour une exp\u00e9rience z\u00e9ro stress \u00e0 Kinshasa.</p>
        </div>

        <div className="space-y-12">
          {/* Step 1 */}
          <div className="gsap-protocol-card sticky top-28 glass-card rounded-[3rem] p-8 md:p-14 border border-white/10 shadow-2xl flex flex-col md:flex-row items-center gap-10 bg-obsidian">
            <div className="w-full md:w-1/2 space-y-6">
              <div className="inline-block px-4 py-1.5 rounded-full bg-electric/20 text-electric font-mono text-sm font-bold">\u00c9TAPE 01</div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-white">Commandez en 1-Clic sur l'Application</h3>
              <p className="text-slate-300 text-base leading-relaxed">Indiquez le point de ramassage et de livraison dans Kinshasa. Obtenez une estimation de tarif fixe et transparente sans mauvaise surprise.</p>
              <ul className="space-y-2 text-sm text-slate-400 font-mono">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyanAccent" /> Estimation instantan\u00e9e du prix</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyanAccent" /> Choix du type de v\u00e9hicule (Moto / Voiture)</li>
              </ul>
            </div>
            <div className="w-full md:w-1/2 h-64 rounded-2xl bg-navy-800/80 border border-electric/30 flex items-center justify-center relative overflow-hidden">
              <div className="absolute w-48 h-48 rounded-full border border-electric/20 animate-ping"></div>
              <div className="absolute w-32 h-32 rounded-full border border-cyanAccent/40 animate-pulse"></div>
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-electric to-cyanAccent flex items-center justify-center shadow-xl shadow-electric/50 z-10">
                <Crosshair className="w-8 h-8 text-obsidian animate-spin" style={{ animationDuration: '12s' }} />
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="gsap-protocol-card sticky top-32 glass-card rounded-[3rem] p-8 md:p-14 border border-white/10 shadow-2xl flex flex-col md:flex-row items-center gap-10 bg-navy-900">
            <div className="w-full md:w-1/2 space-y-6">
              <div className="inline-block px-4 py-1.5 rounded-full bg-cyanAccent/20 text-cyanAccent font-mono text-sm font-bold">\u00c9TAPE 02</div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-white">Assignation Express & Suivi GPS Direct</h3>
              <p className="text-slate-300 text-base leading-relaxed">Le motard le plus proche est d\u00e9p\u00each\u00e9 en moins de 3 minutes. Vous pouvez suivre son itin\u00e9raire en direct sur la carte interactive.</p>
              <ul className="space-y-2 text-sm text-slate-400 font-mono">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyanAccent" /> Nom & photo du coursier certifi\u00e9</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyanAccent" /> Contact direct WhatsApp / Appel</li>
              </ul>
            </div>
            <div className="w-full md:w-1/2 h-64 rounded-2xl bg-obsidian border border-cyanAccent/30 flex flex-col items-center justify-center relative overflow-hidden p-6">
              <div className="w-full h-full border border-dashed border-white/20 rounded-xl relative flex items-center justify-center">
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-cyanAccent to-transparent absolute top-1/2 -translate-y-1/2 animate-pulse"></div>
                <div className="flex items-center gap-3 text-cyanAccent font-mono text-xs">
                  <Activity className="w-5 h-5 animate-bounce" />
                  <span>SATELLITE SYNCING: KIN-RADAR-04</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="gsap-protocol-card sticky top-36 glass-card rounded-[3rem] p-8 md:p-14 border border-white/10 shadow-2xl flex flex-col md:flex-row items-center gap-10 bg-obsidian">
            <div className="w-full md:w-1/2 space-y-6">
              <div className="inline-block px-4 py-1.5 rounded-full bg-champagne/20 text-champagne font-mono text-sm font-bold">\u00c9TAPE 03</div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-white">Livraison S\u00e9curis\u00e9e & Paiement Facile</h3>
              <p className="text-slate-300 text-base leading-relaxed">Le destinataire valide la remise du colis avec le code OTP unique re\u00e7u par SMS. Payez en toute simplicit\u00e9 en Mobile Money ou Cash.</p>
              <ul className="space-y-2 text-sm text-slate-400 font-mono">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-champagne" /> M-Pesa, Orange Money, Airtel Money</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-champagne" /> Re\u00e7u de livraison \u00e9lectronique instantan\u00e9</li>
              </ul>
            </div>
            <div className="w-full md:w-1/2 h-64 rounded-2xl bg-navy-800/80 border border-champagne/30 flex items-center justify-center relative overflow-hidden">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-champagne/20 text-champagne flex items-center justify-center mx-auto border border-champagne/40">
                  <Lock className="w-8 h-8" />
                </div>
                <p className="font-mono text-xs text-champagne tracking-widest uppercase">OTP D\u00c9VERROUILL\u00c9</p>
                <div className="inline-block px-4 py-2 rounded-xl bg-obsidian border border-white/20 font-mono text-lg font-bold text-white">
                  CODE: 4920-OK
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="temoignages" className="py-24 px-6 md:px-16 bg-navy-900/50 border-t border-white/10">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-cyanAccent">Avis Clients</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white">Ce qu'ils disent \u00e0 Kinshasa</h2>
            <p className="text-slate-400 text-base">Entreprises, restaurants et particuliers font confiance \u00e0 LivrExpress.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card glass-card-hover rounded-[2rem] p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-champagne">
                  {[...Array(5)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-champagne" />))}
                </div>
                <p className="text-slate-300 text-sm italic leading-relaxed">
                  \u00ab Pour notre cabinet juridique \u00e0 la Gombe, l'envoi de documents confidentiels exige une s\u00e9curit\u00e9 absolue. LivrExpress nous livre en moins de 30 minutes avec code OTP. Un service irr\u00e9prochable ! \u00bb
                </p>
              </div>
              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-electric to-cyanAccent flex items-center justify-center font-bold text-obsidian text-lg">MB</div>
                <div>
                  <h4 className="font-bold text-white text-sm">Marie-Bernard K.</h4>
                  <p className="text-xs text-slate-400">Directrice Juridique \u2022 Kinshasa Gombe</p>
                </div>
              </div>
            </div>

            <div className="glass-card glass-card-hover rounded-[2rem] p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-champagne">
                  {[...Array(5)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-champagne" />))}
                </div>
                <p className="text-slate-300 text-sm italic leading-relaxed">
                  \u00ab Propri\u00e9taire d'un restaurant \u00e0 Ngaliema, la fra\u00eecheur des plats livr\u00e9s est vitale. Gr\u00e2ce \u00e0 leur sac isotherme et leur rapidit\u00e9, nos clients mangent encore chaud. Merci LivrExpress ! \u00bb
                </p>
              </div>
              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-champagne to-yellow-200 flex items-center justify-center font-bold text-obsidian text-lg">PL</div>
                <div>
                  <h4 className="font-bold text-white text-sm">Patrick L.</h4>
                  <p className="text-xs text-slate-400">Chef de Restaurant \u2022 Ngaliema</p>
                </div>
              </div>
            </div>

            <div className="glass-card glass-card-hover rounded-[2rem] p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-champagne">
                  {[...Array(5)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-champagne" />))}
                </div>
                <p className="text-slate-300 text-sm italic leading-relaxed">
                  \u00ab Je vend des v\u00eatements en ligne sur Instagram. LivrExpress s'occupe de toutes mes livraisons \u00e0 Limete et Bandal tout en encaissant l'argent en Mobile Money pour moi. Un vrai partenaire e-commerce. \u00bb
                </p>
              </div>
              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-400 to-cyanAccent flex items-center justify-center font-bold text-obsidian text-lg">ST</div>
                <div>
                  <h4 className="font-bold text-white text-sm">Sarah T.</h4>
                  <p className="text-xs text-slate-400">Entrepreneuse E-commerce \u2022 Limete</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="tarifs" className="py-24 px-6 md:px-16 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-champagne">Tarifs Limpides</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white">Des formules adapt\u00e9es \u00e0 tous</h2>
          <p className="text-slate-400 text-base">Aucun frais cach\u00e9. Paiement \u00e0 la course ou abonnement entreprise.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          <div className="glass-card rounded-[2.5rem] p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Course Standard</h3>
              <p className="text-slate-400 text-xs">Pour vos envois occasionnels dans la ville.</p>
              <div className="pt-2">
                <span className="text-4xl font-extrabold text-white font-mono">7.000</span>
                <span className="text-xs text-slate-400 ml-1 font-mono">CDF / course</span>
              </div>
              <ul className="space-y-3 pt-4 text-xs text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyanAccent" /> D\u00e9lai moyen 45 \u00e0 60 min</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyanAccent" /> Colis jusqu'\u00e0 10 kg</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyanAccent" /> Suivi SMS & WhatsApp</li>
              </ul>
            </div>
            <button onClick={() => setAppModalOpen(true)} className="w-full py-3 rounded-2xl border border-white/20 text-white hover:bg-white/10 text-xs font-bold transition-all">Commander une course</button>
          </div>

          <div className="glass-card rounded-[2.5rem] p-8 flex flex-col justify-between space-y-6 border-2 border-cyanAccent bg-gradient-to-b from-navy-800 to-obsidian relative scale-105 shadow-2xl shadow-electric/20">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-electric to-cyanAccent text-obsidian font-mono font-bold text-[10px] uppercase px-4 py-1 rounded-full shadow-lg">Le plus populaire</div>
            <div className="space-y-4 pt-2">
              <h3 className="text-2xl font-extrabold text-white flex items-center justify-between">
                Pass Ultra Express
                <Sparkles className="w-5 h-5 text-champagne" />
              </h3>
              <p className="text-slate-300 text-xs">Priorit\u00e9 absolue pour courriers & affaires urgents.</p>
              <div className="pt-2">
                <span className="text-4xl font-extrabold text-cyanAccent font-mono">12.500</span>
                <span className="text-xs text-slate-400 ml-1 font-mono">CDF / course</span>
              </div>
              <ul className="space-y-3 pt-4 text-xs text-slate-200">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyanAccent" /> <strong className="text-white">Garantie 35 minutes chrono</strong></li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyanAccent" /> Coursier VIP prioritaire</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyanAccent" /> Code OTP & assurance incluse</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyanAccent" /> Paiement M-Pesa / Cash</li>
              </ul>
            </div>
            <button onClick={() => setAppModalOpen(true)} className="btn-magnetic w-full py-4 rounded-2xl bg-gradient-to-r from-electric to-cyanAccent text-obsidian font-bold text-xs uppercase tracking-wider shadow-lg shadow-electric/40">
              <span className="btn-slide-bg bg-white/30"></span>
              <span className="relative z-10">Commander en Ultra Express</span>
            </button>
          </div>

          <div className="glass-card rounded-[2.5rem] p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Compte Entreprise</h3>
              <p className="text-slate-400 text-xs">Gestion centralis\u00e9e pour banques, PME & e-commerce.</p>
              <div className="pt-2">
                <span className="text-3xl font-extrabold text-champagne font-mono">Sur Devis</span>
                <span className="text-xs text-slate-400 ml-1 font-mono">/ mois</span>
              </div>
              <ul className="space-y-3 pt-4 text-xs text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-champagne" /> Facturation mensuelle group\u00e9e</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-champagne" /> API int\u00e9gration site web</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-champagne" /> Gestions des retours & encaissements</li>
              </ul>
            </div>
            <button onClick={() => setContactModalOpen(true)} className="btn-magnetic w-full py-3.5 rounded-2xl bg-gradient-to-r from-champagne via-yellow-500 to-amber-600 text-obsidian font-bold text-xs uppercase tracking-wider transition-all text-center flex items-center justify-center gap-2 shadow-lg shadow-champagne/20">
              <span className="btn-slide-bg bg-white/30"></span>
              <Building2 className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Nous contacter</span>
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-obsidian border-t border-white/10 rounded-t-[3rem] md:rounded-t-[4rem] pt-20 pb-12 px-6 md:px-16 text-slate-400">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-white/10">
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-electric flex items-center justify-center text-white font-bold">
                <Zap className="w-4 h-4 fill-white" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">LivrExpress</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">Le service n\u00b01 de livraison rapide et s\u00e9curis\u00e9e \u00e0 Kinshasa. Vos colis en 45 minutes chrono.</p>
            <div className="pt-2 flex items-center gap-2 font-mono text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>SYST\u00c8ME OP\u00c9RATIONNEL KINSHASA</span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#features" className="hover:text-white transition-colors">Avantages Cl\u00e9s</a></li>
              <li><a href="#protocole" className="hover:text-white transition-colors">Comment \u00e7a marche</a></li>
              <li><a href="#temoignages" className="hover:text-white transition-colors">Avis Clients</a></li>
              <li><a href="#tarifs" className="hover:text-white transition-colors">Tarifs & Offres</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider">Communes Couvertes</h4>
            <ul className="grid grid-cols-2 gap-1 text-xs text-slate-400">
              <li>\u2022 Gombe</li>
              <li>\u2022 Ngaliema</li>
              <li>\u2022 Limete</li>
              <li>\u2022 Kintambo</li>
              <li>\u2022 Bandalungwa</li>
              <li>\u2022 Lingwala</li>
              <li>\u2022 Barumbu</li>
              <li>\u2022 Kasavubu</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider">Contact & R\u00e9seaux</h4>
            <div className="space-y-2 text-xs">
              <p className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-electric" />
                Kinshasa, RDC \u2014 Bd du 30 Juin
              </p>
              <p className="flex items-center gap-2 text-slate-300">
                <PhoneCall className="w-4 h-4 text-cyanAccent" />
                +243 810 000 000
              </p>
              <p className="flex items-center gap-2 text-slate-300">
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                WhatsApp: +243 810 000 000
              </p>
            </div>
            <div className="pt-2 flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-electric flex items-center justify-center text-white hover:text-electric transition-colors"><span>FB</span></a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-cyanAccent flex items-center justify-center text-white hover:text-cyanAccent transition-colors"><span>IG</span></a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-champagne flex items-center justify-center text-white hover:text-champagne transition-colors"><span>WA</span></a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 font-mono gap-4">
          <p>\u00a9 {new Date().getFullYear()} LivrExpress Kinshasa. Tous droits r\u00e9serv\u00e9s.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-300">Mentions L\u00e9gales</a>
            <a href="#" className="hover:text-slate-300">Politique de Confidentialit\u00e9</a>
            <a href="#" className="hover:text-slate-300">CGV Delivery</a>
          </div>
        </div>
      </footer>

      {/* APP DOWNLOAD MODAL */}
      {appModalOpen && (
        <div className="fixed inset-0 z-50 bg-obsidian/90 backdrop-blur-2xl flex items-center justify-center p-6">
          <div className="glass-card rounded-[3rem] max-w-lg w-full p-8 md:p-10 border border-cyanAccent/40 space-y-6 relative animate-in fade-in zoom-in duration-300">
            <button onClick={() => setAppModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-white p-2 rounded-full bg-white/10">
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-electric via-cyanAccent to-champagne flex items-center justify-center mx-auto text-obsidian shadow-xl shadow-electric/40">
                <Smartphone className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-extrabold text-white">T\u00e9l\u00e9chargez l'Application LivrExpress</h3>
              <p className="text-slate-300 text-xs">Disponible gratuitement sur iOS et Android pour commander votre coursier \u00e0 Kinshasa en 1 clic.</p>
            </div>

            <div className="bg-white p-6 rounded-3xl w-48 h-48 mx-auto flex items-center justify-center shadow-2xl relative">
              <div className="w-full h-full border-4 border-obsidian rounded-xl flex flex-col justify-between p-2">
                <div className="flex justify-between">
                  <div className="w-8 h-8 bg-obsidian rounded"></div>
                  <div className="w-8 h-8 bg-obsidian rounded"></div>
                </div>
                <div className="text-center font-mono text-[9px] font-bold text-obsidian uppercase tracking-wider">SCANNER KINSHASA</div>
                <div className="flex justify-between items-end">
                  <div className="w-8 h-8 bg-obsidian rounded"></div>
                  <div className="w-6 h-6 bg-electric rounded-full animate-ping"></div>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <a 
                href="https://wa.me/243810000000?text=Bonjour%20LivrExpress,%20je%20souhaite%20commander%20un%20coursier"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-magnetic w-full py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30"
              >
                <MessageSquare className="w-4 h-4" />
                Commander imm\u00e9diatement via WhatsApp
              </a>
              <button onClick={() => setAppModalOpen(false)} className="w-full py-3 rounded-2xl border border-white/20 text-slate-300 hover:text-white text-xs font-semibold">Fermer</button>
            </div>
          </div>
        </div>
      )}

      {/* CONTACT FORM MODAL */}
      {contactModalOpen && (
        <div className="fixed inset-0 z-50 bg-obsidian/90 backdrop-blur-2xl flex items-center justify-center p-4 md:p-6 overflow-y-auto">
          <div className="glass-card rounded-[2.5rem] max-w-lg w-full p-6 md:p-8 border border-champagne/40 space-y-6 relative my-8 animate-in fade-in zoom-in duration-300">
            <button onClick={() => { setContactModalOpen(false); setContactSubmitted(false); }} className="absolute top-6 right-6 text-slate-400 hover:text-white p-2 rounded-full bg-white/10">
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-champagne to-yellow-500 flex items-center justify-center mx-auto text-obsidian shadow-xl shadow-champagne/30">
                <MessageSquare className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-extrabold text-white">Nous Contacter</h3>
              <p className="text-slate-300 text-xs">Devis entreprise sur-mesure, partenariat ou assistance client \u00e0 Kinshasa.</p>
            </div>

            {contactSubmitted ? (
              <div className="text-center space-y-4 py-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-white">Message Envoy\u00e9 avec Succ\u00e8s !</h4>
                <p className="text-slate-300 text-xs leading-relaxed max-w-sm mx-auto">
                  Merci <strong className="text-champagne">{contactForm.name || 'cher client'}</strong>. Notre \u00e9quipe commerciale LivrExpress Kinshasa analyse votre demande et vous recontactera sous 15 minutes.
                </p>
                <div className="pt-4 flex flex-col gap-3">
                  <a 
                    href={`https://wa.me/243810000000?text=${encodeURIComponent(`Bonjour LivrExpress, je suis ${contactForm.name || 'un client'}. Message: ${contactForm.message || 'Demande de devis.'}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Poursuivre la discussion sur WhatsApp
                  </a>
                  <button onClick={() => { setContactModalOpen(false); setContactSubmitted(false); }} className="w-full py-3 rounded-2xl border border-white/20 text-slate-300 hover:text-white text-xs font-semibold">Fermer</button>
                </div>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setContactSubmitted(true); }} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-mono mb-1">Nom & Pr\u00e9nom *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Ex: Jean-Luc Kabamba" 
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full bg-navy-900 border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-champagne"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-mono mb-1">T\u00e9l\u00e9phone / WhatsApp *</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="+243 81..." 
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      className="w-full bg-navy-900 border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-champagne"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-mono mb-1">Commune \u00e0 Kinshasa</label>
                    <select 
                      value={contactForm.commune}
                      onChange={(e) => setContactForm({ ...contactForm, commune: e.target.value })}
                      className="w-full bg-navy-900 border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-champagne"
                    >
                      <option value="Gombe">Gombe</option>
                      <option value="Ngaliema">Ngaliema</option>
                      <option value="Limete">Limete</option>
                      <option value="Bandalungwa">Bandalungwa</option>
                      <option value="Kintambo">Kintambo</option>
                      <option value="Autre commune">Autre commune</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-mono mb-1">Objet de votre demande</label>
                  <select 
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    className="w-full bg-navy-900 border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-champagne"
                  >
                    <option value="Devis Entreprise (Sur mesure)">Devis Compte Entreprise (Sur mesure)</option>
                    <option value="Partenariat Resto / E-commerce">Partenariat Restaurant / E-commerce</option>
                    <option value="Demande d'information">Demande d'information g\u00e9n\u00e9rale</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-mono mb-1">Message / Pr\u00e9cisions</label>
                  <textarea 
                    rows="3"
                    placeholder="D\u00e9crivez votre besoin (nombre de livraisons estim\u00e9, secteur, etc.)..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full bg-navy-900 border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-champagne resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="btn-magnetic w-full py-4 rounded-2xl bg-gradient-to-r from-champagne via-yellow-500 to-amber-600 text-obsidian font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-champagne/30"
                >
                  <span className="btn-slide-bg bg-white/30"></span>
                  <Send className="w-4 h-4 relative z-10" />
                  <span className="relative z-10">Envoyer le message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
