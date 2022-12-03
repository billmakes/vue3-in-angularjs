/* eslint-env es6 */
/* eslint-disable no-console */
const AngularComponent = {
  template: `
  <h1>AngularJs + Vue + Event</h1>
  This demo shows how to insert Vue component inside AngularJs just as you write Vue syntax.

  <h3 class="ng-logo" style="background-size:contain">I'm angular main component</h3>

  <li>scopeVar: {{scopeVar|json}}
  <li>$ctrl.ctrlVar: {{$ctrl.ctrlVar}}
  <li>$ctrl.hello: {{$ctrl.hello|json}}

  <p>
  'ng-vue' is an AngularJs directive. It loads a Vue component by finding a Vue component name from it's element name. The syntax difference between AngularJs and Vue is just 'ng-vue attribute.
  </p>

  <pre>
  &lt;<b>MyVueComponent</b> <b>ng-vue</b>
    <u>foo</u>="scopeVar" 
    <u>bar</u>="$ctrl.ctrlVar"
    <u>foo-bar</u>="'MY FOOBAR'" 
    <u>baz</u>="'MY BAZ'"
    <u>ng-click</u>="$ctrl.alert($event)"
    <u>v-on:my-event</u>="$ctrl.handleEvent($event)">&lt;/<b>MyVueComponent</b>>
  </pre>

  message: {{$ctrl.message | json}}
  <MyVueComponent ng-vue 
    foo="scopeVar" 
    bar="$ctrl.ctrlVar"
    foo-bar="'MY FOOBAR'" 
    baz="'MY BAZ'"
    ng-click="$ctrl.alert($event)"
    v-on:my-event="$ctrl.handleEvent($event)">
  </MyVueComponent>

  <pre>
   &lt;<b>MyOtherVueComponent ng-vue</b> hello="$ctrl.hello">
   &lt;/<b>MyOtherVueComponent</b>></pre>

  <MyOtherVueComponent ng-vue hello="$ctrl.hello">
  </MyOtherVueComponent>
    `,

  controller: class {
    constructor($scope) {
      $scope.scopeVar = { scope: 'var' };
      this.$scope = $scope;
    }
    $onInit() {
      this.ctrlVar = ['ctrl', 'var'];
      this.hello = 'Vue Inside Angular';
      this.message = 'This message is from AngularJs';
    }
    handleEvent(event) {
      this.message = event;
      this.$scope.$apply();
    }
    alert(event) {
      alert(event);
      console.log({ event });
    }
  }
};

export default AngularComponent;
