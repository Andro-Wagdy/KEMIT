import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  constructor(private http: HttpClient) { }

  public getHeaderFromExcel(file: File): Promise<string[]> {
    return new Promise((resolve, reject) => {
      const reader: FileReader = new FileReader();

      reader.onload = () => {

        const data: any = reader.result;
        const workbook: XLSX.WorkBook = XLSX.read(data, { type: 'binary' });
        const worksheetName: string = workbook.SheetNames[0]; // Assuming the first sheet is the one to read

        const worksheet: XLSX.WorkSheet = workbook.Sheets[worksheetName];
        const headers: string[] = [];
        const range: XLSX.Range = XLSX.utils.decode_range(worksheet['!ref'] !);

        for (let C = range.s.c; C <= range.e.c; ++C) {
          const headerCell: XLSX.CellObject = worksheet[XLSX.utils.encode_cell({ c: C, r: 0 })];
          const headerCellValue: string = XLSX.utils.format_cell(headerCell);
          if(headerCellValue!="")
          headers.push(headerCellValue);
        }

        resolve(headers);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsBinaryString(file);
    });
  }
}
