import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Etl } from 'src/app/model/etl';
import { EtlDetail } from 'src/app/model/etl-detail';
import { ClientServiceService } from 'src/app/shared/client-service.service';

@Component({
  selector: 'app-etl-detail',
  templateUrl: './etl-detail.component.html',
  styleUrls: ['./etl-detail.component.css']
})
export class EtlDetailComponent implements OnInit {
  public etlId: number;
  public etl: EtlDetail;
  constructor(private clientService: ClientServiceService, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.etlId = this.route.snapshot.params['id'];
    this.clientService.getEtlById(this.etlId).subscribe(res => {
      this.etl = res['data'][0];
    })
  }

  onDelete(): void {
    this.clientService.deleteEtl(this.etlId).subscribe(res => {
      console.log(res);
    })
  }

}
