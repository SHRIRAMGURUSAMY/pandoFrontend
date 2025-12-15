<template>
  <el-dialog
    :show-close="false"
    :destroy-on-close="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    v-model="dialogVisible"
    class="mt-4 p-0"
    width="500"
  >
    <template #header>
      <div class="d-flex justify-content-between border-bottom px-4 pt-2">
        <h4 class="font-19 mb-0 fw-bold pt-1">shipment Data</h4>
        <el-button class="border-0">
          <i class="far fa-times fa-lg"></i>
        </el-button>
      </div>
    </template>
    <el-form :model="form" ref="formRef" class="px-4">
      <div class="row">
        <div class="col-lg-5">
          <div class="form-group">
            <label class="required" for="firstName">Source</label>
            <el-form-item
              :prop="'source'"
              :rules="{
                required: true,
                message: 'Source required',
                trigger: 'blur',
              }"
            >
              <el-input
                type="text"
                v-model="form.source"
                ref="firstInputRef"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="col-lg-5">
          <div class="form-group">
            <label class="required" for="firstName">Destination</label>
            <el-form-item
              :prop="'destination'"
              :rules="{
                required: true,
                message: 'Destination required',
                trigger: 'blur',
              }"
            >
              <el-input
                type="text"
                v-model="form.destination"
                ref="firstInputRef"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="col-lg-5">
          <div class="form-group">
            <label class="required" for="firstName">Product Code</label>
            <el-form-item
              :prop="'productCode'"
              :rules="{
                required: false,
                message: ' ',
                trigger: 'blur',
              }"
            >
              <el-input
                type="text"
                v-model="form.productCode"
                ref="firstInputRef"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="col-lg-5">
          <div class="form-group">
            <label class="required" for="firstName">Weight</label>
            <el-form-item
              :prop="'weight'"
              :rules="{
                required: true,
                message: ' ',
                trigger: 'blur',
              }"
            >
              <el-input type="number" v-model="form.weight"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="col-lg-5">
          <div class="form-group">
            <label class="required" for="firstName">UOI</label>
            <el-form-item
              :prop="'uoi'"
              :rules="{ required: false, message: ' ', trigger: 'blur' }"
            >
              <el-input type="number" v-model="form.uoi"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="col-lg-5">
          <div class="form-group">
            <label class="required" for="firstName">Quantity</label>
            <el-form-item
              :prop="'quantity'"
              :rules="{ required: false, message: ' ', trigger: 'blur' }"
            >
              <el-input type="number" v-model="form.quantity"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="col-lg-5">
          <div class="form-group">
            <label class="required" for="firstName">Order No</label>
            <el-form-item
              :prop="'orderNumber'"
              :rules="{ required: false, message: ' ', trigger: 'blur' }"
            >
              <el-input type="number" v-model="form.orderNumber"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="col-lg-5">
          <div class="form-group">
            <label class="required" for="firstName">Shipment ID</label>
            <el-form-item
              :prop="'shipmentID'"
              :rules="{ required: false, message: ' ', trigger: 'blur' }"
            >
              <el-input type="number" v-model="form.shipmentID"></el-input>
            </el-form-item>
          </div>
        </div>
      </div>
    </el-form>
    <template #footer>
      <div class="d-flex justify-content-between px-4 py-2 border-top">
        <el-button @click="clearForm()">Cancel </el-button>
        <el-button
          :disabled="isSubmitted"
          :loading="isSubmitted"
          type="primary"
          @click="onSubmit()"
          >Save
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import axios from "axios";
const dialogVisible = ref(false);
const isSubmitted = ref(false);
//  {
//             "_id": "693fd452d04f4fb08e15602b",
//             "serialNumber": 1,
//             "source": "kutralam",
//             "destination": "rajapalayam",
//             "productCode": "GoodDay",
//             "weight": 100,
//             "uoi": 50,
//             "quantity": 5,
//             "orderNumber": 1,
//             "shipmentID": "s1"
//         },
const form = ref({
  source: "",
  destination: "",
  productCode: "",
  weight: 0,
  uoi: 0,
  quantity: 0,
  orderNumber: 0,
  shipmentID: "",
});
const formRef = ref(null);
const props = defineProps(["data", "type"]);
const emit = defineEmits(["saved", "close"]);
const id = ref(null);

onMounted(() => {
  console.log("props", props.data);
  if (props.type == "put") {
    id.value = props.data._id;
    form.value = {
      source: props.data.source,
      destination: props.data.destination,
      productCode: props.data.productCode,
      weight: props.data.weight,
      uoi: props.data.uoi,
      quantity: props.data.quantity,
      orderNumber: props.data.orderNumber,
      shipmentID: props.data.shipmentID,
    };
  }
  dialogVisible.value = true;
});

const clearForm = () => {
  dialogVisible.value = false;
  emit("close");
  emit("saved");
};

const onSubmit = async () => {
  console.log("form", form.value);
  if (props.type == "put") {
    await axios
      .put(
        `http://localhost:3000/api/v1/shipments/update/${id.value}`,
        form.value
      )
      .then(({ data }) => {
        ElMessage.success("Shipment Data updated Succefully");
        clearForm();
      })
      .catch((e) => {
        console.log(e);
        ElMessage.error("GSD id Must be Unique");
      });
  } else {
    await axios
      .post("http://localhost:3000/api/v1/shipments/create", form.value)
      .then(({ data }) => {
        // console.log("res", res);
        ElMessage.success("Shipment Data created Succefully");
        clearForm();
      })
      .catch((e) => {
        console.log(e);
        ElMessage.error("Error occured");
      });
  }
};
</script>
