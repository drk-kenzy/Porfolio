
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  
  const handleEmailClick = () => {
    const subject = encodeURIComponent(`Nouveau Projet - ${formData.name}`);
    const body = encodeURIComponent(`Nom: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:hountonmarcowen@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleWhatsAppClick = () => {
    const text = encodeURIComponent(`Bonjour Fred, je souhaiterais discuter d'un projet.\nNom: ${formData.name}\nMessage: ${formData.message}`);
    window.open(`https://wa.me/2290141609217?text=${text}`, '_blank');
  };

  const socials = [
    { 
      name: 'LinkedIn', 
      url: 'https://www.linkedin.com/in/marc-owen-hounton-a45884363', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
        </svg>
      )
    },
    { 
      name: 'GitHub', 
      url: 'https://github.com/drk-kenzy', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>
        </svg>
      )
    },
    { 
      name: 'X', 
      url: 'https://x.com/drkkenzy', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.464 -2.464l6.768 -6.768"/>
        </svg>
      )
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
        <div>
          <h2 className="text-sm uppercase tracking-[0.5em] text-slate-500 mb-4">Contact</h2>
          <h3 className="text-5xl md:text-7xl font-serif font-bold mb-12">Donnons vie à <br /><span className="italic font-light text-slate-400">vos idées.</span></h3>
          
          <div className="space-y-12">
            <div className="group cursor-pointer">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-600 mb-4">Email Direct</p>
              <a href="mailto:hountonmarcowen@gmail.com" className="text-2xl font-light hover:text-white transition-colors border-b border-transparent hover:border-slate-700 pb-1 inline-block">
                hountonmarcowen@gmail.com
              </a>
            </div>
            
            <div className="group cursor-pointer">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-600 mb-4">WhatsApp Business</p>
              <a href="https://wa.me/2290141609217" target="_blank" rel="noopener noreferrer" className="text-2xl font-light hover:text-white transition-colors border-b border-transparent hover:border-slate-700 pb-1 inline-block">
                +229 01 41 60 92 17
              </a>
            </div>

            <div className="flex gap-10 pt-8">
              {socials.map(social => (
                <a 
                  key={social.name} 
                  href={social.url} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 group/icon transform transition-all duration-300 hover:scale-125"
                  aria-label={social.name}
                >
                  <div className="text-slate-500 group-hover/icon:text-blue-400 transition-colors">
                    {social.icon}
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-slate-600 group-hover/icon:text-white transition-colors opacity-0 group-hover/icon:opacity-100 translate-y-2 group-hover/icon:translate-y-0 duration-300">
                    {social.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="bg-[#0a101f] p-10 border border-slate-800 shadow-2xl rounded-sm">
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Votre Nom</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Ex: Jean Dupont" 
                className="w-full bg-transparent border-b border-slate-800 py-4 focus:border-white outline-none transition-colors font-light text-xl text-white placeholder-slate-700"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Adresse Email</label>
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="jean@exemple.com" 
                className="w-full bg-transparent border-b border-slate-800 py-4 focus:border-white outline-none transition-colors font-light text-xl text-white placeholder-slate-700"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Votre Message</label>
              <textarea 
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                placeholder="Dites-moi tout sur votre projet..." 
                className="w-full bg-transparent border-b border-slate-800 py-4 focus:border-white outline-none transition-colors font-light text-xl text-white resize-none placeholder-slate-700"
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <button 
                onClick={handleEmailClick}
                className="py-5 bg-white text-slate-950 uppercase tracking-[0.2em] text-[10px] font-bold transition-all hover:bg-slate-200"
              >
                Envoyer par Email
              </button>
              <button 
                onClick={handleWhatsAppClick}
                className="py-5 bg-green-900/10 border border-green-800/30 text-green-400 uppercase tracking-[0.2em] text-[10px] font-bold transition-all hover:bg-green-800/20 hover:text-white"
              >
                Via WhatsApp
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
