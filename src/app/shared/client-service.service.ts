import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import { ConnectionInfo } from '../model/connection-info';
import { MappingColumn } from '../model/mapping-column';

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {

  constructor(private http: HttpClient) {}

  validateInfoSource(infoSource: ConnectionInfo): void {
    console.log("onSubmitSrc work ! " + JSON.stringify(infoSource));
  }

  validateInfoDestination(infoDestination: ConnectionInfo): void {
    console.log("onSubmitDes work ! " + JSON.stringify(infoDestination));
  }

  submitAllInfo(sourceDBMS: string, infoSource: ConnectionInfo, infoDestination: ConnectionInfo, mappingInfo: MappingColumn): void {
    console.log("onSubmitDes work ! " + JSON.stringify(sourceDBMS) + JSON.stringify(infoSource) + JSON.stringify(infoDestination) + JSON.stringify(mappingInfo));
  }
}
