import { Component, OnInit, Input, Sanitizer, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IExtensionPackage } from '../../../../../../shared/interfaces/extension.interface';

@Component({
  selector: 'app-extension-view',
  templateUrl: './extension-view.component.html',
  styleUrls: ['./extension-view.component.scss']
})
export class ExtensionViewComponent implements OnInit  {


  @Input() extension: IExtensionPackage;
  @Input() url: string;

  constructor(
    private domSanitizer: DomSanitizer
  ) {
 
   }

  ngOnInit(): void {
    
  }

}
