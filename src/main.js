import angular from 'angular';
import AngularComponent from './angular-component';
import NgVueDirective from './ng-vue-directive';
import './style.css';

angular
  .module('app', [])
  .component('angularComponent', AngularComponent)
  .directive('ngVue', NgVueDirective) // dynamic vue component wrapper

angular.bootstrap(document.getElementById('app'), ['app']);
