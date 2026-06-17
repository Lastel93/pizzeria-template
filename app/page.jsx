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
