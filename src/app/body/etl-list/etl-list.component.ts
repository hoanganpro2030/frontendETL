import { Component, OnInit } from '@angular/core';
import { Etl } from 'src/app/model/etl';
import { ClientServiceService } from 'src/app/shared/client-service.service';

@Component({
  selector: 'app-etl-list',
  templateUrl: './etl-list.component.html',
  styleUrls: ['./etl-list.component.css']
})
export class EtlListComponent implements OnInit {

  constructor(private clientService: ClientServiceService) { }
  public etls: Etl[] = [];
  ngOnInit(): void {
    this.clientService.getAllEtl().subscribe(response => {
      this.etls = response['data']
      console.log(this.etls);
    });
  }

  onChangeStatus(id: number): void {
    this.clientService.updateStatusEtl(id).subscribe(response => {
      console.log(response);
    })
  }

}
