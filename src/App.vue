<template>
  <div class="row">
    <div class="d-flex align-items-end justify-content-start col-12">
      <h1 class="text-start">Transport Management System</h1>
    </div>

    <div class="col-12">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="Transport" name="transport" />
        <el-tab-pane label="Vehicle" name="vehicle" />
        <el-tab-pane label="Shipments" name="shipments" />
      </el-tabs>
    </div>

    <router-view />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const activeName = ref(route.name);

const handleClick = (tab) => {
  router.push({ name: tab.paneName });
};

// Keep tab in sync on refresh
watch(
  () => route.name,
  (name) => {
    activeName.value = name;
  }
);
</script>
