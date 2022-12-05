/* eslint-disable */
/**
 *
 * AngularJs directive to render Vue component inside AngularJs code without extra binding
 * It supports one-time binding(not one-way binding) from the given html attributes
 *
 * How does it work?
 *   1. Read the element name, and use it to find a Vue component from a key/value registry
 *   2. Get attributes, and use it to this element scope
 *   3. Using the element name and attributes, initialize a vue component to this element
 *
 * References
 *  . https://v3.vuejs.org/guide/component-basics.html#dynamic-components
 *  . https://v3.vuejs.org/guide/instance.html#the-root-component
 *  . https://docs.angularjs.org/guide/directive
 *
 */
import * as Vue from "vue";
import FirstVueComponent from "../vue-components/first-vue-component.vue";
import SecondVueComponent from "../vue-components/second-vue-component.vue";
import ThirdVueComponent from "../vue-components/third-vue-component.vue";

// Vue component registry
const VUE_COMPONENTS = {
  FirstVueComponent,
  SecondVueComponent,
  ThirdVueComponent,
};

// Build a dynamic scope for compile
// Works with foo="scopeVar" bar="$ctrl.ctrlVar" baz="'STRING'" foo-bar="" ng-vue
function getAngularScopeFromAttrs(scope, attrs) {
  const excludes = ["name", "class"];
  const newScope = {};
  for (let key in attrs.$attr) {
    if (excludes.includes(key)) continue; // skip common attributes
    const ngExpr = attrs[key].match(/^([^;]*);?/)[1]; // 4 security, e.g., '$ctrl.foo;attack()'
    if (ngExpr.match(/^'.*'$/)) {
      // string expression. e.g. baz="'hello'"
      console.log("string expression", { key, ngExpr });
      newScope[key] = eval(`{ngExpr}`);
    } else if (key.match(/^ng[A-Z]/)) {
      // angularJs events or angularJs attributes
    } else if (key.match(/^vOn[A-Z]/)) {
      // vue events
    } else if (ngExpr) {
      // ignore empty attribute
      console.log("angular expression", { key, ngExpr }, scope.$parent);
      newScope[key] = eval(`scope.${ngExpr}`);
    }
  }
  return newScope;
}

function getVueEventAttrs(attrs) {
  return Object.keys(attrs.$attr)
    .filter((el) => el.match(/^vOn[A-Z]/))
    .map((key) => {
      const attrName = attrs.$attr[key].replace(/v-on:/, "");
      const expr = attrs[key];
      return `v-on:${attrName}="handleEvents($event, '${attrName}', '${expr}')"`;
    });
}

function getVueComponent(tagName, VUE_COMPONENTS) {
  const [_, component] = Object.entries(VUE_COMPONENTS).find(([key, value]) => {
    return key.toLowerCase() === tagName.replace(/-/g);
  });

  return component;
}

// why directive? Because component can't be used with attribute
const NgVueDirective = function ($compile, $parse) {
  return {
    compile: function (element, attrs) {
      const tagName = element[0].tagName.toLowerCase();
      const vueComponent = getVueComponent(tagName, VUE_COMPONENTS);

      return function (scope, element, attrs, ctrl, transcl) {
        const newScope = getAngularScopeFromAttrs(scope, attrs);
        for (let key in newScope) {
          scope[key] = newScope[key];
        }

        // Insert a Vue component to this element
        const vueEventAttrs = getVueEventAttrs(attrs).join(" ");
        const vuePropsAttrs = Object.keys(newScope)
          .map((key) => `v-bind:${key}="${key}"`)
          .join(" ");
        element[0].innerHTML = `<${tagName} ${vuePropsAttrs} ${vueEventAttrs}></${tagName}>`;
        const app = Vue.createApp({
          data: (_) => newScope,
          methods: {
            handleEvents: ($event, eventName, expr) => {
              const ngExpr = expr.match(/^([^;]*);?/)[1]; // 4 security, e.g., '$ctrl.foo;attack()'
              eval(`scope.${ngExpr}`);
            },
          },
        });
        app.component(tagName, vueComponent); // Define Vue component given from attribute
        app.mount(element[0]); // Vueify this element
      };
    },
  };
};

export default NgVueDirective;
