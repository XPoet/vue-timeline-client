<template>
  <div class="note-detail-container">
    <Header></Header>
    <div class="note-detail">
      <h2>{{ note.title }}</h2>
      <el-row>
        <router-link :to="{name: 'NoteEdit', params: {noteId: note.id}}"
                     v-if="ownNote"
        >
          <el-link icon="el-icon-edit">编辑</el-link>
        </router-link>
      </el-row>
      <el-divider></el-divider>
      <div v-html="note.content"
           class="markdown-body"
      ></div>
    </div>
  </div>
</template>

<script>
  import Header from "../components/Header";
  import MarkdownIt from 'markdown-it'
  import 'github-markdown-css/github-markdown.css'

  export default {
    name: "NoteDetail",

    components: {
      Header
    },

    data() {
      return {
        note: {
          id: '',
          title: '',
          content: ''
        },
        ownNote: false
      }
    },

    mounted() {
      const noteId = this.$route.params.noteId;

      if (noteId) {
        this.$axios.get(`/note/${noteId}`).then(res => {
          this.note.id = res.data.data.id;
          this.note.title = res.data.data.title;
          this.note.content = new MarkdownIt().render(res.data.data.content);
          this.ownNote = res.data.data['userId'] === this.$store.getters.getUser.id;
        })

      }
    },
  }
</script>

<style scoped lang="scss">

  .note-detail-container {
    display: flex;
    flex-direction: column;
    align-items: center;

    .note-detail {
      width: 80%;
      padding: 10px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }
  }
</style>
