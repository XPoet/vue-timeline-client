<template>
  <div class="login-container">
    <el-container>
      <el-header>
        timeline note
      </el-header>
      <el-main>

        <el-form :model="ruleForm"
                 :rules="rules"
                 label-width="100px"
                 label-position="left"
                 ref="ruleForm"
                 class="rule-form"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username" :clearable="true"/>
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" :clearable="true"/>
          </el-form-item>

          <div class="buttons-box">
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </div>
        </el-form>

      </el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "Login",

    data() {
      return {
        ruleForm: {
          username: 'xpoet',
          password: '111111',
        },
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 4, max: 16, message: '长度在 4 到 16 个字符', trigger: 'blur'}
          ],
        }
      };
    },

    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {

            const _this = this;

            this.$axios.post(
              'http://localhost:8080/login',
              this.ruleForm
            ).then(res => {
              if (res.data.code === 200) {
                const jwt = res.headers['authorization'];
                const userInfo = res.data.data;

                // 数据共享出去
                _this.$store.commit('SET_TOKEN', jwt);
                _this.$store.commit('SET_USERINFO', userInfo);

                // 跳转页面
                _this.$router.push('notes');
              }
            })

          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped lang="scss">

  .login-container {
    position: relative;
    width: 100%;
    height: 100%;

    .el-container {
      position: absolute;
      width: 600px;
      height: 400px;
      top: 10%;
      left: 50%;
      transform: translateX(-50%);
    }

    .el-header {
      background-color: #B3C0D1;
      color: #333;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 22px;
      font-weight: bold;
    }

    .el-main {
      background-color: #E9EEF3;
      color: #333;
      width: 100%;
      height: 100%;

      .rule-form {
        width: 80%;
        margin: 50px auto;

        .buttons-box {
          display: flex;
          justify-content: center;

          .el-button {
            margin-right: 20px;

            &:last-child {
              margin-right: 0;
            }
          }
        }
      }
    }

  }


</style>
