import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

const microDefisList = [
  {
    id: 1,
    titre: "20 Squats",
    description: "Active ton corps pour casser l'impulsion",
    duree: 60
  },
  {
    id: 2,
    titre: "Marche 10 minutes",
    description: "Bouger aide ton cerveau à se calmer",
    duree: 600
  },
  {
    id: 3,
    titre: "Lecture 20 minutes",
    description: "Transforme ton temps en apprentissage",
    duree: 1200
  },
  {
    id: 4,
    titre: "Apprentissage 20 minutes",
    description: "Investis dans ton cerveau",
    duree: 1200
  },
  {
    id: 5,
    titre: "Mini projet digital 15 minutes",
    description: "Construis ton futur au lieu de consommer",
    duree: 900
  }
];

const successMessages = [
  "🔥 Discipline renforcée !",
  "🏆 Victoire mentale !",
  "💎 Tu deviens plus fort chaque jour !",
  "🧠 Ton cerveau s'entraîne !"
];

const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s < 10 ? "0" : ""}${s}`;
};

const MicroDefis = ({ microDefis, setMicroDefis, setScore }) => {

  const [activeDefi, setActiveDefi] = useState(null);
  const [timer, setTimer] = useState(0);
  const [message, setMessage] = useState("");

  /* =============================
     TIMER SYSTEM
  ============================= */

  useEffect(() => {

    if (!activeDefi) return;

    const interval = setInterval(() => {

      setTimer(prev => {

        if (prev <= 1) {
          completeDefi(activeDefi);
          return 0;
        }

        return prev - 1;

      });

    }, 1000);

    return () => clearInterval(interval);

  }, [activeDefi]);

  /* =============================
     START DEFIS
  ============================= */

  const startDefi = (defi) => {

    if (activeDefi) return;

    setActiveDefi(defi);
    setTimer(defi.duree);
    setMessage("");

  };

  /* =============================
     COMPLETE DEFIS
  ============================= */

  const completeDefi = (defi) => {

    if (!defi) return;

    setMicroDefis(prev => [
      ...prev,
      {
        ...defi,
        date: new Date(),
        status: "complété"
      }
    ]);

    setScore(prev => prev + 2);

    setMessage(
      successMessages[
        Math.floor(Math.random() * successMessages.length)
      ]
    );

    setActiveDefi(null);

  };

  /* =============================
     PROGRESS
  ============================= */

  const progressPercent = activeDefi
    ? (timer / activeDefi.duree) * 100
    : 0;

  /* =============================
     RENDER
  ============================= */

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col gap-5">

      <div>
        <h2 className="text-xl font-bold text-gray-700">
          Micro-Défis Anti-Impulsion
        </h2>

        <p className="text-sm text-gray-500">
          Remplace l'impulsion par une action productive.
        </p>
      </div>

      {/* MESSAGE */}
      {message && (
        <div className="bg-green-100 text-green-700 p-3 rounded-lg text-center text-sm font-semibold">
          {message}
        </div>
      )}

      {/* LISTE DEFIS */}
      {!activeDefi && (
        <div className="flex flex-col gap-3">

          {microDefisList.map(defi => (

            <motion.button
              key={defi.id}
              whileTap={{ scale: 0.97 }}
              onClick={() => startDefi(defi)}
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-4 rounded-xl flex flex-col items-start transition"
            >

              <span className="font-semibold">
                {defi.titre}
              </span>

              <span className="text-sm opacity-80">
                {defi.description}
              </span>

            </motion.button>

          ))}

        </div>
      )}

      {/* DEFIS ACTIF */}
      {activeDefi && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-100 p-5 rounded-xl flex flex-col gap-4"
        >

          <h3 className="font-bold text-lg">
            {activeDefi.titre}
          </h3>

          <p className="text-gray-600">
            {activeDefi.description}
          </p>

          {/* TIMER BAR */}
          <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
            <motion.div
              className="bg-purple-500 h-full"
              animate={{ width: `${progressPercent}%` }}
            />
          </div>

          <p className="text-xl font-bold text-purple-600">
            {formatTime(timer)}
          </p>

          <p className="text-sm text-gray-500">
            Concentre-toi sur l'action. L'impulsion disparaîtra.
          </p>

        </motion.div>
      )}

      {/* STATS */}
      <div className="border-t pt-3 text-sm text-gray-600">
        Défis complétés :
        <span className="font-bold ml-1">
          {microDefis.length}
        </span>
      </div>

    </div>
  );
};

export default MicroDefis;