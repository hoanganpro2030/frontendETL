import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConnectionInfo } from '../../model/connection-info';
import { ClientServiceService } from '../../shared/client-service.service'
import { MappingColumn } from 'src/app/model/mapping-column';
import { NotificationService } from 'src/app/service/notification.service';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-new-etl',
  templateUrl: './create-new-etl.component.html',
  styleUrls: ['./create-new-etl.component.css']
})
export class CreateNewEtlComponent implements OnInit {

  selecSourcetFormGroup: FormGroup;
  infoSoureFormGroup: FormGroup;
  infoDestinationFormGroup: FormGroup;
  mappingColumnFormGroup: FormGroup;
  configEtlFormGroup: FormGroup;
  isEditable = false;
  desInfo: ConnectionInfo;
  sourceInfo: ConnectionInfo;
  mappingInfo: {};
  showLoading = false;

  @ViewChild('buttonNextValidateSrc') buttonNextValidateSrc : ElementRef;
  @ViewChild('buttonNextValidateDes') buttonNextValidateDes : ElementRef;
  @ViewChild('buttonNextValidateMapping') buttonNextValidateMapping : ElementRef;

  constructor(private _formBuilder: FormBuilder, private clientService: ClientServiceService, 
    private notificationService: NotificationService, private router: Router) {}

  ngOnInit() {
    this.selecSourcetFormGroup = this._formBuilder.group({
      nameEtlCtrl: ['', Validators.required],
      sourceCtrl: ['', Validators.required],
    });
    this.infoSoureFormGroup = this._formBuilder.group({
      hostSrcCtrl: ['', Validators.required],
      portSrcCtrl: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      usernameSrcCtrl: ['', Validators.required],
      passwordSrcCtrl: ['', Validators.required],
      databaseSrcCtrl: ['', Validators.required],
      schemaSrcCtrl: ['', Validators.required],
      tableSrcCtrl: ['', Validators.required],
    });
    this.infoDestinationFormGroup = this._formBuilder.group({
      hostDesCtrl: ['', Validators.required],
      portDesCtrl: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      usernameDesCtrl: ['', Validators.required],
      passwordDesCtrl: ['', Validators.required],
      databaseDesCtrl: ['', Validators.required],
      schemaDesCtrl: ['', Validators.required],
      tableDesCtrl: ['', Validators.required],
    });
    this.mappingColumnFormGroup = this._formBuilder.group({
      columnSrcCtrl: ['', Validators.required],
      columnDesCtrl: ['', Validators.required],
      mappingCtrl: ['', Validators.required],
      keyCtrl: ['', Validators.required]
    });
  }

  onSubmitSource() : void {
    if (this.infoSoureFormGroup.valid) {
      this.sourceInfo = {
        'typ': this.selecSourcetFormGroup.value.sourceCtrl,
        'host': this.infoSoureFormGroup.value.hostSrcCtrl,
        'port': this.infoSoureFormGroup.value.portSrcCtrl,
        'username': this.infoSoureFormGroup.value.usernameSrcCtrl,
        'password': this.infoSoureFormGroup.value.passwordSrcCtrl,
        'database': this.infoSoureFormGroup.value.databaseSrcCtrl,
        'schema': this.infoSoureFormGroup.value.schemaSrcCtrl,
        'table_name': this.infoSoureFormGroup.value.tableSrcCtrl
      };
      console.log(this.sourceInfo);
      this.showLoading = true;
      this.clientService.validateInfoSource(this.sourceInfo).subscribe(response => {
        this.showLoading = false;
        if (response['reason']) {
          this.notificationService.notify(NotificationType.ERROR, response['reason']);
        } else {
          let el: HTMLElement = this.buttonNextValidateSrc.nativeElement as HTMLElement;
          el.click();
          this.sourceInfo['id'] = response['source']['id'];
        }
      });
    }
  }

  onSubmitDes() : void {
    if (this.infoDestinationFormGroup.valid) {
      this.desInfo = {
        'typ': 'postgresql',
        'host': this.infoDestinationFormGroup.value.hostDesCtrl,
        'port': this.infoDestinationFormGroup.value.portDesCtrl,
        'username': this.infoDestinationFormGroup.value.usernameDesCtrl,
        'password': this.infoDestinationFormGroup.value.passwordDesCtrl,
        'database': this.infoDestinationFormGroup.value.databaseDesCtrl,
        'schema': this.infoDestinationFormGroup.value.schemaDesCtrl,
        'table_name': this.infoDestinationFormGroup.value.tableDesCtrl
      };
      console.log(this.desInfo);
      this.showLoading = true;
      this.clientService.validateInfoDestination(this.desInfo).subscribe(response => {
        if (response['reason']) {
          this.notificationService.notify(NotificationType.ERROR, response['reason']);
        } else {
          this.desInfo['id'] = response['source']['id'];
          this.clientService.getCols(this.sourceInfo, this.desInfo).subscribe(res => {
            this.showLoading = false;
            if (res['reason']) {
              this.notificationService.notify(NotificationType.ERROR, res['reason']);
            } else {
              console.log(res)
              let eld: HTMLElement = this.buttonNextValidateDes.nativeElement as HTMLElement;
              eld.click();
              let src = res['source'].join(",");
              let des = res['destination'].join(",");
              this.mappingColumnFormGroup = this._formBuilder.group({
                columnSrcCtrl: [src, Validators.required],
                columnDesCtrl: [des, Validators.required],
                mappingCtrl: ['', Validators.required],
                keyCtrl: ['', Validators.required]
              });
            }
          })
        }
      });
    }
  }

  onValidateMapping(): void {
    this.showLoading = true;
    this.clientService.mappingCols(this.mappingColumnFormGroup.value.columnSrcCtrl, 
      this.mappingColumnFormGroup.value.columnDesCtrl, 
      this.mappingColumnFormGroup.value.mappingCtrl).subscribe(res => {
        this.showLoading = false;
        if (res['reason']) {
          this.notificationService.notify(NotificationType.ERROR, res['reason']);
        } else {
          console.log(res)
          let eld: HTMLElement = this.buttonNextValidateMapping.nativeElement as HTMLElement;
          eld.click();
          this.mappingInfo = res['mapping'];
        }
      })
  }

  onSubmitAllInformation() : void {
    this.showLoading = true;
    this.clientService.submitAllInfo(this.sourceInfo, 
      this.desInfo, 
      this.mappingInfo,
      this.mappingColumnFormGroup.value.keyCtrl, 
      this.selecSourcetFormGroup.value.nameEtlCtrl).subscribe(res => {
        this.showLoading = false;
        if (res['reason']) {
          this.notificationService.notify(NotificationType.ERROR, res['reason']);
        } else {
          this.notificationService.notify(NotificationType.SUCCESS, 'Create success !');
          this.router.navigateByUrl('etl-list');
        }
      });
  }
}
