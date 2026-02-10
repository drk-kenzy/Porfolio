import React from 'react';

const testimonials = [
  {
    quote: "Fred a transformé notre vision complexe en une plateforme intuitive. Sa maîtrise technique n'a d'égal que son sens du détail esthétique. Un véritable partenaire, pas juste un développeur.",
    author: "Directeur Technique",
    company: "LePremier Solutions"
  },
  {
    quote: "La capacité de Fred à naviguer entre le backend lourd (Python) et un frontend fluide (React) est impressionnante. L'outil LearnLogic a révolutionné notre façon de former nos étudiants.",
    author: "Sarah M.",
    company: "EdTech Innovators"
  }
];

const Testimonials: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <h2 className="text-sm uppercase tracking-[0.5em] text-slate-500 mb-16 text-center">Témoignages</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {testimonials.map((item, index) => (
          <div key={index} className="relative p-10 bg-[#0a101f] border border-slate-800/50 hover:border-blue-900/30 transition-all duration-500">
            <div className="absolute top-6 left-6 text-6xl font-serif text-slate-800 leading-none">"</div>
            <p className="relative z-10 text-slate-300 font-light italic text-lg leading-relaxed mb-8 pt-4">
              {item.quote}
            </p>
            <div className="relative z-10 flex items-center gap-4">
              <div className="w-10 h-[1px] bg-blue-900"></div>
              <div>
                <p className="text-sm font-bold text-white uppercase tracking-wider">{item.author}</p>
                <p className="text-xs text-slate-500 uppercase tracking-widest">{item.company}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;