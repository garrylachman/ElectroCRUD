import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss']
})
export class QueryComponent implements OnInit {

  editorOptions = {theme: 'vs-dark', language: 'sql', minimap: { enabled: false }};
  code: string = 'SELECT * FROM';

  constructor() { }

  ngOnInit() {
  }

}
