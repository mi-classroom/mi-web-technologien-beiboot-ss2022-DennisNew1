import Vue from 'vue';
import VueRouter from 'vue-router';
import OverviewMasterpieces from '../components/OverviewMasterpieces.vue';
import TimelineGallery from '../components/TimelineGallery.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/masterpieces',
    name: 'masterpieces',
    component: OverviewMasterpieces
  },
  {
    path: '/',
    name: 'timeline',
    component: TimelineGallery
  }
];

const router = new VueRouter({
  routes
});

export default router;
