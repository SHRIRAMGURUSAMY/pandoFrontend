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
        <h4 class="font-19 mb-0 fw-bold pt-1">Transport Data</h4>
        <el-button class="border-0">
          <i class="far fa-times fa-lg"></i>
        </el-button>
      </div>
    </template>
    <el-form :model="form" ref="formRef" class="px-4">
      <div class="row">
        <div class="col-lg-5">
          <div class="form-group">
            <label class="required" for="firstName">Transport Name</label>
            <el-form-item
              :prop="'transport_name'"
              :rules="{
                required: true,
                message: 'Transport Name required',
                trigger: 'blur',
              }"
            >
              <el-input
                type="text"
                v-model="form.transport_name"
                ref="firstInputRef"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="col-lg-5">
          <div class="form-group">
            <label class="required" for="firstName">GSD ID</label>
            <el-form-item
              :prop="'gstId'"
              :rules="{
                required: true,
                message: 'GST id required and unique',
                trigger: 'blur',
              }"
            >
              <el-input
                type="number"
                v-model="form.gstId"
                ref="firstInputRef"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="col-lg-5">
          <div class="form-group">
            <label class="required" for="firstName">Email Id</label>
            <el-form-item
              :prop="'emailId'"
              :rules="{ required: false, message: ' ', trigger: 'blur' }"
            >
              <el-input
                type="text"
                v-model="form.emailId"
                ref="firstInputRef"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="col-lg-5">
          <div class="form-group">
            <label class="required" for="firstName">city</label>
            <el-form-item
              :prop="'address'"
              :rules="{ required: false, message: ' ', trigger: 'blur' }"
            >
              <el-input
                type="text"
                v-model="form.address.city"
                ref="firstInputRef"
              ></el-input>
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

const form = ref({
  transport_name: "",
  gstId: 0,
  emailId: "",
  address: {
    city: "",
    pincode: "626102",
  },
});
const formRef = ref(null);
const props = defineProps(["data", "type"]);
const emit = defineEmits(["saved", "close"]);
const id = ref(null);

onMounted(() => {
  console.log("props", props.data);
  if ((props.type = "put")) {
    id.value = props.data._id;
    form.value = {
      transport_name: props.data.transport_name,
      gstId: props.data.gstId,
      emailId: props.data.emailId,
      address: {
        city: props.data.city,
        pincode: props.data.pincode,
      },
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
  console.log("p", props.type);
  if (props.type == "put") {
    await axios
      .put(
        `http://localhost:3000/api/v1/transport/update/${id.value}`,
        form.value
      )
      .then(({ data }) => {
        ElMessage.success("Transport Data updated Succefully");
        clearForm();
      })
      .catch((e) => {
        console.log(e);
        ElMessage.error("GSD id Must be Unique");
      });
  } else {
    await axios
      .post("http://localhost:3000/api/v1/transport/create", form.value)
      .then(({ data }) => {
        // console.log("res", res);
        ElMessage.success("Transport Data created Succefully");
        clearForm();
      })
      .catch((e) => {
        console.log(e);
        ElMessage.error("GSD id Must be Unique");
      });
  }
};
</script>
