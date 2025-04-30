import React, { useState } from 'react';
import PdfUploader from './components/PdfUploader';
import InvoiceForm from './components/InvoiceForm';
import { parseInvoiceData } from './utils/parseInvoiceData';

const App = () => {
  const [invoiceData, setInvoiceData] = useState(null);
  const [rawText, setRawText] = useState('');

  const handleExtractedText = (text) => {
    setRawText(text); // Optional: show raw text for debugging
    const parsed = parseInvoiceData(text);
    setInvoiceData(parsed);
  };

  // Table data extraction
  const extractTableData = (text) => {
    const lines = text.split('\n').filter(Boolean);

    return lines.map((line, index) => {
      const [key, ...rest] = line.split(':');
      if (rest.length > 0) {
        return { key: key.trim(), value: rest.join(':').trim() };
      } else {
        return { key: `Line ${index + 1}`, value: line.trim() };
      }
    });
  };

  // Print function for a specific section
  const printSection = (sectionId) => {
    const printContent = document.getElementById(sectionId).innerHTML;
    const newWindow = window.open('', '', 'height=600,width=800');
    newWindow.document.write('<html><head><title>Print Section</title></head><body>');
    newWindow.document.write(printContent);
    newWindow.document.write('</body></html>');
    newWindow.document.close();
    newWindow.print();
  };

  return (
    <div style={{ backgroundColor: '#000000', minHeight: '100vh', padding: '20px', color: '#ffff' }}>
      <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
        <h1>Falaq  Invoice</h1>
        <PdfUploader onExtracted={handleExtractedText} />

        <hr />

        <h2>Parsed Invoice Data</h2>
        {invoiceData ? (
          <InvoiceForm data={invoiceData} />
        ) : (
          <p>No invoice here.</p>
        )}

        <h3>Here is information</h3>
        <div>
          {extractTableData(rawText).map((row, index) => {
            const sectionId = `section-${index}`; // Unique ID for each section
            return (
              <div
                key={index}
                id={sectionId}
                style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}
              >
                <h4>Product {index + 1}</h4>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                 
                    <tr>
                      <th style={{ border: '1px solid #ccc', padding: '8px' }}>Name</th>
                      <th style={{ border: '1px solid #ccc', padding: '8px' }}>Location</th>
                      <th style={{ border: '1px solid #ccc', padding: '8px' }}>Pone Number</th>
                      <th style={{ border: '1px solid #ccc', padding: '8px' }}>Product</th>
                      <th style={{ border: '1px solid #ccc', padding: '8px' }}>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{row.key}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{row.value}</td>
                     
                    </tr>
                  </tbody>
                </table>

                {/* Print Button */}
                <button
                  onClick={() => printSection(sectionId)}
                  style={{
                    marginTop: '10px',
                    padding: '8px 16px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Print This
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
