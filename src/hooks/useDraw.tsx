import React, { useState, useEffect } from "react";
import amigoRepository from "../repositories/amigoRepository";

const useDraw = () => {
  const [draws, setDraws] = useState<[]>([]);
  const [stats, setStats] = useState<number[]>();
  const [probability, setProbability] = useState<number[]>([]);
  const [sum, setSum] = useState<number>();
  const [isToday, setIsToday] = useState<boolean>(false);

  const getDraws = async () =>
    setDraws(await amigoRepository.getDraws(isToday));

  function calculateSum(stats: number[]) {
    let globalSum: number = 0;
    for (let i: number = 0; i <= stats.length - 1; i++) {
      globalSum += stats[i];
    }

    setSum(globalSum);
  }

  const countOccurences = () => {
    const result: number[] = [];
    const counter: { [key: number]: number } = {};

    function count(numbers: number[]) {
      for (let num of numbers) {
        counter[num] = (counter[num] || 0) + 1;
      }
    }
    draws?.forEach((draw: number[]) => {
      if (draw.length === 12) count(draw);
    });
    for (let key in counter) {
      result.push(counter[key]);
    }
    setStats(result);
    calculateSum(result);
  };

  function calculateAllProbabilities() {
    for (let i: number = 1; i <= 28; i++) {
      setProbability((old) => [...old, calculateProbability(draws, i)]);
    }
  }

  function calculateProbability(
    previousDraws: number[][],
    targetNumber: number
  ): number {
    const numbersTotal = 28;
    let numbersDrawn = 0;

    // Loop through all previous draws
    for (let i = 0; i < previousDraws.length; i++) {
      // Loop through numbers of specific draw
      for (let j = 0; j < previousDraws[i].length; j++) {
        // Add count if number has been drawn already
        if (previousDraws[i][j] === targetNumber) {
          numbersDrawn++;
        }
      }
    }

    // Calculate probability by dividing total num of numbers with numbers already drawn
    const probability = numbersTotal / numbersDrawn;

    return probability;
  }

  useEffect(() => {
    getDraws();
  }, [isToday]);

  useEffect(() => {
    if (draws) {
      countOccurences();
      calculateAllProbabilities();
    }
  }, [draws]);

  return { draws, stats, sum, probability, isToday, setIsToday };
}

export default useDraw;
