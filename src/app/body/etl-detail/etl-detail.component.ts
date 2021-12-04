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
  public etlName: string;
  public etl: EtlDetail;
  constructor(private clientService: ClientServiceService, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.etlName = this.route.snapshot.params['name'];
    this.clientService.getEtlById(this.etlName).subscribe(res => {
      this.etl = res['data'][0];
    })
  }

  onDelete(): void {
    this.clientService.deleteEtl(this.etlName).subscribe(res => {
      console.log(res);
      this.router.navigate
    })
  }

}
