var app=angular.module('myapp',[]);
app.controller('ContactController',function($scope,$http){
    
    $scope.Contactlist = null;
    $scope.Contact = null;
    $scope.EditMode = false;
    $scope.ID = null;
    $scope.GetAll = function () {
        
        $http.get('/contactlist').success(function (response) {
             
            $scope.contactlist = response;
           
        });

    };
    $scope.GetAll();
    $scope.Save = function (data) {
        
        $http.post('/contactlist',data).success(function (response) {
            
            $scope.GetAll();
            $scope.Contact = { ContactName: "", IsActive: 0 };
        });

    };
    $scope.Edit = function (id) {
        $scope.ID = id;
        $http.get('/contactlist/'+id).success(function (response) {
            console.log(response);
            $scope.Contact = { ContactName: response[0].ContactName, Mobile: response[0].Mobile, IsActive: response[0].IsActive };
            $scope.EditMode = true;
        });

    };
    $scope.Update = function (data) {
        console.log(data);
        $http.put('/contactlist/'+$scope.ID, data).success(function (response) {
            $scope.GetAll();
            $scope.EditMode = false;
            $scope.ID = null;
            $scope.Contact = { ContactName: "", IsActive: 0 };
            
        });

    };
    $scope.Delete = function (id) {
        
        $http.delete('/contactlist/'+id).success(function (response) {
            console.log(response);
            $scope.GetAll();
            
        });

    };
   
});