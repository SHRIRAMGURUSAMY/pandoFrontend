<template>
  <div>
    <div class="d-flex align-items-center justify-content-end">
      <el-button type="primary" @Click="showTransportModal = true"
        >Add Vehicle</el-button
      >
    </div>
    <el-table :data="vehicleData" style="width: 100%">
      <el-table-column prop="vehicleName" label="Vehicle Name" width="180" />
      <el-table-column prop="weightCapcity" label="Weight" width="100%" />
      <el-table-column prop="volumnCapcity" label="Volumn" width="100%" />
      <el-table-column fixed="right" label="Operations" min-width="120">
        <template #default="{ row }">
          <el-button
            class="btn btn-danger text-center"
            @click="handleClick(row._id)"
          >
            Delete
          </el-button>
          <el-button
            class="btn btn-primary text-center"
            @Click="
              (showTransportModal = true), (propsData = row), (type = 'put')
            "
            >Edit</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
  <Teleport to="body">
    <vehicleData1
      v-if="showTransportModal"
      :data="propsData"
      @close="showTransportModal = false"
      :type="type"
      @saved="fetchVehicle()"
    ></vehicleData1>
  </Teleport>
</template>
<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import vehicleData1 from "../components/vehicleData.vue";
const vehicleData = ref([]);
const showTransportModal = ref(false);
import { ElMessageBox, ElMessage } from "element-plus";
const propsData = ref({});
const type = ref("post");

const fetchVehicle = async () => {
  await axios
    .get("http://localhost:3000/api/v1/vehicle/fetch")
    .then(({ data }) => {
      vehicleData.value = data.data;
    })
    .catch((e) => {
      console.log(e);
    });
};

onMounted(() => {
  fetchVehicle();
});

const handleClick = (id) => {
  ElMessageBox.confirm("will be deleted permanently. Continue?", "Warning", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "warning",
  })
    .then(async () => {
      await axios
        .delete(`http://localhost:3000/api/v1/vehicle/delete/${id}`)
        .then(() => {
          fetchVehicle();
          ElMessage({
            type: "success",
            message: "Transport deleted successfully",
          });
        })
        .catch((e) => {
          console.log(e);
        });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "Delete canceled",
      });
    });
};
</script>
