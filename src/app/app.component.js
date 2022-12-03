/* eslint-env es6 */
/* eslint-disable no-console */
const AngularComponent = {
  template: require("./app.template.html").default,
  controller: class {
    constructor($scope) {
      $scope.scopeVar = { scope: "scope variable" };
      this.$scope = $scope;
    }
    $onInit() {
      this.data = ["foo", "bar"];
      this.greeting = "Hello, World!";
      this.message = "Hello from AngularJs";
    }
    handleEvent(event) {
      this.message = event;
      this.$scope.$apply();
    }
    alert(event) {
      alert(this.message);
      console.log(event);
    }
  },
};

export default AngularComponent;
