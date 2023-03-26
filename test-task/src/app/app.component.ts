import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { finalize } from 'rxjs';
import { TestFileDto, TestFileServiceProxy } from 'src/shared/service-proxies';
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
  data: any;
  chartsData: any;
  chartsOptions: any;
  ngOnInit(): void {
    this.getChartsData();
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

    this;
  }

  getChartsData(): any {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this._testFileService.getFileData().subscribe((result) => {
      this.chartsData = {
        labels: result.map((obj: any) => {
          return obj.siteName;
        }),
        datasets: [
          {
            label: 'CLUSTER_MEDIAN_PRICE',
            backgroundColor: documentStyle.getPropertyValue('--blue-500'),
            borderColor: documentStyle.getPropertyValue('--blue-500'),
            data: result.map((obj: any) => {
              return obj.clusterMedianPrice;
            }),
          },
          {
            label: 'CLIENT_MARKET_PRICE',
            backgroundColor: documentStyle.getPropertyValue('--pink-500'),
            borderColor: documentStyle.getPropertyValue('--pink-500'),
            data: result.map((obj: any) => {
              return obj.clientMarketPrice;
            }),
          },
        ],
      };
    });

    this.chartsOptions = {
      indexAxis: 'y',
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500,
            },
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }
}
