import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MessageCenter from "../components/MessageCenter";

import {
  Brain,
  Coins,
  Coffee,
  Heart,
  Users,
  Timer,
  ShieldCheck,
  AlertTriangle
} from "lucide-react";

const IMPULSION_TYPES = [
  { name: "Ennui", icon: <Coffee size={18} /> },
  { name: "Argent", icon: <Coins size={18} /> },
  { name: "Faim", icon: <Heart size={18} /> },
  { name: "Stress", icon: <AlertTriangle size={18} /> },
  { name: "Solitude", icon: <Users size={18} /> }
];

const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s < 10 ? "0" : ""}${s}`;
};

const Impulsion = ({
  impulsions,
  setImpulsions,
  setScore,
  argent,
  setArgent
}) => {

  const [type, setType] = useState(null);
  const [active, setActive] = useState(false);
  const [timer, setTimer] = useState(180);
  const [messageType, setMessageType] = useState("general");

  // Timer system
  useEffect(() => {

    if (!active) return;

    const interval = setInterval(() => {

      setTimer(prev => {

        if (prev <= 1) {
          setActive(false);
          return 0;
        }

        return prev - 1;

      });

    }, 1000);

    return () => clearInterval(interval);

  }, [active]);

  // Start impulsion
  const startImpulsion = (selected) => {

    if (active) return;

    setType(selected);
    setActive(true);
    setTimer(180);

    setMessageType(
      selected === "Argent"
        ? "argent"
        : "general"
    );

    setImpulsions(prev => [
      ...prev,
      {
        type: selected,
        status: "en cours",
        date: new Date()
      }
    ]);
  };

  // Résister
  const completeImpulsion = () => {

    setActive(false);

    setImpulsions(prev =>
      prev.map((i, idx) =>
        idx === prev.length - 1
          ? { ...i, status: "résistée" }
          : i
      )
    );

    setScore(prev => prev + 1);
    setMessageType("victoire");
  };

  // Craquer
  const failImpulsion = () => {

    setActive(false);

    setImpulsions(prev =>
      prev.map((i, idx) =>
        idx === prev.length - 1
          ? { ...i, status: "craquée" }
          : i
      )
    );

    if (argent && setArgent) {
      setArgent(prev => ({
        ...prev,
        fonctionnement: Math.max(0, prev.fonctionnement - 5000)
      }));
    }

    setScore(prev => prev - 1);
    setMessageType("danger");
  };

  const progressPercent = (timer / 180) * 100;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col gap-5">

      {/* HEADER */}
      <div className="flex items-center gap-2 text-xl font-bold text-gray-700">
        <Brain className="text-blue-500" />
        <span>Coach Impulsivité</span>
      </div>

      {/* TYPES */}
      <div className="flex flex-wrap gap-3">

        {IMPULSION_TYPES.map(t => (
          <button
            key={t.name}
            onClick={() => startImpulsion(t.name)}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition"
          >
            {t.icon}
            {t.name}
          </button>
        ))}

      </div>

      {/* PANEL ACTIF */}
      {active && (

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-100 rounded-xl p-5 flex flex-col gap-4"
        >

          <MessageCenter type={messageType} />

          {/* TIMER */}
          <div className="flex items-center gap-2 text-lg font-bold">
            <Timer size={20} />
            Temps restant : {formatTime(timer)}
          </div>

          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <motion.div
              className="bg-green-500 h-full"
              animate={{ width: `${progressPercent}%` }}
            />
          </div>

          <p className="text-sm text-gray-600">
            🌿 3 minutes pour reprendre le contrôle de ta décision.
          </p>

          {/* ACTIONS */}
          <div className="flex gap-3">

            <button
              onClick={completeImpulsion}
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl"
            >
              <ShieldCheck size={18} />
              J'ai résisté
            </button>

            <button
              onClick={failImpulsion}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
            >
              <AlertTriangle size={18} />
              J'ai craqué
            </button>

          </div>

        </motion.div>

      )}

    </div>
  );
};

export default Impulsion;