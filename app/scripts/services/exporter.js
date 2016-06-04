'use strict';
var fs = require('fs');
var remote = require('electron').remote;
var dialog = remote.dialog;

/**
 * @ngdoc service
 * @name electroCrudApp.exporter
 * @description
 * # exporter
 * Service in the electroCrudApp.
 */
angular.module('electroCrudApp')
  .service('exporter', function () {

    var exportTypes = {
      CSV: 'csv'
    };

    function processCSVRow(row, fileName) {
      var rowArray = [];
      if ( ! Array.isArray(row)) {
        for (var k in row) {
          if (row.hasOwnProperty(k)) {
            rowArray.push(row[k]);
          }
        }
      } else {
        rowArray = row;
      }
      fs.appendFileSync(fileName, '"'+rowArray.join('","')+'"\n');
    }

    return {
      types: exportTypes,
      exportAsFile: function(exportType, rows, columns){
        var options = {
          filters: [{name: 'CSV', extensions: ['csv']}],
        };
        dialog.showSaveDialog(options, function (filePath) {
          switch(exportType) {
            case exportTypes.CSV:
                if (columns) {
                  processCSVRow(columns, filePath);
                }
                rows.forEach(function(item){
                  processCSVRow(item, filePath);
                });
            break;
          }
        });
      }
    }

  });
