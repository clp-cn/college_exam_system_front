<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      mode="vertical"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path"/>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import MenuApi from '../../../../api/menu'

export default {
  components: { SidebarItem },
  data() {
    return {
      routes: []
    }
  },
  mounted() {
    this.getMenus()
  },
  methods: {
    getMenus() {
      let menus = []
      const routeMenus = this.$router.options.routes
      MenuApi.getMenus().then(response => {
        if (response.code === 200) {
          menus = response.data
          menus.forEach(m => {
            routeMenus.forEach(r => {
              if (m.path === r.path) {
                this.routes.push(r)
              }
            })
          })
        } else {
          this.$message({
            type: 'error',
            message: '菜单信息加载失败！',
            center: true
          })
        }
      })
    }
  },
  // eslint-disable-next-line vue/order-in-components
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    // routes() {
    //   return this.$router.options.routes
    // },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
