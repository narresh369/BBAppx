import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import {  Observable } from 'rxjs';
import { tap, delay, finalize } from 'rxjs/operators';

import { SampleShellListingModel2 } from './sample-shell.model2';
import { ShellProvider } from './shell.provider';

@Injectable()
export class HomexshellShellResolver2 implements Resolve<any> {

  cnt = 15;
  constructor(
    private http: HttpClient
  ) {}

  // These should be in a separate service
  private getData2(): Observable<any> {
    const dataObservable = this.http.get<any>('./assets/sample-data/page-data.json').pipe(
    //const dataObservable = this.http.get<any>('https://randomuser.me/api/?results='+this.cnt).pipe(
      tap(val => {
        console.log('getData STARTED 2222');
      }),
      delay(500),
      finalize(() => {
        console.log('getData COMPLETED 2222');
      })
    );

    return dataObservable;
  }

  private getDataWithShell2(): Observable<SampleShellListingModel2> {
    // Initialize the model specifying that it is a shell model
    //const shellModel: SampleShellListingModel2 = new SampleShellListingModel2(true,this.cnt);
    const shellModel: SampleShellListingModel2 = new SampleShellListingModel2(true);
    const dataObservable = this.getData2();

    const shellProvider = new ShellProvider(
      shellModel,
      dataObservable
    );

    return shellProvider.observable;
  }
  resolve() {
    // Get the Shell Provider from the service
    const shellProviderObservable = this.getDataWithShell2();

    // Resolve with Shell Provider
    const observablePromise = new Promise((resolve, reject) => {
      resolve(shellProviderObservable);
    });
    return observablePromise;
  }
}
