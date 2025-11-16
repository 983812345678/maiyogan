import { Product } from '../types';
import * as XLSX from 'xlsx';

export const exportToExcel = (products: Product[]): string => {
  const dataForExport = products.map(p => ({
    'Name': p.name,
    'Stock on Hand': p.stock,
    'Sales (Today)': p.sales,
    'Remaining Stock': p.stock - p.sales,
    'Wholesale Rate': p.wholesaleRate,
    'Our Rate': p.ourRate,
    'Total Sales Amount': p.sales * p.ourRate,
    'Total Profit': p.sales * (p.ourRate - p.wholesaleRate),
  }));

  const worksheet = XLSX.utils.json_to_sheet(dataForExport);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Daily Report');

  // Add a summary row
  const totalSales = products.reduce((sum, p) => sum + p.sales * p.ourRate, 0);
  const totalProfit = products.reduce((sum, p) => sum + p.sales * (p.ourRate - p.wholesaleRate), 0);

  XLSX.utils.sheet_add_aoa(worksheet, [
    [], // empty row for spacing
    ['', '', '', '', '', '', 'Total Sales:', totalSales],
    ['', '', '', '', '', '', 'Total Profit:', totalProfit]
  ], { origin: -1 });

  // Make columns wider
  const colWidths = [
    { wch: 25 }, { wch: 15 }, { wch: 15 }, { wch: 18 },
    { wch: 18 }, { wch: 15 }, { wch: 20 }, { wch: 18 }
  ];
  worksheet['!cols'] = colWidths;
  
  const today = new Date().toISOString().slice(0, 10);
  const filename = `Maiyogan_Bakery_Report_${today}.xlsx`;
  XLSX.writeFile(workbook, filename);
  return filename;
};