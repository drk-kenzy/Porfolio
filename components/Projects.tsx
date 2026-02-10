
import React, { useState, useEffect, useRef } from 'react';

interface Project {
  title: string;
  category: string;
  image: string;
  description: string;
  repoUrl: string;
  demoUrl: string;
}

const projects: Project[] = [
  {
    title: "LePremier - Courriers",
    category: "Solution d'Entreprise",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1200",
    description: "Système de gestion et d'automatisation des flux de courriers. Une interface minimale pour une logistique complexe.",
    repoUrl: "https://github.com/drk-kenzy",
    demoUrl: "#"
  },
  {
    title: "Favsuggest",
    category: "AI / Analytics",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
    description: "Moteur de recommandation intelligent. Analyse prédictive des préférences pour une personnalisation de contenu sans précédent.",
    repoUrl: "https://github.com/drk-kenzy",
    demoUrl: "#"
  },
  {
    title: "LearnLogic",
    category: "EdTech • Pour KenzyTech",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200",
    description: "Plateforme d'apprentissage stratégique développée spécifiquement pour KenzyTech. Roadmaps assistées par IA et suivi pédagogique.",
    repoUrl: "https://github.com/drk-kenzy",
    demoUrl: "#"
  },
  {
    title: "HeartPress",
    category: "Communication Temps-Réel",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1200",
    description: "Outil de presse et de communication instantanée. Centralisation des flux d'informations critiques en temps réel.",
    repoUrl: "https://github.com/drk-kenzy",
    demoUrl: "#"
  },
  {
    title: "FocusTask",
    category: "Outil de Performance",
    image: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&q=80&w=1200",
    description: "Gestionnaire de productivité axé sur le deep-work. Élimination du bruit numérique pour une concentration absolue.",
    repoUrl: "https://github.com/drk-kenzy",
    demoUrl: "#"
  }
];

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [translateY, setTranslateY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const cardCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;
      const distanceFromCenter = cardCenter - viewportCenter;
      const offset = distanceFromCenter * 0.1;
      setTranslateY(offset);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="group cursor-default reveal-on-scroll opacity-0 translate-y-20 transition-all duration-1000 ease-out">
      <div className="relative aspect-[16/11] overflow-hidden mb-10 bg-slate-900 border border-slate-800/50 shadow-2xl rounded-sm">
        
        {!isLoaded && (
          <div className="absolute inset-0 bg-slate-800 animate-pulse"></div>
        )}

        <div 
          className="absolute inset-0 w-full h-[120%] -top-[10%] transition-transform duration-500 ease-out will-change-transform"
          style={{ transform: `translateY(${translateY}px)` }}
        >
          <img 
            src={project.image} 
            alt={project.title}
            onLoad={() => setIsLoaded(true)}
            className={`w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 scale-100 group-hover:scale-105 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>
        
        <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-transparent transition-colors duration-700"></div>
        
        <div className="absolute inset-0 flex items-center justify-center gap-6 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
          <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="p-5 bg-white text-slate-950 rounded-full hover:scale-110 transition-transform shadow-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
          </a>
        </div>

        <div className="absolute bottom-6 left-6 py-1.5 px-4 bg-slate-950/90 backdrop-blur-md border border-slate-800/50 rounded-sm">
           <span className="text-[9px] uppercase tracking-[0.3em] text-blue-400 font-bold">{project.category}</span>
        </div>
      </div>
      
      <div className="space-y-4 px-2">
        <div className="flex items-center gap-4">
          <div className="w-8 h-[1px] bg-blue-600/50"></div>
          <span className="text-slate-700 text-[10px] font-bold tracking-widest uppercase">ID. 0{index + 1}</span>
        </div>
        <h4 className="text-3xl font-serif font-bold group-hover:text-blue-500 transition-colors duration-500 leading-tight">
          {project.title}
        </h4>
        <p className="text-slate-500 font-light leading-relaxed text-base max-w-xl group-hover:text-slate-300 transition-colors duration-500">
          {project.description}
        </p>
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const categories = ["Tous", "Entreprise", "AI / Analytics", "Communication", "Performance"];

  const filteredProjects = activeCategory === "Tous" 
    ? projects 
    : projects.filter(p => p.category.includes(activeCategory));

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12">
        <div className="space-y-4">
          <h2 className="text-sm uppercase tracking-[0.5em] text-blue-500/80 font-bold">Portfolio</h2>
          <h3 className="text-5xl md:text-7xl font-serif font-bold italic text-white">Études de <span className="text-slate-600 not-italic">Cas</span></h3>
        </div>
        
        <div className="flex flex-wrap gap-x-10 gap-y-4 border-b border-slate-800/50 pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-[10px] uppercase tracking-[0.3em] transition-all duration-500 relative pb-2 group ${
                activeCategory === cat ? 'text-white font-bold' : 'text-slate-600 hover:text-slate-300'
              }`}
            >
              {cat}
              <span className={`absolute bottom-0 left-0 h-[2px] bg-blue-600 transition-all duration-500 ${activeCategory === cat ? 'w-full' : 'w-0 group-hover:w-1/2'}`}></span>
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-32">
        {filteredProjects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
