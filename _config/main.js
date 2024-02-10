export default {
  moduleName: 'iblog',
  //Entities
  entityNames: {
    category: 'category',
    post: 'post',
  },
  //Quick Cards
  quickCards: [
    {
      active: true,
      permission: 'iblog.posts.manage',
      component: () => import('modules/qblog/_components/quick-cards/lastPosts')
    }
  ]
}
