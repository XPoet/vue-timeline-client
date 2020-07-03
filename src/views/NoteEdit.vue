<template>
  <div class="note-edit-container">
    <Header></Header>
    <div class="note-edit">

      <el-form :model="ruleForm"
               :rules="rules"
               label-width="100px"
               label-position="left"
               ref="ruleForm"
               class="rule-form"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title" :clearable="true"/>
        </el-form-item>

        <el-form-item label="摘要" prop="description">
          <el-input type="textarea" v-model="ruleForm.description" :clearable="true"/>
        </el-form-item>

        <el-form-item label="内容" prop="content">
          <mavon-editor v-model="ruleForm.content"></mavon-editor>
        </el-form-item>


        <div class="buttons-box">
          <el-button type="primary" @click="submitForm('ruleForm')">发表笔记</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </div>
      </el-form>

    </div>
  </div>
</template>

<script>
  import Header from "../components/Header";

  export default {
    name: "NoteEdit",

    components: {
      Header
    },

    data() {
      return {
        ruleForm: {
          id: '',
          title: '',
          description: '',
          content: '',
        },
        rules: {
          title: [
            {required: true, message: '请输入标题', trigger: 'blur'},
            {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
          ],
          description: [
            {required: true, message: '请输入摘要', trigger: 'blur'},
            {min: 5, max: 50, message: '长度在 5 到 50 个字符', trigger: 'blur'}
          ],
          content: [
            {required: true, message: '请输入内容', trigger: 'blur'},
          ],
        }
      };
    },

    mounted() {
      const noteId = this.$route.params.noteId;

      if (noteId) {
        // 发起请求，获取相关的信息
        this.$axios.get(`/note/${noteId}`).then(res => {
          this.ruleForm.id = res.data.data.id;
          this.ruleForm.title = res.data.data.title;
          this.ruleForm.description = res.data.data.description;
          this.ruleForm.content = res.data.data.content;
        })

      }
    },

    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const _this = this;
            this.$axios.post(
              '/note/edit',
              this.ruleForm,
              {
                headers: {
                  'Authorization': localStorage.getItem('timeline_token')
                }
              }
            ).then(res => {
              if (res.data.code === 200) {
                _this.$alert('发表成功', '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    _this.$router.push('/notes');
                  }
                });
              }
            }).catch(error => {
              console.log('error', error);
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
  .note-edit-container {
    display: flex;
    flex-direction: column;
    align-items: center;

    .note-edit {
      width: 80%;

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

</style>
