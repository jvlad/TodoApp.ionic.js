// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// the 2nd parameter is an array of 'requires'

(function () {
    var app = angular.module('todo', ['ionic']);

    app.run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

                // Don't remove this line unless you know what you are doing. It stops the viewport
                // from snapping when text inputs are focused. Ionic handles this internally for
                // a much nicer keyboard experience.
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    });

    app.controller('TodoController', function ($scope, $ionicModal, $ionicSideMenuDelegate) {
        // No need for testing data anymore
        var viewModel = this;
        viewModel.tasks = [
            {title: 'Collect coins'},
            {title: 'Eat mushrooms'},
            {title: 'Get high enough to grab the flag'},
            {title: 'Find the Princess'}
        ];

        // Create and load the Modal
        $ionicModal.fromTemplateUrl('new-task.html', function (modal) {
            viewModel.taskModal = modal;
        }, {
            scope: $scope,
            animation: 'slide-in-up'
        });

        // Called when the form is submitted
        viewModel.createTask = function (task) {
            viewModel.tasks.push({
                title: task.title
            });
            viewModel.taskModal.hide();
            task.title = "";
        };

        // Open our new task modal
        viewModel.newTask = function () {
            viewModel.taskModal.show();
        };

        // Close the new task modal
        viewModel.closeNewTask = function () {
            viewModel.taskModal.hide();
        };

        viewModel.toggleProjects = function () {
            $ionicSideMenuDelegate.toggleLeft();
        };
    });
})
();
