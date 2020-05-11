---
title: "How to export a table or an array in Angular to excel file"
categories: experience
tags: angular
---

Export data to Excel is very useful on the data list for nearly every web application. The export feature helps to download the data list in a table as a file format for offline use. Excel format is ideal for exporting data in a file. Mostly the server-side method is used for export a large set of data to excel. But if you want a client-side solution to export table data to excel, it can be easily done using JavaScript.

The client-side export functionality makes the web application user-friendly.

Currently, I am building a brand new application with Angular. Many places need to have an export button to basically, download the table view into a xlsx file.

I will use the [js-xlsx](https://github.com/SheetJS/js-xlsx) for the main exporting function.

There are a few things to note:

1. `TableUtil` is a class that included all the necessary utility methods for the table. All of these are static methods because we want to use them directly.

2. `exportToExcel` function expects a string for the table id, and a desired file name you want to export. I also added the timestamp to the exported file name.

3. The rest, `js-xlsx` will take care of for us. It is a great library and mature enough, for the excel creation itself. It also allows you to do much more with excel. For instance, you can add more worksheets to a workbook. If you need anything that I didn't mention, please check the [library documentation](https://github.com/SheetJS/js-xlsx)

4. I have tested this method on Angular 5 - 8, work perfectly fine. I haven't had time to test with Ivy and Angular 9 but it should not be a big deal.

5. For export with much more flexibility, check the second method where you can pass an array into the export function and still get the excel file at the end. It will solve a lot of problems for you, e.g export a list of specific columns only.

6. It is purely client side method. So if you have server-side pagination with millions of records on your database and you want to export that millions of records data into an excel file. Do it on the server-side instead.

## Working example

<iframe class="iframe-full-w" src="https://stackblitz.com/edit/angular-material-table-export-excel-file?embed=1"></iframe>

## 1. Export table that was rendered on the UI to Excel file (support both Material table and non Material table)

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

<table id="ExampleTable" mat-table [dataSource]="dataSource">
  <!-- Position Column -->
  <ng-container matColumnDef="position">
    <th mat-header-cell *matHeaderCellDef>No.</th>
    <td mat-cell *matCellDef="let element">{{element.position}}</td>
  </ng-container>

  <!-- Name Column -->
  <ng-container matColumnDef="name">
    <th mat-header-cell *matHeaderCellDef>Name</th>
    <td mat-cell *matCellDef="let element">{{element.name}}</td>
  </ng-container>

  <!-- Weight Column -->
  <ng-container matColumnDef="weight">
    <th mat-header-cell *matHeaderCellDef>Weight</th>
    <td mat-cell *matCellDef="let element">{{element.weight}}</td>
  </ng-container>

  <!-- Symbol Column -->
  <ng-container matColumnDef="symbol">
    <th mat-header-cell *matHeaderCellDef>Symbol</th>
    <td mat-cell *matCellDef="let element">{{element.symbol}}</td>
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

## 2. Export an array to excel file

With the first method, you have to take an array and then render it to the view and then finally, you export the HTML that was rendered. But `js-xlsx` also provides the built-in function to export the array directly to an excel file. Without the need to render it on the UI first.

And because you could pass an array to `js-xlsx`. **It will solve a lot of problems**.

1. You can select which column to include on the excel sheet by simple using Array.map() to transform your array
2. Many comments said they want to remove the last column of the table, which usually has some action buttons. You don't have to worry about that anymore if you export the array directly to the excel file.
3. You could have an array of 1000 items but you only render 25 items per page with your client-side pagination. If you still want to click Export to have an excel file of all 1000 items, you are good to go. Just pass in the method your array and you're all set.

I still use the array above which looks like:

```javascript
this.dataSource = [
  {
    "position": 1,
    "name": "Hydrogen",
    "weight": 1.0079,
    "symbol": "H"
  },
  {
    "position": 2,
    "name": "Helium",
    "weight": 4.0026,
    "symbol": "He"
  },
```

There are four properties, position, name, weight, and symbol. But let say I only want name and the symbol. I could easily transform the array using a map function.

```javascript
const onlyNameAndSymbolArr: Partial<PeriodicElement>[] = this.dataSource.map(x => ({
  name: x.name,
  symbol: x.symbol
}));
```

And I have another utility to export an array

```javascript
static exportArrayToExcel(arr: any[], name?: string) {
  let { sheetName, fileName } = getFileName(name);

  var wb = XLSX.utils.book_new();
  var ws = XLSX.utils.json_to_sheet(arr);
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  XLSX.writeFile(wb, `${fileName}.xlsx`);
}
```

And that's all for exporting your array into an excel sheet. Again, there are many other different options that `js-xlsx` support, you can take a look at their [documentation](https://github.com/SheetJS/js-xlsx).
