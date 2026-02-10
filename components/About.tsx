
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex flex-col space-y-24">
        
        {/* En-tête de section monumental */}
        <div className="relative">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <div className="space-y-6">
              <h2 className="text-sm uppercase tracking-[0.8em] text-blue-600 font-bold reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000">L'Origine du Code</h2>
              <h3 className="text-6xl md:text-[10rem] font-serif font-bold leading-[0.85] tracking-tighter">
                Vision <br />
                <span className="italic text-slate-500 font-light">Radicale.</span>
              </h3>
            </div>
            
            <div className="max-w-md pb-4">
              <div className="w-12 h-[1px] bg-blue-600 mb-6"></div>
              <p className="text-xl text-slate-400 font-light leading-relaxed italic">
                "Bâtir l'invisible pour rendre l'expérience inoubliable."
              </p>
            </div>
          </div>
          
          {/* Décoration de fond subtile (Lignes de structure) */}
          <div className="absolute -left-20 top-0 text-[20rem] font-serif font-bold text-white/[0.015] pointer-events-none select-none -z-10">
            BIO
          </div>
        </div>

        {/* Corps du texte en grille asymétrique */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7 space-y-10">
            <div className="space-y-6">
              <p className="text-2xl md:text-3xl text-white font-light leading-snug">
                Je suis <span className="text-blue-500 font-medium">HOUNTON ifèdé Fred Marc-Owen</span>. 
                Un architecte digital spécialisé dans la conception de systèmes où la complexité technique se dissout dans la pureté visuelle.
              </p>
              <p className="text-slate-500 font-light leading-relaxed text-lg">
                Basé au Bénin, j'opère à l'intersection du développement Full Stack et du design stratégique. Mon passage chez <span className="text-white">KenzyTech</span> a consolidé ma capacité à livrer des produits qui ne sont pas seulement fonctionnels, mais qui définissent de nouveaux standards d'interaction.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-center gap-12 lg:pl-12 border-l border-slate-900">
            <div className="group cursor-default">
              <div className="flex items-baseline gap-4">
                <p className="text-5xl font-serif font-bold text-white group-hover:text-blue-500 transition-colors">02</p>
                <p className="text-[10px] uppercase tracking-widest text-slate-600 font-bold">Années de Forge</p>
              </div>
              <div className="w-0 group-hover:w-full h-[1px] bg-blue-600/30 transition-all duration-700 mt-2"></div>
            </div>
            
            <div className="group cursor-default">
              <div className="flex items-baseline gap-4">
                <p className="text-5xl font-serif font-bold text-white group-hover:text-blue-500 transition-colors">20+</p>
                <p className="text-[10px] uppercase tracking-widest text-slate-600 font-bold">Systèmes Livrés</p>
              </div>
              <div className="w-0 group-hover:w-full h-[1px] bg-blue-600/30 transition-all duration-700 mt-2"></div>
            </div>

            <div className="group cursor-default">
              <div className="flex items-baseline gap-4">
                <p className="text-5xl font-serif font-bold text-white group-hover:text-blue-500 transition-colors">1/1</p>
                <p className="text-[10px] uppercase tracking-widest text-slate-600 font-bold">Vision Unique</p>
              </div>
              <div className="w-0 group-hover:w-full h-[1px] bg-blue-600/30 transition-all duration-700 mt-2"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
