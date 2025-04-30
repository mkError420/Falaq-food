
// In-memory map to store serials for each day
 export const parseInvoiceData = (text) => {
  const lines = text.split('\n');

  // Get current date for invoice
  const invoiceDate = new Date().toLocaleDateString();

  // Helper to generate random 4-digit number
  const getRandom4Digits = () => Math.floor(1000 + Math.random() * 9000);

  // Helper to generate random 3-digit number based on date
  const getDateBased3Digits = () => {
    const now = new Date();
    const seed = now.getFullYear() + now.getMonth() + now.getDate();
    const random = (seed * Math.random()).toString().slice(-3);
    return random.padStart(3, '0');
  };

  // Generate invoice number: FFE-XXXX-XXX
  const invoiceNumber = `FFE-${getRandom4Digits()}-${getDateBased3Digits()}`;

  // Extract total and make it 7 digits
  let total = lines.find(l => l.toLowerCase().includes('total'))?.split(':')[1]?.trim() || '';
  total = total.replace(/[^\d]/g, '');  // Remove non-numeric
  total = total.padStart(7, '0');       // Ensure 7-digit format

  return {
    
    invoiceNumber,
    date: invoiceDate,
    total: total,
  };
}; 






