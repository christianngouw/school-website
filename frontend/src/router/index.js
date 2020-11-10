import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

let ls = JSON.parse(localStorage.getItem('school-website-login'));    

const routes = [
  {
    path: "/",
    name: "Home",
    component: ()=>import('@/views/Home'),    
  },
  {
    path: "/about",
    name: "About",    
    component: () =>import('@/views/About')      
  },
  {
    path : '/login',
    name : 'Login',
    component : ()=>import('@/views/Login'),    
    beforeEnter : (to,from,next)=> {      
      if(ls == null){
        next()
      }else{
        if(ls.msg == 'Login Success'){
          if(ls.status == 'admin'){            
            next('/admin')
          }else if(ls.status == 'siswa'){
            next('/student')
          }
        }
      }
    }
  },
  {
    path : '/admin',
    name : 'Admin',
    component : ()=>import('@/views/admin/Admin'),        
    beforeEnter : (to,from,next) => {
      if(ls == null){
        next('/login')
      }else{
        if(ls.msg == 'Login Success' && ls.status == 'admin'){
          next()
        }
      }
    }
  },
  {
    path : '/register',
    name : 'Register',
    component : ()=>import('@/views/Register')
  },
  {
    path : '/student',
    name : 'Student',
    component : ()=>import('@/views/student/Student'),
    beforeEnter : (to,from,next) => {
      if(ls == null){
        next('/login')
      }else{
        if(ls.msg == 'Login Success' && ls.status == 'siswa'){
          next()
        }
      }    
    },            
  },  
  {
    path : '/admin/student',
    name : 'Student Dashboard',
    component : ()=> import('@/views/admin/student/Student')
  }
];


const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
