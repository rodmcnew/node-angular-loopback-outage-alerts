angular.module('ubermon').directive('ubermonCreateMonitorDialog', function (Monitor) {

    /**
     * The link function for this directive. Runs when directive is loaded
     *
     * @param $scope
     */
    function link($scope) {
        function capitalizeFirstLetter(string) {
            if (!string || string.length < 1) {
                return string;
            }
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        $scope.createMonitor = function (data) {
            data.name = capitalizeFirstLetter(data.name);
            Monitor.create(
                data,
                function (newMonitor) {
                    //data.id = newMonitor.id;
                    //saveMonitorContacts(data);
                    $scope.monitors.push(newMonitor);//Ensures UI doesn't jerk or look weird
                    $scope.selectMonitor(newMonitor);
                    $scope.watchForPendingUpdate();
                    $scope.newMonitor = null; //Hides dialog
                },
                $scope.handleServerError
            );
        };

        $scope.cancelCreateMonitor = function () {
            $scope.newMonitor = null;//Hides the dialog
        };
    }

    // Return the directive configuration
    return {
        link: link,
        restrict: 'E',
        scope: {
            'newMonitor': '=',
            'watchForPendingUpdate': '=',
            'monitorIntervals': '=',
            'selectMonitor': '=',
            'monitors': '=',//@TODO remove the dependency on this
            'contacts': '=',
            'handleServerError': '='
        },
        templateUrl: '/app_components/ubermon/create-monitor-dialog/create-monitor-dialog.html'
    }
});
