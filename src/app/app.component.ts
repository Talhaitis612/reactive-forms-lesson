import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];

  signupForm! : FormGroup;
  
  constructor(){}
  ngOnInit(){
    this.signupForm = new FormGroup({
      'userData' : new FormGroup({
        'username' : new FormControl(null, [Validators.required, Validators.minLength(5)]),
        'email' : new FormControl(null, [Validators.required, Validators.email], ),
      }),
      'gender' : new FormControl('male'),
      'hobbies' : new FormArray([])

    })
    // this.signupForm.setValue({
    //   'userData' : {
    //     'username' : 'Talha@123',
    //     'email' : 'luffy@gmail.com'
    //   },
    //   'gender' : 'male',
    //   'hobbies' : []
    // });
    this.signupForm.patchValue({
      'userData' : {
        'email' : 'luffy@gmail.com'
      },

    });
  }

  onAddHobby(){
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  get controls() {
    return (this.signupForm.get('hobbies') as FormArray).controls;
  }
  

  onSubmit(){
    console.log(this.signupForm);
  }

  forbiddenEmail(control : FormControl) : Promise<any> | Observable<any>{
     const promise = new Promise<any>((resolve, reject)=>{
      setTimeout(()=>{
        if(control.value === 'test@test.com'){
          resolve({'emailIsForbidden' : true})
        }
        else {
          resolve(null);
        }
      },1500);
     });
     return promise;
  }
 
}
