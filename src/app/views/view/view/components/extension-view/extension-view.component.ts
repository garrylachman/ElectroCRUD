import { Component, OnInit, Input, Sanitizer, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { IExtensionPackage } from '../../../../../../shared/interfaces/extension.interface';

@Component({
  selector: 'app-extension-view',
  templateUrl: './extension-view.component.html',
  styleUrls: ['./extension-view.component.scss']
})
export class ExtensionViewComponent implements OnInit  {


  @Input() extension: IExtensionPackage;
  @Input() url: string;

  absolutURL: string;
  sanitizedURL: SafeResourceUrl;

  constructor(
    private domSanitizer: DomSanitizer
  ) {
 
   }

  ngOnInit(): void {
    console.log("ExtensionViewComponent")
    this.absolutURL = 'file://'+this.extension.localPath + '/' +this.url;
    this.sanitizedURL = this.domSanitizer.bypassSecurityTrustResourceUrl(this.absolutURL);
  }

}
