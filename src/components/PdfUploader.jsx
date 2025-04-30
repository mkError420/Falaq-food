import React from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { GlobalWorkerOptions } from 'pdfjs-dist/build/pdf';

// Use the correct worker for version 2.10.377
GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js`;

const PdfUploader = ({ onExtracted }) => {
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const typedArray = new Uint8Array(reader.result);
      const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;

      let text = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const strings = content.items.map(item => item.str).join(' ');
        text += strings + '\n';
      }

      onExtracted(text);
    };
    reader.readAsArrayBuffer(file);
  };

  return <input type="file" accept="application/pdf" onChange={handleFileUpload} />;
};

export default PdfUploader;
















