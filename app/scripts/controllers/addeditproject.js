'use strict';

/**
 * @ngdoc function
 * @name electroCrudApp.controller:AddeditprojectCtrl
 * @description
 * # AddeditprojectCtrl
 * Controller of the electroCrudApp
 */
angular.module('electroCrudApp')
  .controller('AddeditprojectCtrl', ['$scope', 'breadcrumb', 'projectsModel', '$route', '$routeParams',
                                      'mysql', 'SweetAlert', '$location',
  function ($scope, breadcrumb, projectsModel, $route,
            $routeParams, mysql, SweetAlert, $location) {
    $scope.editMode = ($route.current.$$route.controllerAs == "editProject");
    $scope.project = {};
    $scope.detailsFormValid = false;
    $scope.databases = [];

    $scope.$watchCollection('project', function(newNames, oldNames) {
      $scope.detailsFormValid = formValidator();
    });

    $scope.onCancelBtn = function() {
      $location.path("/projects");
    };

    $scope.detailsFormConnect = function(){
      if ($scope.detailsFormValid) {
        getMySQLTables();
      }
    };

    $scope.openDatabaseSelect = function(databaseName) {
      $scope.project.mysql_db = databaseName;
      $scope.databases.forEach(function(row){
        row.selected = ($scope.project.mysql_db == row.Database);
      });
      commitChanges();
    };

    if ($scope.editMode) {
      var projectId = $routeParams.id;
      var data = projectsModel.getById(projectId).then(function(result){
        initEdit(result.rows[0])
      });
    } else {
      breadcrumb.append("New Project", "/#/projects/new");
    }

    function initEdit(data) {
      breadcrumb.append(data.name, "/#/projects/edit/"+data.id);
      $scope.project = data;
      getMySQLTables();
    }

    function formValidator() {
      var isValid = true;
      //name
      if (isValid && ( ! $scope.project.name || $scope.project.name.length < 3)) {
        isValid = false;
      }
      //mysql host
      if (isValid && ( ! $scope.project.mysql_host || $scope.project.mysql_host.length < 1)) {
        isValid = false;
      }
      //mysql port
      if (isValid && ( ! $scope.project.mysql_port || isNaN($scope.project.mysql_port))) {
        isValid = false;
      }
      //mysql user
      if (isValid && ( ! $scope.project.mysql_user || $scope.project.mysql_user.length < 1)) {
        isValid = false;
      }
      return isValid;
    }

    function getMySQLTables() {
      var connection = mysql.getConnection($scope.project.mysql_host,
        $scope.project.mysql_port,
        $scope.project.mysql_user,
        $scope.project.mysql_password,
        $scope.project.mysql_db);
        connection.connect();

      mysql.getDatabases(connection)
        .then(function(results) {
          results.forEach(function(row){
            row.selected = ($scope.project.mysql_db == row.Database);
          });
          angular.copy(results, $scope.databases);
          $scope.$apply();
        })
        .catch(function(err) {
          SweetAlert.swal("Error", err, "error");
        });
    }

    function commitChanges() {
      projectsModel.update(projectId, $scope.project)
        .then(function(result){
          SweetAlert.swal("Success", "Project saving completed.", "success");
          $location.path("/projects");
        })
        .catch(function(err){
          SweetAlert.swal("Error", err, "error");
        })
    }



  }]);
