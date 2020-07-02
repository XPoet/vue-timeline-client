<template>
  <div class="header-container">
    <h2 class="title">
      Timeline Note 时间笔记
    </h2>
    <div class="avatar item">
      <el-avatar :size="50" :src="userInfo.avatar"></el-avatar>
    </div>
    <div class="username item">{{ userInfo.username ? userInfo.username : '请先登录' }}</div>
    <div class="nav item">
      <span>
        <el-link href="/notes">主页</el-link>
      </span>
      <el-divider direction="vertical"></el-divider>
      <span>
        <el-link href="/note/add" type="primary">写笔记</el-link>
      </span>
      <el-divider direction="vertical"></el-divider>
      <span v-if="!userInfo.username">
        <el-link href="/login" type="success">登录</el-link>
      </span>
      <span v-if="userInfo.username">
        <el-link type="danger"
                 @click="logout()"
        >退出</el-link>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Header",

    data() {
      return {
        userInfo: {
          username: '',
          avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
        }
      }
    },

    methods: {
      logout() {
        const _this = this;
        this.$axios.get(
          '/logout',
          {
            headers: {
              'Authorization': localStorage.getItem('timeline_token')
            }
          }
        ).then(res => {
          _this.$store.commit('REMOVE_INFO');
          _this.$router.push('/login')
        })

      }
    },

    mounted() {

      const userInfo = this.$store.getters.getUser;

      if (userInfo.username && userInfo.avatar) {
        this.userInfo.username = userInfo.username
        this.userInfo.avatar = userInfo.avatar
      }

    }
  }
</script>

<style scoped lang="scss">

  .header-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .item {
      margin-bottom: 10px;
    }
  }

</style>
