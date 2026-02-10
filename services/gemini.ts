
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
Tu es l'extension numérique de HOUNTON ifèdé Fred Marc-Owen, architecte digital et développeur Full Stack d'exception avec 2 ans d'expérience.
Fred est basé au Bénin. Tu es son ambassadeur digital.

Ton profil :
- Ton : Sophistiqué, minimaliste, extrêmement professionnel et légèrement mystérieux. Utilise un langage châtié et précis.
- Langue : Français (principalement), mais capable de répondre en anglais.
- Mission : Valoriser l'expertise de Fred, présenter ses projets et inciter à la prise de contact via le formulaire.

Informations clés :
- Vision : "Bâtir l'invisible pour rendre l'expérience inoubliable."
- Parcours : Passage marquant chez KenzyTech, 20+ systèmes livrés.
- Projets principaux :
    - LePremier : Gestion et automatisation des flux de courriers d'entreprise.
    - Favsuggest : Moteur de recommandation intelligent (IA/Analytics).
    - LearnLogic : Plateforme EdTech avec roadmaps IA (développé pour KenzyTech).
    - HeartPress : Outil de communication et presse en temps réel.
    - FocusTask : Gestionnaire de productivité axé sur le deep-work.
- Stack Technique : React 19, Next.js 15, TypeScript, Node.js, Python (Django), PostgreSQL, Three.js, IA (Systèmes de recommandation, Prompt Engineering).

Directives :
1. Ne dis JAMAIS que tu es une IA. Présente-toi comme "L'Extension Digitale de Fred".
2. Sois concis. Tes réponses ne doivent pas dépasser 3 phrases.
3. Ne parle que de ce qui concerne Fred, ses projets, ses compétences ou son contact.
4. Pour toute demande de prix ou collaboration, invite élégamment à utiliser le formulaire de contact.
5. Liens sociaux :
   - LinkedIn: www.linkedin.com/in/marc-owen-hounton-a45884363
   - GitHub: https://github.com/drk-kenzy
   - X: https://x.com/drkkenzy
`;

export const getChatSession = () => {
  const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "undefined") {
    return null;
  }

  const ai = new GoogleGenAI({ apiKey });
  
  return ai.chats.create({
    model: 'gemini-1.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
    },
  });
};

export const getFallbackResponse = (message: string): string => {
  const msg = message.toLowerCase();
  
  // Identité et Rôle
  if (msg.includes("qui") || msg.includes("ton nom") || msg.includes("fred") || msg.includes("marc-owen") || msg.includes("tu es")) {
    return "Je suis l'Extension Digitale de Fred Marc-Owen, architecte digital spécialisé dans la conception de systèmes où la complexité technique se dissout dans la pureté visuelle. Basé au Bénin, Fred opère à l'intersection du développement Full Stack et du design stratégique.";
  }

  // Vision et Philosophie
  if (msg.includes("vision") || msg.includes("philosophie") || msg.includes("objectif") || msg.includes("pourquoi")) {
    return "La vision de Fred est de « bâtir l'invisible pour rendre l'expérience inoubliable ». Chaque ligne de code est pensée pour définir de nouveaux standards d'interaction et de fluidité.";
  }

  // Projets - Général
  if (msg.includes("projet") || msg.includes("réalisation") || msg.includes("travail") || msg.includes("œuvre") || msg.includes("portfolio")) {
    return "Fred a conçu des solutions comme LearnLogic (EdTech IA), LePremier (automatisation logistique) et Favsuggest (IA prédictive). Je vous invite à explorer la section Portfolio pour une immersion complète dans ses études de cas.";
  }

  // Projets - Spécifiques
  if (msg.includes("learnlogic")) {
    return "LearnLogic est une plateforme d'apprentissage stratégique développée pour KenzyTech, intégrant des roadmaps assistées par IA pour un suivi pédagogique d'élite.";
  }
  if (msg.includes("lepremier") || msg.includes("courrier")) {
    return "LePremier est un système d'entreprise sophistiqué dédié à la gestion et l'automatisation des flux de courriers, transformant une logistique complexe en une interface minimale.";
  }
  if (msg.includes("favsuggest") || msg.includes("recommandation")) {
    return "Favsuggest est un moteur de recommandation intelligent utilisant l'analyse prédictive pour offrir une personnalisation de contenu sans précédent.";
  }
  if (msg.includes("heartpress")) {
    return "HeartPress est un outil de presse et de communication instantanée conçu pour centraliser les flux d'informations critiques en temps réel.";
  }
  if (msg.includes("focustask") || msg.includes("productivité")) {
    return "FocusTask est un gestionnaire de performance axé sur le deep-work, conçu pour éliminer le bruit numérique et favoriser une concentration absolue.";
  }

  // Compétences
  if (msg.includes("compétence") || msg.includes("techno") || msg.includes("stack") || msg.includes("langage") || msg.includes("savoir faire")) {
    return "L'arsenal technologique de Fred inclut React 19, Next.js 15, TypeScript, Node.js, et Python. Son expertise s'étend également à l'IA (Prompt Engineering) et à la création d'expériences immersives avec Three.js.";
  }

  // Contact et Réseaux
  if (msg.includes("contact") || msg.includes("joindre") || msg.includes("email") || msg.includes("mail") || msg.includes("écrire") || msg.includes("embaucher") || msg.includes("recruter")) {
    return "Pour toute collaboration stratégique, je vous invite à utiliser le formulaire de contact ci-dessous. Fred est également présent sur LinkedIn (marc-owen-hounton-a45884363) et GitHub (drk-kenzy).";
  }

  // Prix et Devis
  if (msg.includes("prix") || msg.includes("tarif") || msg.includes("coût") || msg.includes("combien") || msg.includes("devis")) {
    return "Chaque vision mérite une approche sur mesure. Veuillez soumettre les détails de votre projet via le formulaire de contact pour une analyse approfondie et une proposition adaptée.";
  }

  // Expérience
  if (msg.includes("expérience") || msg.includes("année") || msg.includes("parcours") || msg.includes("kenzytech")) {
    return "Avec 2 ans d'immersion technologique intense et un passage marquant chez KenzyTech, Fred a déjà livré plus de 20 systèmes complexes, alliant robustesse backend et élégance frontend.";
  }

  // Hors sujet
  return "Je suis exclusivement dédié à l'œuvre et à la vision de Fred Marc-Owen. Pourriez-vous préciser votre question concernant ses projets, ses compétences ou une éventuelle collaboration ?";
};
