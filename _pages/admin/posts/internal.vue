<template>
  <div id="postInternalPage">
    <!--Content-->
    <div id="pageContent" class="box relative-position">
      <!--Search-->
      <div class="full-width row">
        <dynamic-field v-model="search" :field="searchField" class="col-12 col-md-4 col-xl-3"
                       @update:modelValue="getData()"/>
      </div>
      <!--posts-->
      <div id="usersContent" class="q-py-lg row q-col-gutter-lg">
        <!--Empty list-->
        <div v-if="!loading && posts && !posts.length">
          <not-result/>
        </div>
        <!--List-->
        <div v-for="(post, keyPost) in posts" :key="keyPost" class="col-12 col-md-4 col-xl-3">
          <q-card class="post-card no-shadow cursor-pointer" bordered @click="modal.post = post, modal.show = true">
            <!---Image-->
            <div class="post-card__image img-as-bg"
                 :style="`background-image: url('${post?.mediaFiles?.mainimage.mediumThumb}')`"></div>
            <!--Title and subtitle-->
            <q-card-section>
              <div class="post-card__title text-h6 ellipsis-2-lines q-mb-sm">{{ post.title }}</div>
              <div class="post-card__subtitle text-subtitle2 ellipsis">{{ $trd(post.createdAt) }}</div>
            </q-card-section>
            <!--Description-->
            <q-card-section class="post-card__description q-py-none q-mb-lg ellipsis-3-lines">
              <div v-html="post.summary"></div>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <!--Pagination-->
      <div class="row justify-end full-width">
        <q-pagination v-model="pagination.page" :max="pagination.lastPage" input color="grey-9"
                      @update:modelValue="(page) => {pagination.page = page; getData()}"/>
      </div>
      <!--Modal post-->
      <q-dialog id="modalPost" v-model="modal.show">
        <q-card id="cardModalPost" class="bg-grey-1">
          <!--Header-->
          <q-toolbar class="bg-primary text-white">
            <q-toolbar-title>
              {{ `${$tr('iblog.cms.post')}: ${modal.post.id}` }}
            </q-toolbar-title>
            <q-btn flat v-close-popup icon="fas fa-times"/>
          </q-toolbar>
          <!--Post information-->
          <div id="modalPostInfo" class="full-width">
            <q-card class="post-card no-shadow" v-if="modal.post">
              <!---Image-->
              <div class="post-card__image img-as-bg"
                   :style="`background-image: url('${modal.post?.mediaFiles?.mainimage.mediumThumb}')`"></div>
              <!--Title and subtitle-->
              <q-card-section>
                <div class="post-card__title text-h6 ellipsis-2-lines q-mb-sm">{{ modal.post.title }}</div>
                <div class="post-card__subtitle text-subtitle2 ellipsis">{{ $trd(modal.post.createdAt) }}</div>
              </q-card-section>
              <!--Description-->
              <q-card-section class="post-card__description">
                <div v-html="modal.post.description"></div>
              </q-card-section>
            </q-card>
          </div>
        </q-card>
      </q-dialog>
      <!--Loading-->
      <inner-loading :visible="loading"/>
    </div>
  </div>
</template>
<script>
import { eventBus } from 'src/plugins/utils'
export default {
  props: {},
  components: {},
  watch: {},
  mounted() {
    this.$nextTick(function () {
      this.init()
    })
  },
  data() {
    return {
      loading: false,
      search: null,
      pagination: {
        perPage: 12,
        page: 1,
        lastPage: 1
      },
      posts: [],
      modal: {
        show: false,
        post: false
      }
    }
  },
  computed: {
    searchField() {
      return {
        value: null,
        type: 'search'
      }
    }
  },
  methods: {
    init() {
      this.setFilters()//Set filters
      this.getData()//Get data
      //Listen event refresh
      eventBus.on('page.data.refresh', () => this.getData(true))
    },
    //Set filters
    setFilters() {
      this.$filter.setFilter({
        name: this.$route.name,
        fields: {
          categoryId: {
            value: null,
            type: 'treeSelect',
            props: {
              label: this.$tr('isite.cms.label.category')
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qblog.categories'
            }
          }
        },
        callBack: () => this.getData(true)
      })
    },
    //Get data
    getData(refresh = false) {
      return new Promise((resolve, reject) => {
        this.loading = true
        //request params
        let requestParams = {
          refresh: refresh,
          params: {
            page: this.pagination.page,
            take: this.pagination.perPage,
            filter: {
              search: this.search,
              ...this.$filter.values
            }
          }
        }
        //Request
        this.$crud.index('apiRoutes.qblog.posts', requestParams).then(response => {
          this.posts = response.data
          this.pagination.lastPage = response.meta.page.lastPage
          this.loading = false
          resolve(response.data)
        }).catch(error => {
          this.$apiResponse.handleError(error, () => {
            this.loading = false
            reject(error)
          })
        })
      })
    }
  }
}
</script>
<style lang="scss">
#postInternalPage, #modalPost {
  .post-card {
    .post-card__image {
      height: 250px;
      width: 100%;
      border-radius: 0;
    }

    .post-card__title {
      line-height: 1;
      min-height: 40px;
    }

    .post-card__subtitle {
      color: $grey-7;
    }

    .post-card__description {
      overflow: hidden;
    }
  }

  #modalPost {
    #cardModalPost {
      max-width: 900px;
    }

    #modalPostInfo {
      max-height: calc(100vh - 100px);
      overflow-y: scroll;

      img {
        max-width: 100%;
        max-height: 300px;
      }
    }
  }
}
</style>
