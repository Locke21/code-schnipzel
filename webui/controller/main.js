var app = angular.module('smartAlarm', []);

app.controller('mainCtrl',function($scope){

    if(typeof(Storage) !== "undefined") {
        console.log("Local storage available");
        $scope.pills_list = localStorage.getItem("pill_list");
        $scope.alarm_list = localStorage.getItem("alarm_list");
        $scope.connector_list = localStorage.getItem("connector_list");
    }else{
        console.log("Local storage not available");
    };

    $scope.pill = { id: "", name: ""};
    $scope.alarm  = { id: "", name: "", time: "", days: []};
    $scope.connector = { pill_name: "", alarm_id: ""};

    $scope.pills_list = [];
    $scope.alarm_list = [];
    $scope.connector_list = [];

    $scope.add_pill = function(name){
        $scope.pill.id = $scope.get_uuid;
        $scope.pill.name = name;

        $scope.pills_list.push($scope.pill);

        $scope.pill = { id: "", name: ""};

        if(typeof(Storage) !== "undefined") {
            localStorage.setItem("pill_list", $scope.pills_list);
        };
        console.log($scope.pills_list);
    };

    $scope.add_alarm = function(pill_id, alarm_name, time, days){
        $scope.alarm.id = $scope.get_uuid;
        $scope.alarm.time = time;
        $scope.alarm.days = days;

        if(alarm_name != null){
            $scope.alarm.name = alarm_name;
        }else{
            alarm_name =  $scope.alarm.id;
        }

        $scope.add_alarm($scope.alarm);

        $scope.connector.pill_id = pill_id;
        $scope.connector.alarm_id = $scope.alarm.id;

        $scope.connector_list.push($scope.connector);

        $scope.alarm = { id: "", time: "", days: []};
        if(typeof(Storage) !== "undefined") {
            localStorage.setItem("alarm_list", $scope.alarm_list);
            localStorage.setItem("connector_list", $scope.connector_list);
        };

        $scope.delete_alarm = function(){

        };

        $scope.get_uuid = function() {
            var d = new Date().getTime();
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = (d + Math.random()*16)%16 | 0;
                d = Math.floor(d/16);
                return (c=='x' ? r : (r&0x3|0x8)).toString(16);
            });
            return uuid;
        };
    }
});
