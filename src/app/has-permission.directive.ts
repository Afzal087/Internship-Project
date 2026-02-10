import { Directive, inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserService } from './services/user.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appHasPermission]'
})
export class HasPermissionDirective {
  private userService = inject(UserService)
  private templateRef = inject(TemplateRef)
  private viewContainer = inject(ViewContainerRef)
  private sub?: Subscription

  @Input() set appHasPermission(permission : string){
    console.log('--- PERMISSION CHECK ---');
    console.log('1. Checking for:', permission);   
    


this.sub = this.userService.authorities$.subscribe(currentAuth =>{
this.viewContainer.clear();
    if(this.userService.hasAuthority(permission)){
      this.viewContainer.createEmbeddedView(this.templateRef)
    }
})
    
  }
ngOnDestroy() {
    this.sub?.unsubscribe(); // Prevent memory leaks
  }
  constructor() { }

}
