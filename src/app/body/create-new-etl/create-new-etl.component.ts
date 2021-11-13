import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConnectionInfo } from '../../model/connection-info';
import { ClientServiceService } from '../../shared/client-service.service'
import { MappingColumn } from 'src/app/model/mapping-column';

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

  constructor(private _formBuilder: FormBuilder, private clientService: ClientServiceService) {}

  ngOnInit() {
    this.selecSourcetFormGroup = this._formBuilder.group({
      sourceCtrl: ['', Validators.required]
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
    });
    this.configEtlFormGroup = this._formBuilder.group({
      nameEtlCtrl: ['', Validators.required],
    });
  }

  onSubmitSource() : void {
    if (this.infoSoureFormGroup.valid) {
      let sourceInfo: ConnectionInfo = this.infoSoureFormGroup.value;
      this.clientService.validateInfoSource(sourceInfo);
    }
  }

  onSubmitDes() : void {
    if (this.infoDestinationFormGroup.valid) {
      let desInfo: ConnectionInfo = this.infoDestinationFormGroup.value;
      this.clientService.validateInfoDestination(desInfo);
    }
  }

  onSubmitAllInformation() : void {
    let sourceDBMS: string = this.selecSourcetFormGroup.value.sourceCtrl;
    let sourceInfo: ConnectionInfo = this.infoSoureFormGroup.value;
    let desInfo: ConnectionInfo = this.infoDestinationFormGroup.value;
    let mappingInfo: MappingColumn = this.mappingColumnFormGroup.value;
    this.clientService.submitAllInfo(sourceDBMS, sourceInfo, desInfo, mappingInfo);
  }
}
