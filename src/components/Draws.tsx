import React, { useState } from "react";
import useDraw from "../hooks/useDraw";

const Draws = () => {
  const { draws, stats, sum, probability, isToday, setIsToday } = useDraw();

  return (
    <div className="2xl:px-16 xl:px-16 px-6 py-4 font-mono">
      <div>
        <label className="flex items-center gap-2 text-slate-400">
          Aujourd'hui?
          <input
            type="checkbox"
            checked={isToday}
            onChange={() => setIsToday(!isToday)}
          />
        </label>
      </div>

      <div className="flex gap-2 2xl:text-2xl xl:text-2xl text-lg mt-2">
        <h3>Nombre(s) de tirage(s):</h3>
        <span className="font-bold">{draws?.length}</span>
      </div>
      <div className="mt-6">
        {stats?.map((stat, index) => {
          return (
            <div className="flex w-full py-2">
              <span className="w-8 text-xl">{index + 1}</span>
              <span
                className="flex justify-center items-center bg-slate-800"
                style={{ width: `${((stat * 100) / sum!) * 10}%` }}
              >
                <p>{stat}</p>
              </span>
              <p className="ml-2 text-sm flex items-center justify-center px-2">
                {Math.round(probability[index] * 10000) / 10000}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Draws;
