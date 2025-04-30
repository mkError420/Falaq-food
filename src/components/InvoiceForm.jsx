import React from 'react';

const InvoiceForm = ({ data }) => {
  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '1.5rem',
      borderRadius: '8px',
      maxWidth: '400px',
      backgroundColor: '#f9f9f9',
      color: '#000000',
    }}>
      <h3>Invoice</h3>
      <p><strong>Invoice No:</strong> {data.invoiceNumber}</p>
      <p><strong>Date:</strong> {data.date}</p>
      <p><strong>Total:</strong> {data.total}</p>
    </div>
  );
};

export default InvoiceForm;





