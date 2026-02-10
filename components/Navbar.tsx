
import React from 'react';

interface NavbarProps {
  activeSection: string;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const navItems = [
    { id: 'hero', label: 'Début' },
    { id: 'about', label: 'À Propos' },
    { id: 'projects', label: 'Projets' },
    { id: 'skills', label: 'Expertise' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:py-10 flex justify-between items-center bg-gradient-to-b from-[#020617] to-transparent pointer-events-none">
      <div className="pointer-events-auto cursor-pointer flex items-center gap-2" onClick={() => scrollTo('hero')}>
        <div className="w-2 h-2 bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.8)]"></div>
      </div>
      
      <div className="hidden lg:flex gap-10 bg-[#050b1a]/60 backdrop-blur-xl px-10 py-4 rounded-full border border-slate-800/40 pointer-events-auto shadow-2xl">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className={`text-[10px] uppercase tracking-[0.3em] transition-all duration-300 relative group ${
              activeSection === item.id ? 'text-white font-bold' : 'text-slate-500 hover:text-white'
            }`}
          >
            {item.label}
            <span className={`absolute -bottom-1 left-0 h-[1px] bg-blue-600 transition-all duration-300 ${activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-1/2'}`}></span>
          </button>
        ))}
      </div>
      
      <div className="pointer-events-auto">
         <button 
           onClick={() => scrollTo('contact')}
           className="text-[10px] uppercase tracking-[0.3em] px-8 py-3 bg-white text-slate-950 font-bold hover:bg-slate-200 transition-all shadow-xl shadow-blue-900/10"
         >
           Contactez-nous
         </button>
      </div>
    </nav>
  );
};

export default Navbar;
