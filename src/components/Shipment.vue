<template>
  <div>
    <div class="row">
      <div class="col-12">
        <div class="d-flex gap-2">
          <el-button type="primary" @click="showTransportModal = true">
            Add Shipment
          </el-button>

          <el-upload
            :auto-upload="true"
            :before-upload="beforeUpload"
            :http-request="uploadExcel"
            accept=".xls,.xlsx"
            :show-file-list="false"
          >
            <el-button type="primary">Upload Excel</el-button>
          </el-upload>
        </div>
      </div>
    </div>
    <el-table :data="shipmentData" style="width: 100%">
      <el-table-column prop="source" label="Source" width="120" />
      <el-table-column prop="destination" label="Destination" width="140" />
      <el-table-column prop="productCode" label="Product" width="120" />
      <el-table-column prop="weight" label="Weight" width="100" />
      <el-table-column prop="quantity" label="Quantity" width="100" />
      <el-table-column prop="orderNumber" label="Order No" width="140" />
      <el-table-column prop="shipmentID" label="Shipment ID" width="150" />

      <el-table-column fixed="right" label="Operations" width="160">
        <template #default="{ row }">
          <el-button type="danger" size="small" @click="handleClick(row._id)">
            Delete
          </el-button>

          <el-button
            type="primary"
            size="small"
            @Click="
              (showTransportModal = true), (propsData = row), (type = 'put')
            "
          >
            Edit
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <Teleport to="body">
    <shipmentData1
      v-if="showTransportModal"
      :data="propsData"
      @close="showTransportModal = false"
      :type="type"
      @saved="fetchShipment()"
    ></shipmentData1>
  </Teleport>
</template>
<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import shipmentData1 from "../components/shipmentData.vue";
const shipmentData = ref([]);
const showTransportModal = ref(false);
import { ElMessageBox, ElMessage } from "element-plus";
const propsData = ref({});
const type = ref("post");

const fetchShipment = async () => {
  await axios
    .get("http://localhost:3000/api/v1/shipments/fetch")
    .then(({ data }) => {
      shipmentData.value = data.data;
    })
    .catch((e) => {
      console.log(e);
    });
};

onMounted(() => {
  fetchShipment();
});

const handleClick = (id) => {
  ElMessageBox.confirm("will be deleted permanently. Continue?", "Warning", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "warning",
  })
    .then(async () => {
      await axios
        .delete(`http://localhost:3000/api/v1/shipments/delete/${id}`)
        .then(() => {
          fetchShipment();
          ElMessage({
            type: "success",
            message: "shipment deleted successfully",
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
const beforeUpload = (file) => {
  console.log("file", file);
  const isExcel =
    file.type ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
    file.type === "application/vnd.ms-excel";

  if (!isExcel) {
    ElMessage.error("Only Excel files are allowed");
  }

  return isExcel;
};

const uploadExcel = async ({ file }) => {
  const formData = new FormData();
  formData.append("uploadData", file);
  console.log("ksdhjd", formData);

  try {
    await axios.post(
      "http://localhost:3000/api/v1/shipments/file-upload/bulkData",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    ElMessage.success("Excel uploaded successfully");
    fetchShipment();
  } catch (error) {
    ElMessage.error("Upload failed");
  }
};
</script>
