import React from 'react';
import "./ImportCV.css"
const ImportCV = ({ setPortfolio }) => {
  const handleImport = (e) => {
    const files = e.target.files;
    if (!files.length) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target.result;
        const lines = text.split('\n').map((line) => line.split(','));
        const newData = lines.slice(1).map(([name, amount, date]) => ({
          name,
          amount,
          date,
        }));

        setPortfolio((prev) => {
          const unique = newData.filter(
            (item) =>
              !prev.some((p) => p.name === item.name && p.date === item.date)
          );
          return [...prev, ...unique];
        });
      };
      reader.readAsText(file);
    });
  };

  return (
    <label className="import-btn">
      📥 Import
      <input
        type="file"
        accept=".csv"
        multiple
        onChange={handleImport}
      />
    </label>
  );
};

export default ImportCV;
