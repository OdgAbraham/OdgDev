import React, { useState, useMemo } from "react";
import Score from "./Score";
import Impulsion from "./Impulsion";
import MicroDefis from "./MicroDefis";
import ArgentProtege from "./ArgentProtege";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Dashboard = () => {

  // SCORE DISCIPLINE
  const [score, setScore] = useState(0);

  // IMPULSIONS
  const [impulsions, setImpulsions] = useState([]);

  // MICRO DEFIS
  const [microDefis, setMicroDefis] = useState([]);

  // ARGENT
  const [argent, setArgent] = useState({
    total: 0,
    protege: 0,
    fonctionnement: 0,
    social: 0,
  });

  // =============================
  // STATISTIQUES AUTOMATIQUES
  // =============================

  const stats = useMemo(() => {

    const resistes = impulsions.filter(
      (i) => i.status === "résistée"
    ).length;

    const craques = impulsions.filter(
      (i) => i.status === "craquée"
    ).length;

    const totalImpulsions = impulsions.length;

    const disciplineRate =
      totalImpulsions === 0
        ? 0
        : Math.round((resistes / totalImpulsions) * 100);

    const argentPerdu = craques * 5000;

    return {
      resistes,
      craques,
      totalImpulsions,
      disciplineRate,
      argentPerdu,
    };

  }, [impulsions]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      <Navbar />

      <main className="flex flex-col lg:flex-row flex-1 p-6 gap-6">

        <div className="flex flex-col gap-6 lg:w-2/3">

          <Impulsion
            impulsions={impulsions}
            setImpulsions={setImpulsions}
            setScore={setScore}
            argent={argent}
            setArgent={setArgent}
          />

          <MicroDefis
            microDefis={microDefis}
            setMicroDefis={setMicroDefis}
            setScore={setScore}
          />

          {/* HISTORIQUE DES IMPULSIONS */}

          <div className="bg-white p-5 rounded-xl shadow-md">

            <h2 className="text-xl font-bold text-gray-700 mb-3">
              Historique des impulsions
            </h2>

            {impulsions.length === 0 && (
              <p className="text-gray-500 text-sm">
                Aucune impulsion enregistrée
              </p>
            )}

            <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">

              {impulsions.map((i, index) => (

                <div
                  key={index}
                  className="flex justify-between text-sm border-b pb-1"
                >

                  <span>{i.type}</span>

                  <span
                    className={
                      i.status === "résistée"
                        ? "text-green-600"
                        : i.status === "craquée"
                        ? "text-red-600"
                        : "text-gray-500"
                    }
                  >
                    {i.status}
                  </span>

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* ========================
            COLONNE GAUCHE
        ======================== */}

        <div className="flex flex-col gap-6 lg:w-1/3">
<ArgentProtege
            argent={argent}
            setArgent={setArgent}
          />

          <Score score={score} />

          
          {/* STATISTIQUES */}

          <div className="bg-white p-5 rounded-xl shadow-md flex flex-col gap-3">

            <h2 className="text-xl font-bold text-gray-700">
              Statistiques mentales
            </h2>

            <div className="flex justify-between text-sm">
              <span>Impulsions totales</span>
              <span>{stats.totalImpulsions}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span>Résistées</span>
              <span className="text-green-600 font-medium">
                {stats.resistes}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span>Craquées</span>
              <span className="text-red-600 font-medium">
                {stats.craques}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span>Taux de discipline</span>
              <span className="font-bold">
                {stats.disciplineRate} %
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span>Argent perdu</span>
              <span className="text-red-600 font-medium">
                {stats.argentPerdu} F
              </span>
            </div>

          </div>

        </div>

        {/* ========================
            COLONNE DROITE
        ======================== */}

        

      </main>

      <Footer />

    </div>
  );
};

export default Dashboard;