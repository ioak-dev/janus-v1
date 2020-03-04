import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/components/Home/Home.vue';
import Board from '@/components/Board/Board.vue';
import CreateSpace from '@/components/Space/CreateSpace.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/home', component: Home, name: 'Home' },
  { path: '/board', component: Board, name: 'Board' },
  { path: '/createspace', component: CreateSpace, name: 'CreateSpace' },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  routes,
});

export default router;
