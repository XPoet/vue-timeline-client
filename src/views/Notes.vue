<template>
  <div class="notes-container">
    <Header></Header>
    <div class="notes-list">
      <el-timeline>
        <el-timeline-item
          v-for="item in notes"
          :timestamp="item.created"
          placement="top"
        >
          <el-card>
            <h4>
              <!-- 路由跳转到 note 详情页 -->
              <router-link :to="{name: 'NoteDetail', params: {noteId: item.id}}">
                {{ item.title }}
              </router-link>
            </h4>
            <p>{{ item.description }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      :current-page="currentPage"
      @current-change="currentChange($event)"
    >
    </el-pagination>
  </div>
</template>

<script>
  import Header from '../components/Header';

  export default {
    name: "Notes",

    components: {
      Header
    },

    data() {
      return {
        notes: {},
        currentPage: 1,
        total: 0,
        pageSize: 5,
      }
    },

    mounted() {
      this.page(this.currentPage);
    },

    methods: {
      page(currentPage) {
        const _this = this;
        this.$axios.get(`/notes?currentPage=${currentPage}`)
          .then(res => {
            _this.notes = res.data.data['records'];
            _this.total = res.data.data['total'];
            _this.pageSize = res.data.data['size'];
            _this.currentPage = res.data.data['current'];
          })
      },

      currentChange(e) {
        this.page(e);
      }
    }

  }
</script>

<style scoped lang="scss">

  .notes-container {
    display: flex;
    flex-direction: column;
    align-items: center;

    .notes-list {
      width: 80%;
    }

  }


</style>
