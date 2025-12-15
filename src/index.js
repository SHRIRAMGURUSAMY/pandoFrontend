import { createRouter, createWebHistory } from "vue-router";

import Transport from "@/components/Transport.vue";
import Vehicle from "@/components/Vehicle.vue";
import Shipments from "@/components/Shipment.vue";

const routes = [
  { path: "/transport", name: "transport", component: Transport },
  { path: "/vehicle", name: "vehicle", component: Vehicle },
  { path: "/shipments", name: "shipments", component: Shipments },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
