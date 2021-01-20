
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

// Moment js
import moment from 'moment';

// V-form start
import { Form, HasError, AlertError } from 'vform';
// import Form from 'vform';

// import Gate js
import Gate from "./Gate";
Vue.prototype.$gate = new Gate(window.user);

window.Form = Form;
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)
// V form -End

// Vue Progressbar import
import vueProgressbar from 'vue-progressbar';
Vue.use(vueProgressbar, {
    color: 'rgb(143, 255, 199)',
    failedColor: 'red',
    height: '3px'
})

// SweetAlert 2 Import
import Swal from 'sweetalert2'
window.Swal = Swal;
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

window.Toast = Toast;
// Sweetalert end 

// ---------------
window.Fire = new Vue();

// Vue Router Import
import VueRouter from 'vue-router'
Vue.use(VueRouter)

let routes = [
    { path: '/dashboard', component: require('./components/Dashboard.vue').default },
    { path: '/developer', component: require('./components/Developer.vue').default },
    { path: '/users', component: require('./components/Users.vue').default },
    { path: '/profile', component: require('./components/Profile.vue').default },
    { path: '*', component: require('./components/NotFound.vue').default }
]

const router = new VueRouter({
    mode: 'history',
    routes // short for `routes: routes`
})

// Uppercase js
Vue.filter('upText', function(text){
    return text.charAt(0).toUpperCase() + text.slice(1);
});

// Date Formate moment js
Vue.filter('myDate',function(created){
    return moment(created).format('MMMM Do YYYY');
});

// Pagination Component
Vue.component('pagination', require('laravel-vue-pagination'));




/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))


Vue.component(
    'passport-clients',
    require('./components/passport/Clients.vue').default
);

Vue.component(
    'passport-authorized-clients',
    require('./components/passport/AuthorizedClients.vue').default
);

Vue.component(
    'passport-personal-access-tokens',
    require('./components/passport/PersonalAccessTokens.vue').default
);

Vue.component(
    'not-found',
    require('./components/NotFound.vue').default
);


Vue.component('example-component', require('./components/ExampleComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    router,
    data:{
        search: ''
    },
    methods:{
        searchit: _.debounce(() => {
            Fire.$emit('searching');
        },1000),

        printme() {
            window.print();
        }
    }
});
