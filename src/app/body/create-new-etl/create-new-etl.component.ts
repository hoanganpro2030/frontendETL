import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-new-etl',
  templateUrl: './create-new-etl.component.html',
  styleUrls: ['./create-new-etl.component.css']
})
export class CreateNewEtlComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = false;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
}
