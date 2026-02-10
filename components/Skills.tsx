
import React from 'react';

const skillGroups = [
  {
    title: "Ingénierie Frontend",
    level: "Expert",
    skills: ["React 19 / Next.js 15", "TypeScript & ES6+", "Tailwind CSS / SCSS", "Three.js / Canvas", "Framer Motion"]
  },
  {
    title: "Puissance Backend",
    level: "Avancé",
    skills: ["Node.js & Express", "Python (Django)", "PostgreSQL / Prisma", "API REST & GraphQL", "Redis / WebSockets"]
  },
  {
    title: "Algorithmique & IA",
    level: "Innovation",
    skills: ["Machine Learning Basics", "Systèmes de Recommandation", "Prompt Engineering", "Data Structures", "Optimisation"]
  },
  {
    title: "DevOps & Outils",
    level: "Robuste",
    skills: ["Docker / CI/CD", "Git & GitHub Workflow", "Vercel / AWS", "Testing (Jest / Vitest)", "Méthodes Agiles"]
  }
];

const Skills: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8">
        <div>
          <h2 className="text-sm uppercase tracking-[0.5em] text-slate-500 mb-4">Compétences</h2>
          <h3 className="text-4xl md:text-5xl font-serif font-bold italic">2 Ans d'Immersion <br /> <span className="text-blue-500">Technologique</span></h3>
        </div>
        <p className="max-w-md text-slate-400 font-light leading-relaxed">
          Un arsenal moderne forgé par des défis réels. Chaque technologie est choisie pour sa performance et sa scalabilité.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {skillGroups.map((group, index) => (
          <div key={index} className="relative group">
            {/* Animated Glow Border */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-10 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            
            <div className="relative h-full space-y-8 p-10 bg-[#0a101f] border border-slate-800/50 hover:border-blue-500/30 transition-all duration-500 rounded-sm">
              <div className="flex justify-between items-start border-b border-slate-800 pb-4 group-hover:border-blue-500/30">
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-white">
                  {group.title}
                </h4>
                <span className="text-[8px] px-2 py-0.5 border border-blue-500/50 text-blue-400 rounded-full font-bold uppercase">
                  {group.level}
                </span>
              </div>
              <ul className="space-y-4">
                {group.skills.map((skill, i) => (
                  <li key={i} className="text-slate-400 font-light flex items-center gap-3 text-sm group-hover:text-slate-200 transition-colors">
                    <span className="w-1.5 h-[1px] bg-blue-500 group-hover:w-3 transition-all duration-300"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
