<template>
  <div>
    <div class="d-flex align-items-center justify-content-end">
      <el-button type="primary" @Click="showTransportModal = true"
        >Add Transport</el-button
      >
    </div>
    <el-table :data="transportData" style="width: 100%">
      <el-table-column
        prop="transport_name"
        label="Transport Name"
        width="180"
      />
      <el-table-column prop="gstId" label="GST Id" width="100%" />
      <el-table-column prop="emailId" label="Email" width="100%" />
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
    <TrransportData
      v-if="showTransportModal"
      :data="propsData"
      :type="type"
      @close="showTransportModal = false"
      @saved="fetchTransports()"
    ></TrransportData>
  </Teleport>
</template>
<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import TrransportData from "../components/TransportData.vue";
const transportData = ref([]);
const showTransportModal = ref(false);
import { ElMessageBox, ElMessage } from "element-plus";
const propsData = ref({});
const type = ref("post");

const fetchTransports = async () => {
  await axios
    .get("http://localhost:3000/api/v1/transport/fetch")
    .then(({ data }) => {
      transportData.value = data.data;
    })
    .catch((e) => {
      console.log(e);
    });
};

onMounted(() => {
  fetchTransports();
});

const handleClick = (id) => {
  ElMessageBox.confirm("will be deleted permanently. Continue?", "Warning", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "warning",
  })
    .then(async () => {
      await axios
        .delete(`http://localhost:3000/api/v1/transport/delete/${id}`)
        .then(() => {
          fetchTransports();
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
