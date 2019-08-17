---
title: "Angular Material data table - Export to Excel"
categories: experience
tags: angular
---

Export data to Excel is very useful on data list for nearly every web application. The export feature helps to download the data list in a table as a file format for offline use. Excel format is ideal for exporting data in a file. Mostly the server-side method is used for export a large set of data data to excel. But if you want a client-side solution to export table data to excel, it can be easily done using JavaScript. 

The client-side export functionality makes the web application user-friendly. 

Currently, I am building a brand new application with Angular. There are many places that need to have an export button to basically, download the table view into a xlsx file. 

I will use the [js-xlsx](https://github.com/SheetJS/js-xlsx) for the main exporting function.

There are few things to note

1. `TableUtil` is a class that included all the necessary utility methods for table. All of these are static methods because we want to use them directly.

2. `exportToExcel` function expects a string for the table id, and a desired file name you want to export. I also added the timestamp to the exported file name. 

3. The rest, js-xlsx will take care for us. It is a great library and mature enough, for the excel creation itself. It also allow you to do many other stuffs, such as export in a different format. If you need anything that I didn't mention, please check the [library documentation](https://github.com/SheetJS/js-xlsx)

### Working example

<iframe class="iframe-full-w" src="https://stackblitz.com/edit/angular-material-table-export-excel-file?embed=1"></iframe>

### Code

tableUtil.ts
```javascript
import * as XLSX from "xlsx";

export class TableUtil {
  static exportToExcel(tableId: string, name?: string) {
    let timeSpan = new Date().toISOString();
    let prefix = name || "ExportResult";
    let fileName = `${prefix}-${timeSpan}`;
    let targetTableElm = document.getElementById(tableId);
    let wb = XLSX.utils.table_to_book(targetTableElm, <XLSX.Table2SheetOpts>{ sheet: prefix });
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }
}
```

table-basic-example.html
```html
<div class="export-container">
	<button mat-raised-button color="primary" (click)="exportTable()">Export</button>
</div>

<table id="ExampleTable" mat-table [dataSource]="dataSource" class="mat-elevation-z8">

  <!-- Position Column -->
  <ng-container matColumnDef="position">
    <th mat-header-cell *matHeaderCellDef> No. </th>
    <td mat-cell *matCellDef="let element"> {{element.position}} </td>
  </ng-container>

  <!-- Name Column -->
  <ng-container matColumnDef="name">
    <th mat-header-cell *matHeaderCellDef> Name </th>
    <td mat-cell *matCellDef="let element"> {{element.name}} </td>
  </ng-container>

  <!-- Weight Column -->
  <ng-container matColumnDef="weight">
    <th mat-header-cell *matHeaderCellDef> Weight </th>
    <td mat-cell *matCellDef="let element"> {{element.weight}} </td>
  </ng-container>

  <!-- Symbol Column -->
  <ng-container matColumnDef="symbol">
    <th mat-header-cell *matHeaderCellDef> Symbol </th>
    <td mat-cell *matCellDef="let element"> {{element.symbol}} </td>
  </ng-container>

  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
  <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
</table>
```

table-basic-example.ts
```javascript
@Component({
  selector: 'table-basic-example',
  templateUrl: 'table-basic-example.html'
})
export class TableBasicExample {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  exportTable(){
    TableUtil.exportToExcel("ExampleTable");
  }
```
