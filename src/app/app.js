import angular from 'angular';
import AngularComponent from './app.component';
import NgVueDirective from './directives/ng-vue-directive';
import '../style.css';
import '../../dist/output.css';

angular
  .module('app', [])
  .component('angularComponent', AngularComponent)
  .directive('ngVue', NgVueDirective) // dynamic vue component wrapper

angular.bootstrap(document.getElementById('app'), ['app']);
