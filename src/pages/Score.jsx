import React from "react";
import { motion } from "framer-motion";

const getLevel = (score) => {
  if (score < 10) return { name: "Début du contrôle", color: "text-gray-500" };
  if (score < 30) return { name: "Apprenti discipliné", color: "text-blue-500" };
  if (score < 60) return { name: "Contrôle mental", color: "text-purple-500" };
  if (score < 100) return { name: "Discipline solide", color: "text-orange-500" };
  return { name: "Maîtrise de soi", color: "text-green-600" };
};

const getMessage = (score) => {
  if (score < 10)
    return "Chaque petite victoire contre l'impulsion entraîne ton cerveau.";
  if (score < 30)
    return "Tu commences à construire ta discipline.";
  if (score < 60)
    return "Ton cerveau apprend à résister.";
  if (score < 100)
    return "La discipline devient ton identité.";
  return "Tu contrôles tes impulsions. Continue.";
};

const Score = ({ score }) => {

  const level = getLevel(score);

  const progress = Math.min((score % 20) * 5, 100);

  return (
    <div className="bg-white p-5 rounded-xl shadow-md flex flex-col items-center gap-3">

      <h2 className="text-xl font-bold text-gray-700">
        Score de Maîtrise
      </h2>

      <motion.div
        key={score}
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-5xl font-extrabold text-green-500"
      >
        {score}
      </motion.div>

      <p className={`font-semibold ${level.color}`}>
        {level.name}
      </p>

      <div className="w-full bg-gray-200 rounded-full h-3 mt-2">

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="bg-green-500 h-3 rounded-full"
        />

      </div>

      <p className="text-gray-500 text-sm text-center mt-2">
        {getMessage(score)}
      </p>

      <p className="text-xs text-gray-400 text-center">
        Chaque impulsion résistée renforce ton contrôle.
      </p>

    </div>
  );
};

export default Score;