<template>
    <div>login first sir</div>
    <div>
        phone: <el-input v-model="phone"/>
    </div>
    <div>
        pwd: <el-input v-model="pwd"/>
    </div>
    <el-button @click="login">login</el-button>
    <el-button @click="register">register</el-button>
    <el-button @click="forgetPassword">forget password</el-button>
    <el-dialog v-model="dialogFormVisible" title="Shipping address">
        <el-form
            ref="registerForm" :rules="rules"
            :model="formData"
        >
            <el-form-item
                label="名字" prop="username"
                :label-width="formLabelWidth"
            >
                <el-input v-model="formData.username" autocomplete="off"/>
            </el-form-item>
            <el-form-item
                label="手机" prop="mobile"
                :label-width="formLabelWidth"
            >
                <el-input v-model="formData.mobile" autocomplete="off"/>
            </el-form-item>
            <el-form-item
                prop="pwd" label="密码"
                :label-width="formLabelWidth"
            >
                <el-input v-model="formData.pwd" autocomplete="off"/>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Cancel</el-button>
                <el-button type="primary" @click="comfirm">
                    Confirm
                </el-button>
            </span>
        </template>
    </el-dialog>
    <el-dialog v-model="dialogResetPassowrdFormVisible" title="forgetPassword">
        <el-form
            ref="passwordForm" :rules="rules"
            :model="passwordFormData"
        >
            <el-form-item
                label="名字" prop="username"
                :label-width="formLabelWidth"
            >
                <el-input v-model="passwordFormData.username" autocomplete="off"/>
            </el-form-item>
            <el-form-item
                label="手机" prop="mobile"
                :label-width="formLabelWidth"
            >
                <el-input v-model="passwordFormData.mobile" autocomplete="off"/>
            </el-form-item>
            <el-form-item
                label="密码" prop="pwd"
                :label-width="formLabelWidth"
            >
                <el-input v-model="passwordFormData.pwd" autocomplete="off"/>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogResetPassowrdFormVisible = false">Cancel</el-button>
                <el-button type="primary" @click="comfirmResetPassword">
                    comfirmResetPassword
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts">
export default {
    name: 'CustomName',
    inheritAttrs: false,
};
</script>
<script lang="ts" setup>
import { ElMessage, FormInstance, FormRules } from 'element-plus';
import { useRouter } from 'vue-router';
import { useUserStore } from 'stores/modules/user';

const store = useUserStore();
const phone = ref("15942043948");
const pwd = ref("1234");
const router = useRouter();

const login = async () => {
    const params = {
        "mobile": phone.value,
        "pwd": pwd.value
    };
    try {
        const res = await API.login(params);
        ElMessage({
            type: 'success',
            message: res.message
        });
        store.updateUserInfo({
            username: res.data.data.username,
            avatarUrl: res.data.data.avatarUrl,
            isAuth: true,
        });
        router.push('/list');
    } catch (error) {
        ElMessage({
            type: 'error',
            message: (error as { message: string}).message
        });
    }
};
interface Demo {
    mobile: string;
    pwd: string;
    username: string;
}
const formData = ref<Demo>({
    "mobile": '',
    "pwd": "",
    "username": ""
});

const passwordFormData = ref<Demo>({
    "mobile": '',
    "pwd": "",
    "username": ""
});

const rules = reactive<FormRules>({
    mobile: [
        { required: true, message: 'Please input Activity name', trigger: ['blur', 'change'] },
    ],
    pwd: [
        { required: true, message: 'Please input Activity name', trigger: ['blur', 'change'] },
    ],
    username: [
        { required: true, message: 'Please input Activity name', trigger: ['blur', 'change'] },
    ],
});

const register = () => {
    dialogFormVisible.value = true;
};

const forgetPassword = () => {
    dialogResetPassowrdFormVisible.value = true;
};
const passwordForm = ref<FormInstance>();
const registerForm = ref<FormInstance>();
const validateForm = async (form: FormInstance) => {
    const res = await form.validate();
};

const comfirmResetPassword = async () => {
    await validateForm(passwordForm.value as FormInstance);
    try {
        const res = await API.comfirmResetPassword(passwordFormData.value);
        ElMessage({
            type: 'success',
            message: res.message
        });
        passwordFormData.value = {
            "mobile": '',
            "pwd": "",
            "username": ""
        };
        dialogResetPassowrdFormVisible.value = false;
    } catch (error) {
        ElMessage({
            type: 'error',
            message: (error as { message: string }).message
        });
    }
};

const comfirm = async () => {
    await validateForm(registerForm.value as FormInstance);
    try {
        const res = await API.register(formData.value);
        ElMessage({
            type: 'success',
            message: res.message
        });
        formData.value = {
            "mobile": '',
            "pwd": "",
            "username": ""
        };
        dialogFormVisible.value = false;
    } catch (error) {
        ElMessage({
            type: 'error',
            message: (error as { message: string }).message
        });
    }
};

const dialogFormVisible = ref(false);
const dialogResetPassowrdFormVisible = ref(false);
const formLabelWidth = '140px';

</script>

<style scoped>
.item_container {
    display: flex;
    flex-wrap: wrap;
}

.img {
    width: 250px;
    height: 250px;
    object-fit: cover;

}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
