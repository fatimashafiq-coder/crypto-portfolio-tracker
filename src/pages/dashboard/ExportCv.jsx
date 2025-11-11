import React from 'react';

const ExportCV = ({ portfolio }) => {
  const handleExport = () => {
    const csvContent = [
      ['Name', 'Amount', 'Date'],
      ...portfolio.map((item) => [item.name, item.amount, item.date]),
    ]
      .map((e) => e.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'portfolio.csv';
    link.click();
  };

  return (
    <button className="button export-btn" onClick={handleExport}>
      📤 Export
    </button>
  );
};

export default ExportCV;
