const getters = {
    token: state => state.user.token,
    userInfo: state => state.user.userInfo,
    roles: state => state.user.roles, 
    permission_routes: state => state.permission.routes,
    menuList: state => state.permission.menuList

  }
  export default getters
  