
import React from 'react';

const steps = [
  {
    id: "01",
    title: "Analyse Stratégique",
    description: "Immersion dans votre vision. Je décompose chaque besoin pour extraire l'essence technologique nécessaire à votre succès."
  },
  {
    id: "02",
    title: "Architecture & Design",
    description: "Conception de la structure. Un mélange précis de stacks modernes et d'interfaces épurées pour une fondation inébranlable."
  },
  {
    id: "03",
    title: "Forge Numérique",
    description: "Développement pur. Chaque ligne de code est optimisée pour la vitesse, la sécurité et l'élégance fonctionnelle."
  },
  {
    id: "04",
    title: "Excellence Continue",
    description: "Déploiement et évolution. Votre solution est propulsée dans l'écosystème numérique avec un suivi millimétré."
  }
];

const Process: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
        <div className="relative">
          <h2 className="text-sm uppercase tracking-[0.5em] text-blue-600 mb-4 font-bold">Système</h2>
          <h3 className="text-5xl md:text-7xl font-serif font-bold italic">Méthodologie.</h3>
          <div className="absolute -bottom-4 left-0 w-24 h-1 bg-blue-600/30"></div>
        </div>
        <p className="max-w-md text-slate-400 font-light leading-relaxed text-lg italic">
          "La perfection est atteinte, non pas lorsqu'il n'y a plus rien à ajouter, mais lorsqu'il n'y a plus rien à retirer."
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative pt-20">
        {/* Ligne de connexion */}
        <div className="hidden lg:block absolute top-[5.5rem] left-0 w-full h-[0.5px] bg-slate-800/50 -z-10"></div>

        {steps.map((step) => (
          <div key={step.id} className="group relative">
            <div className="w-20 h-20 bg-[#020617] border border-slate-800 flex items-center justify-center text-2xl font-serif font-bold text-slate-700 group-hover:text-blue-500 group-hover:border-blue-600 transition-all duration-700 mb-10 shadow-2xl relative overflow-hidden">
               <span className="relative z-10">{step.id}</span>
               <div className="absolute inset-0 bg-blue-600/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            </div>
            
            <h4 className="text-xl font-bold mb-4 group-hover:text-white transition-colors tracking-tight">{step.title}</h4>
            <p className="text-slate-500 text-sm font-light leading-relaxed group-hover:text-slate-300 transition-colors">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Process;
