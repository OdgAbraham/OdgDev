import React, { useMemo } from "react";

const MessageCenter = ({ type = "general", disciplineLevel = 0 }) => {

  const messages = {

    general: [
      "La discipline est une liberté future.",
      "Tu construis ton futur maintenant.",
      "Une impulsion dure 5 minutes.",
      "Tu n’as pas besoin d’obéir à chaque pensée."
    ],

    argent: [
      "L’argent protégé aujourd’hui = liberté demain.",
      "Chaque dépense inutile ralentit ta liberté.",
      "La richesse commence par savoir dire NON.",
      "Ton futur financier dépend de cette décision."
    ],

    discipline: [
      "Tu entraînes ton cerveau comme un muscle.",
      "Chaque résistance te rend plus fort.",
      "La discipline est un avantage compétitif.",
      "Les personnes riches maîtrisent leurs impulsions."
    ],

    danger: [
      "⚠️ Zone de risque comportementale.",
      "Respire avant d’agir.",
      "Le plaisir immédiat n’est jamais gratuit.",
      "Ton cerveau cherche une récompense facile."
    ],

    victoire: [
      "🔥 Excellente maîtrise de toi-même.",
      "Tu deviens plus fort mentalement.",
      "La liberté commence par la discipline.",
      "Continue cette trajectoire."
    ]

  };

  const psychologicalMessages = {
    low: [
      "Tu dois reprendre le contrôle maintenant.",
      "La discipline se construit dans la difficulté.",
      "Ne laisse pas ton cerveau décider pour toi."
    ],

    medium: [
      "Bonne progression.",
      "Tu résistes mieux que la moyenne.",
      "Continue d’entraîner ton esprit."
    ],

    high: [
      "Performance mentale très forte.",
      "Tu développes un vrai contrôle comportemental.",
      "Mental d’investisseur discipliné."
    ]
  };

  const level = useMemo(() => {

    if (disciplineLevel < 30) return "low";
    if (disciplineLevel < 70) return "medium";

    return "high";

  }, [disciplineLevel]);

  const list =
    messages[type] ||
    messages.general;

  const randomMessage = useMemo(() => {

    const pool = [
      ...list,
      ...psychologicalMessages[level]
    ];

    return pool[Math.floor(Math.random() * pool.length)];

  }, [type, level]);

  return (
    <div className="bg-gray-100 rounded-lg p-3 text-sm text-center text-gray-700">

      {randomMessage}

    </div>
  );
};

export default MessageCenter;