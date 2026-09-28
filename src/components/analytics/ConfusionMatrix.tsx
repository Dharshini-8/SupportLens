import React from 'react';

interface MatrixProps {
  intents: string[];
}

export const ConfusionMatrix: React.FC<MatrixProps> = ({ intents }) => {
  // Generate a realistic confusion matrix with high diagonal values (90-96%) and slight off-diagonal confusion
  const getConfusionValue = (actualIdx: number, predIdx: number): number => {
    if (actualIdx === predIdx) {
      return 88 + ((actualIdx * 3) % 9); // 88% - 96% diagonal correctness
    }
    // Off-diagonal confusion pairs
    if (actualIdx === 0 && predIdx === 6) return 4.8; // Refund -> Cancel
    if (actualIdx === 4 && predIdx === 1) return 3.6; // Payment fail -> Dup charge
    if (actualIdx === 2 && predIdx === 3) return 2.9; // Account access -> Security
    if (actualIdx === 5 && predIdx === 0) return 2.2; // Order status -> Refund
    return Math.round(((actualIdx * 7 + predIdx * 11) % 15) * 10) / 100; // 0.1% - 1.4% background noise
  };

  return (
    <div className="overflow-x-auto p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-xs">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
          Intent Classification Confusion Matrix (%)
        </h3>
        <span className="text-[10px] text-gray-400 font-mono">Row: Actual Class | Column: Predicted Class</span>
      </div>

      <div className="min-w-[650px]">
        <table className="w-full text-center text-[10px] border-collapse">
          <thead>
            <tr>
              <th className="p-2 text-left bg-gray-50 dark:bg-gray-800 text-gray-500 font-semibold border border-gray-200 dark:border-gray-700">
                Actual \ Pred
              </th>
              {intents.map((intent, i) => (
                <th key={i} className="p-2 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold border border-gray-200 dark:border-gray-700 max-w-[70px] truncate" title={intent}>
                  {intent.split(' ')[0]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {intents.map((actualIntent, r) => (
              <tr key={r}>
                <td className="p-2 text-left font-semibold bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 truncate max-w-[100px]">
                  {actualIntent}
                </td>
                {intents.map((_, c) => {
                  const val = getConfusionValue(r, c);
                  const isDiagonal = r === c;
                  const isHighConfused = !isDiagonal && val > 2.5;

                  let cellBg = 'bg-white dark:bg-gray-900 text-gray-400';
                  if (isDiagonal) {
                    cellBg = 'bg-blue-600 text-white font-bold';
                  } else if (isHighConfused) {
                    cellBg = 'bg-amber-500 text-white font-bold animate-pulse';
                  } else if (val > 1.0) {
                    cellBg = 'bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-200 font-semibold';
                  }

                  return (
                    <td key={c} className={`p-2 border border-gray-200 dark:border-gray-800 ${cellBg}`} title={`Actual: ${actualIntent} -> Predicted: ${intents[c]} (${val}%)`}>
                      {val}%
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
