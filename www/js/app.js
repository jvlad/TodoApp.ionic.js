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

    app.factory('Projects', function () {
        return {
            all: function () {
                var projectString = window.localStorage['projects'];
                if (projectString) {
                    return angular.fromJson(projectString);
                }
                return [];
            },
            save: function (projects) {
                window.localStorage['projects'] = angular.toJson(projectList);
            },
            newProject: function (projectTitle) {
                // Add a new project
                return {
                    title: projectTitle,
                    tasks: []
                };
            },
            getLastActiveIndex: function () {
                return parseInt(window.localStorage['lastActiveProject']) || 0;
            },
            setLastActiveIndex: function (index) {
                window.localStorage['lastActiveProject'] = index;
            }
        }
    });

    app.controller('TodoController', function ($scope,
                                               $timeout,
                                               $ionicModal,
                                               Projects,
                                               $ionicSideMenuDelegate) {
        var viewModel = this;
        viewModel.projectList = Projects.all();

        // Grab the last active, or the first project
        viewModel.activeProject = viewModel.projectList[Projects.getLastActiveIndex()];

        // Create and load the Modal window
        $ionicModal.fromTemplateUrl('new-task.html', function (modal) {
            viewModel.taskModal = modal;
        }, {
            scope: $scope,
            animation: 'slide-in-up'
        });

        // Called when the form is submitted
        viewModel.createTask = function (task) {
            if(!viewModel.activeProject || !task) {
                return;
            }
            viewModel.activeProject.tasks.push({
                title: task.title
            });
            viewModel.taskModal.hide();

            // Inefficient, but save all the projects
            Projects.save(viewModel.projectList);

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

        viewModel.newProject = function () {
            var projectTitle = prompt('Project name');
            if (projectTitle) {
                createProject(projectTitle);
            }
        };

        viewModel.selectProject = function (project, index) {
            viewModel.activeProject = project;
            Projects.setLastActiveIndex(index);
            $ionicSideMenuDelegate.toggleLeft(false);
        };

        var createProject = function (projectTitle) {
            var newProject = Projects.newProject(projectTitle);
            viewModel.projectList.push(newProject);
            Projects.save(viewModel.projectList);
            viewModel.selectProject(newProject, viewModel.projectList.length - 1);
        };

        // Try to create the first project, make sure to defer
        // this by using $timeout so everything is initialized
        // properly
        $timeout(function() {
            if(viewModel.projectList.length == 0) {
                while(true) {
                    var projectTitle = prompt('Your first project title:');
                    if(projectTitle) {
                        createProject(projectTitle);
                        break;
                    }
                }
            }
        });
    });
})
();
