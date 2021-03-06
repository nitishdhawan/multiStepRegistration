import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-wizard',
  templateUrl: './registration-wizard.component.html',
  styleUrls: ['./registration-wizard.component.css']
})
export class RegistrationWizardComponent implements OnInit {

  @Input() formContent: any;

  @Output() readonly formSubmit: EventEmitter<any> = new EventEmitter<any>();

  activeStepIndex: number;
  currentFormContent: Array<any>;
  formData: any;
  formFields: Array<Array<string>>;
  masterFormFields: Array<string>;
  stepItems: Array<any>;
  masterForm: Array<FormGroup>;
  myControl = new FormControl();
  constructor(
    private readonly _formBuilder: FormBuilder,
    private _cd: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    

    this.activeStepIndex = 0;
    this.masterForm = [];
    this.currentFormContent = [];
    this.formFields = []; // value of each feild of all steps
    this.stepItems = this.formContent;

    this.stepItems.forEach((data, i) => {
      this.currentFormContent.push(this.stepItems[i]["data"]); // holds name, validators, placeholder of all steps
      this.formFields.push(Object.keys(this.currentFormContent[i])); // holds string values for each field of all steps
      this.masterForm.push(this.buildForm(this.currentFormContent[i])); // holds all form groups
    });
  }

  // build separate FormGroups for each form
  buildForm(currentFormContent: any): FormGroup {
    const formDetails = Object.keys(currentFormContent).reduce((obj, key) => {
      console.log(key)
      if(key == 'firstName' || key =='lastName'){
        obj[key] = ["", Validators.pattern('^[a-zA-Z \-\']+')];
      }
      else if(key == 'age'){
        obj[key] = ["", Validators.pattern(/^-?(0|[1-9]\d*)?$/)];
      }
      else if(key == 'email'){
        obj[key] = ["", [Validators.email]];
      }
      else{
        obj[key] = ["", this.getValidators(currentFormContent[key])];
      }
      

      return obj;
    }, {});

    return this._formBuilder.group(formDetails);
  }

  

  // get validator(s) for each field, if any
  getValidators(formField: any): Validators {
    const fieldValidators = Object.keys(formField.validations).map(
      validator => {
        if (validator === "required") {
          return Validators[validator];
        }
        // else if(validator === "nameValidation"){
        //   console.log("validation")
        // }
         else {
          return Validators[validator](formField.validations[validator]);
        }
      }
    );

    return fieldValidators;
  }

  // get validation error messages per error, per field
  getValidationMessage(formIndex: number, formFieldName: string): string {
    const formErrors = this.masterForm[formIndex].get(formFieldName).errors;
    const errorMessages = this.currentFormContent[formIndex][formFieldName]
      .errors;
    const validationError = errorMessages[Object.keys(formErrors)[0]];

    return validationError;
  }

  goToStep(step: string): void {
    this.activeStepIndex =
      step === "prev" ? this.activeStepIndex - 1 : this.activeStepIndex + 1;

    this.setFormPreview();
  }

  setFormPreview(): void {
    this.formData = this.masterForm.reduce(
      (masterForm, currentForm) => ({ ...masterForm, ...currentForm.value }),
      {}
    );

    this.masterFormFields = Object.keys(this.formData);
  }

  onFormSubmit(): void {
    this.formSubmit.emit(this.formData);
  }

  


}
