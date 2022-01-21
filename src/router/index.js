import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
		meta: {
		},
	},
	{
		path: "/about",
		name: "About",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "about" */ "../views/About.vue"),
	},
	{
		path: "/login",
		name: "Login",
		component: () =>
			import(/* webpackChunkName: "about" */ "../views/Login.vue"),
      meta: {
        needsUser: false,
      },
	},
	{
		path: "/rezerviraj",
		name: "Rezerviraj",
		component: () =>
			import(/* webpackChunkName: "about" */ "../views/Rezerviraj.vue"),
	},
	{
		path: "/meni",
		name: "meni",
		component: () =>
			import(/* webpackChunkName: "about" */ "../views/Meni.vue"),
	},
	{
		path: "/registracija",
		name: "Registracija",
		component: () =>
			import(/* webpackChunkName: "about" */ "../views/Registracija.vue"),
	},
  {
		path: "/narudzbe",
		name: "Narudzbe",
		component: () =>
			import(/* webpackChunkName: "about" */ "../views/Narudzbe.vue"),
		meta: {
			needsUser: true,
		},
	},
  {
		path: "/rezervacije",
		name: "Rezervacije",
		component: () =>
			import(/* webpackChunkName: "about" */ "../views/Rezervacije.vue"),
		meta: {
			needsUser: true,
		},
	},
  {
		path: "/osoblje",
		name: "Osoblje",
		component: () =>
			import(/* webpackChunkName: "about" */ "../views/Osoblje.vue"),
		meta: {
			needsUser: true,
      needsAdmin: true,
		},
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});
router.beforeEach((to, from, next) => {
	console.log(
		"stara ruta je",
		from.name,
		"nova ruta je ",
		to.name,
		store.currentUser
	);

	const noUser = store.currentUser == null;

  if (noUser && to.meta.needsUser){
    console.error("NE DOPUSTAM")
    next('Login');
  }
  else{
	next();}
});
export default router;
