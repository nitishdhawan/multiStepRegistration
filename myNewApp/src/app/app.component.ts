import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'myNewApp';
  countryList = [
    { name: 'United States of America', code: 'us' },
    { name: 'United Kingdoms', code: 'gb' },
    { name: 'India', code: 'in' }
  ];
  
  dataStep1 = {
    firstName: { type: 'text', validations: {}, errors: {pattern:'Please enter a valid Name'}, placeholder: 'Mitchell', displayName: 'First Name' },
    lastName: { type: 'text', validations: {}, errors: {pattern:'Please enter a valid Name'}, placeholder: 'Swepson', displayName: 'Last Name' },
    age: { type: 'text', validations: {}, errors: {pattern: 'Please enter a valid age'}, placeholder: '33', displayName: 'Age' },
  };
  
  dataStep2 = {
    phone: {
      type: 'phone',
      validations: {
        pattern: /^\d{10}$/
      },
      errors: {
        pattern: 'Please enter a valid phone number'
      },
      placeholder: '9192938890',
      displayName:'Contact Number'
    },
    email: {
      type: 'email',
      validations: {},
      errors: {
        email: 'Please enter a valid email'
      },
      placeholder: 'abc@xyz.com',
      displayName:'Email'
    },
    otp: {
      type: 'number',
      validations: {
        required: true,
        minLength: 4
      },
      errors: {
        required: 'This field can not be left blank',
        minlength: 'Minimum length should be 4 characters'
      },
      placeholder: '1234',
      displayName:'OTP'
    }
    
  };
  
  dataStep3 = {
    address: { type: 'textarea', validations: {}, errors: {}, placeholder: 'Full Address', displayName:'Address' },
    country: {
      type: 'select',
      options: this.countryList,
      validations: {},
      errors: {},
      placeholder: 'Country',
      displayName:'Country'
    }
  };
  
  stepItems = [
    { label: 'Step 1', data: this.dataStep1 },
    { label: 'Step 2', data: this.dataStep2 },
    { label: 'Step 3', data: this.dataStep3 },
    { label: 'Review & Submit', data: {} }
  ];

  formContent: any;
  formData: any;
  
  ngOnInit(){
    this.formContent = this.stepItems;
    this.formData = {};
  }

  onFormSubmit(formData:any) {
    this.formData = formData;
  }
}


