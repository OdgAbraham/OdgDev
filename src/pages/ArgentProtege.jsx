import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  AlertTriangle,
  TrendingUp,
  DollarSign
} from "lucide-react";

import MessageCenter from "../components/MessageCenter";

const formatMoney = (value) =>
  new Intl.NumberFormat("fr-FR").format(value || 0);

const ArgentProtege = ({ argent, setArgent }) => {

  const [messageType, setMessageType] = useState("general");
  const [error, setError] = useState("");

  // ========================
  // ICONS
  // ========================

  const getTitleIcon = () => {

    switch (messageType) {

      case "danger":
        return <AlertTriangle className="text-red-500" />;

      case "victoire":
        return <TrendingUp className="text-green-500" />;

      case "argent":
        return <DollarSign className="text-green-600" />;

      default:
        return <Shield className="text-green-600" />;
    }
  };

  // ========================
  // VALIDATION REVENU
  // ========================

  const validateRevenue = (value) => {

    const num = Number(value);

    if (isNaN(num)) return false;
    if (num < 0) return false;
    if (num > 10000000) return false;

    return true;
  };

  // ========================
  // STRUCTURATION ARGENT
  // ========================

  const repartirArgent = () => {

    setError("");

    if (!argent.total || argent.total <= 0) {
      setError("Entre un revenu valide");
      return;
    }

    const total = Number(argent.total);

    setArgent({
      ...argent,
      protege: Math.floor(total * 0.5),
      fonctionnement: Math.floor(total * 0.35),
      social: Math.floor(total * 0.15)
    });

    setMessageType("victoire");
  };

  // ========================
  // CRAQUAGE INTELLIGENT
  // ========================

  const craquage = () => {

    setError("");

    if (!argent.fonctionnement || argent.fonctionnement < 5000) {

      setMessageType("danger");
      setError("Danger — fonds fonctionnement insuffisants");

      return;
    }

    setArgent(prev => ({
      ...prev,
      fonctionnement: Math.max(0, prev.fonctionnement - 5000)
    }));

    setMessageType("danger");
  };

  // ========================
  // UPDATE REVENU
  // ========================

  const updateTotal = (value) => {

    if (!validateRevenue(value)) {
      setError("Valeur de revenu invalide");
      return;
    }

    setError("");

    setArgent(prev => ({
      ...prev,
      total: Number(value)
    }));
  };

  // ========================
  // PERCENTAGES
  // ========================

  const protegePercent = argent.total
    ? (argent.protege / argent.total) * 100
    : 0;

  const fonctionnementPercent = argent.total
    ? (argent.fonctionnement / argent.total) * 100
    : 0;

  const socialPercent = argent.total
    ? (argent.social / argent.total) * 100
    : 0;

  // ========================
  // STATUS
  // ========================

  const statusMessage = useMemo(() => {

    if (!argent.total) return "Entre ton revenu";

    if (argent.protege >= argent.total * 0.5)
      return "🔥 Discipline financière excellente";

    if (argent.protege >= argent.total * 0.3)
      return "✅ Protection correcte";

    return "⚠️ Ton futur financier est fragile";

  }, [argent]);

  return (
    <div className="bg-white p-5 rounded-xl shadow-md flex flex-col gap-4">

      {/* TITLE */}

      <div className="flex items-center gap-2 text-xl font-bold text-gray-700">
        {getTitleIcon()}
        <h2>Argent Protégé</h2>
      </div>

      {/* MESSAGE */}

      <MessageCenter type={messageType} />

      {/* ERROR */}

      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* INPUT */}

      <div className="flex flex-col gap-2">

        <label className="text-sm text-gray-600">
          Ton revenu du mois
        </label>

        <input
          type="number"
          value={argent.total}
          onChange={(e) => updateTotal(e.target.value)}
          className="border p-2 rounded-lg"
          placeholder="Ex : 150000"
        />

        <button
          onClick={repartirArgent}
          className="bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition"
        >
          Structurer mon argent
        </button>

      </div>

      {/* TOTAL */}

      <div className="flex justify-between text-lg font-semibold">
        <span>Total</span>
        <span>{formatMoney(argent.total)} F</span>
      </div>

      {/* BARS */}

      <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden flex">

        <motion.div
          animate={{ width: `${protegePercent}%` }}
          className="bg-green-500"
        />

        <motion.div
          animate={{ width: `${fonctionnementPercent}%` }}
          className="bg-blue-500"
        />

        <motion.div
          animate={{ width: `${socialPercent}%` }}
          className="bg-orange-400"
        />

      </div>

      {/* DETAILS */}

      <div className="space-y-2 text-sm">

        <div className="flex justify-between">
          <span className="text-green-600">Protégé</span>
          <span>{formatMoney(argent.protege)} F</span>
        </div>

        <div className="flex justify-between">
          <span className="text-blue-600">Fonctionnement</span>
          <span>{formatMoney(argent.fonctionnement)} F</span>
        </div>

        <div className="flex justify-between">
          <span className="text-orange-500">Social</span>
          <span>{formatMoney(argent.social)} F</span>
        </div>

      </div>

      {/* CRAQUAGE */}

      <button
        onClick={craquage}
        className="bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
      >
        J'ai craqué (-5000)
      </button>

      {/* STATUS */}

      <div className="bg-gray-100 rounded-lg p-3 text-sm text-center">
        {statusMessage}
      </div>

      <p className="text-xs text-gray-400 text-center">
        Chaque décision financière construit ton futur.
      </p>

    </div>
  );
};

export default ArgentProtege;