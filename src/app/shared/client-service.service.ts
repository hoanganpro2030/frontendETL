import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import { ConnectionInfo } from '../model/connection-info';
import { MappingColumn } from '../model/mapping-column';
import { Etl } from '../model/etl';

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {

  constructor(private http: HttpClient) {}

  getAllEtl() {
    return this.http.get('http://127.0.0.1:5000/dashboard');
  }

  getEtlById(id) {
    return this.http.get('http://127.0.0.1:5000/etl/' + id);
  }

  updateStatusEtl(id) {
    return this.http.put('http://127.0.0.1:5000/etl_status/' + id, {});
  }

  deleteEtl(id) {
    return this.http.delete('http://127.0.0.1:5000/delete_etl/' + id);
  }

  validateInfoSource(infoSource: ConnectionInfo) {
    return this.http.post('http://127.0.0.1:5000/check_inp_source', infoSource);
  }

  validateInfoDestination(infoDestination: ConnectionInfo) {
    return this.http.post('http://127.0.0.1:5000/check_inp_source', infoDestination);
  }

  getCols(source: ConnectionInfo, destination: ConnectionInfo) {
    return this.http.post('http://127.0.0.1:5000/get_cols', {source, destination});
  }

  mappingCols(source, destination, mapping) {
    return this.http.post('http://127.0.0.1:5000/mapping_col', {source, destination, mapping});
  }

  submitAllInfo(source: ConnectionInfo, destination: ConnectionInfo, mapping, key: string, name:string) {
    return this.http.post('http://127.0.0.1:5000/create_dag', {name, source, destination, mapping, key});
  }
}
