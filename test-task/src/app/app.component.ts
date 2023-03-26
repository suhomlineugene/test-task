import { Component, Injector, OnInit } from '@angular/core';
import { TestFileServiceProxy } from 'src/shared/service-proxies';
import { AppComponentBase } from './app-component-base';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends AppComponentBase implements OnInit {
  constructor(
    injector: Injector,
    private _testFileService: TestFileServiceProxy
  ) {
    super(injector);
  }

  filedata: any;

  ngOnInit(): void {
    this.getTableData();
  }

  getTableData(): void {
    this._testFileService.getFileData().subscribe((res) => {
      console.log(res);
      this.filedata = res;
    });
  }
}
