<template>
  <quick-card :params="quickCardParams"/>
</template>
<script>
//Component
import quickCard from 'modules/qsite/_components/master/quickCard'

export default {
  props: {},
  components: {quickCard},
  watch: {},
  mounted() {
    this.$nextTick(function () {
    })
  },
  data() {
    return {
      loading: false,
      posts: []
    }
  },
  computed: {
    quickCardParams() {
      return {
        type : 'list-h',
        title: this.$tr('iblog.cms.quickCard.lastPosts'),
        icon: 'fas fa-newspaper',
        apiRoute: 'apiRoutes.qblog.posts',
        requestParams: {
          filter: {order: {way: 'desc'}}
        },
        information: {
          image: {field: 'mediaFiles', format: val => val ? val?.mainimage.mediumThumb : null},
          text1: {field: 'createdAt', format: val => this.$trd(val)},
          text2: {field: 'title'},
          text3: {field: 'summary'},
        },
        actionTo: 'qblog.admin.posts.internal'
      }
    }
  },
  methods: {}
}
</script>
<style lang="scss">
</style>
