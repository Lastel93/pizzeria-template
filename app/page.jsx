'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Mock dei dati che arriveranno da Supabase basati sullo schema definito
const restaurantData = {
  name: "Pizzeria Da Mario",
  phone_whatsapp: "393331234567",
  address: "Via Roma 10, Torino",
  description: "La vera pizza napoletana a lunga lievitazione, direttamente a casa tua.",
  cover_image_url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070",
  settings: {
    whatsapp_message_template: "Ciao! Vorrei ordinare: "
  }
};

const categories = ["Le Classiche", "Le Speciali", "Bevande"];

const menuItems = [
  { id: 1, category: "Le Classiche", name: "Margherita", description: "Pomodoro, mozzarella fiordilatte, basilico fresco, olio EVO", price: 6.50, is_available: true },
  { id: 2, category: "Le Classiche", name: "Diavola", description: "Pomodoro, mozzarella, salame piccante calabrese", price: 8.00, is_available: true },
  { id: 3, category: "Le Speciali", name: "Burrata e Pistacchio", description: "Mozzarella, mortadella, burrata pugliese, granella di pistacchio", price: 11.00, is_available: true },
];

export default function Page() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  // Generatore di Link WhatsApp per singolo piatto
  const generateWhatsAppLink = (itemName, itemPrice) => {
    const baseText = restaurantData.settings.whatsapp_message_template;
    const text = `${baseText}1x ${itemName} (€${itemPrice.toFixed(2)})`;
    return `https://wa.me/${restaurantData.phone_whatsapp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans antialiased" style={{ fontFamily: 'system-ui, sans-serif' }}>
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={restaurantData.cover_image_url} 
            alt={restaurantData.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-2xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 text-white"
          >
            {restaurantData.name}
          </motion.h1>
          <p className="text-neutral-300 text-lg md:text-xl mb-8 font-light">
            {restaurantData.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href={`https://wa.me/${restaurantData.phone_whatsapp}`}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-8 py-4 rounded-full shadow-lg transition-all text-center flex items-center justify-center gap-2"
            >
              <span>Ordina su WhatsApp</span> 🍕
            </a>
          </div>
        </div>
      </section>

      {/* 2. STATO LIVE & INFO RAPIDE */}
      <div className="bg-neutral-900 border-y border-neutral-800 py-4 px-6 sticky top-0 z-50 backdrop-blur-md bg-opacity-80">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-between items-center text-sm gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
            <span className="font-medium text-emerald-400">Aperto Ora</span>
          </div>
          <div className="text-neutral-400">{restaurantData.address}</div>
        </div>
      </div>

      {/* 3. SEZIONE MENU */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center tracking-tight">Il Nostro Menu</h2>
        
        {/* Navigation Tabs */}
        <div className="flex justify-center gap-2 mb-12 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat 
                  ? 'bg-white text-neutral-950 shadow-md' 
                  : 'bg-neutral-900 text-neutral-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid gap-6">
          {menuItems
            .filter(item => item.category === activeCategory)
            .map((item) => (
              <motion.div 
                layout
                key={item.id}
                className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-neutral-700 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-baseline justify-between mb-1">
                    <h3 className="text-xl font-bold text-white">{item.name}</h3>
                    <span className="text-lg font-semibold text-emerald-400">€{item.price.toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-neutral-400 font-light max-w-xl">{item.description}</p>
                </div>
                
                <div className="flex sm:justify-end">
                  {item.is_available ? (
                    <a
                      href={generateWhatsAppLink(item.name, item.price)}
                      className="w-full sm:w-auto bg-neutral-800 hover:bg-emerald-600 hover:text-white text-neutral-300 text-sm font-medium px-4 py-2.5 rounded-xl transition-all text-center flex items-center justify-center gap-1.5"
                    >
                      <span>Ordina</span>
                      <span>→</span>
                    </a>
                  ) : (
                    <span className="text-xs text-neutral-500 uppercase tracking-wider bg-neutral-950 px-3 py-1.5 rounded-lg">Esaurito</span>
                  )}
                </div>
              </motion.div>
            ))}
        </div>
      </section>

      {/* 4. FOOTER */}
      <footer className="bg-neutral-900 border-t border-neutral-800 py-12 px-4 text-center text-neutral-500 text-sm">
        <p className="mb-2 text-neutral-400">© 2026 {restaurantData.name}. Tutti i diritti riservati.</p>
        <p>Sito web ultra-veloce ottimizzato per ordini diretti.</p>
      </footer>

    </div>
  );
}
