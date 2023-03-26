import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { finalize } from 'rxjs';
import { TestFileServiceProxy } from 'src/shared/service-proxies';
import { AppComponentBase } from './app-component-base';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends AppComponentBase implements OnInit {
  @ViewChild('dataTable', { static: true })
  dataTable!: Table;
  @ViewChild('paginator', { static: true })
  paginator!: Paginator;
  constructor(
    injector: Injector,
    private _testFileService: TestFileServiceProxy
  ) {
    super(injector);
  }

  filedata: any;

  ngOnInit(): void {
    //this.getTableData();
  }

  getTableData(event?: LazyLoadEvent): void {
    if (this.primengTableHelper.shouldResetPaging(event!)) {
      this.paginator.changePage(0);

      return;
    }

    this._testFileService
      .getFileData()
      .pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator()))
      .subscribe((result) => {
        this.primengTableHelper.totalRecordsCount = result.length;
        this.primengTableHelper.records = result;
        this.primengTableHelper.hideLoadingIndicator();
      });
  }
}
