import { login, logout, getInfo } from '@/api/login'
const user = {
  state: {
    token: localStorage.getItem("token"),
    roles: [],
    userInfo: JSON.parse(localStorage.getItem("userInfo"))
    
  },

  mutations: {
    SET_TOKEN: (state, token) => {
        state.token = token;
        localStorage.setItem("token",token);
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    },
    SET_USERINFO: (state, userInfo) => {
        state.userInfo = userInfo;
        localStorage.setItem("userInfo",JSON.stringify(userInfo));
    },
    REMOVE_INFO: state => {
        state.token = '';
        state.userInfo = {};
        localStorage.setItem("token",'');
        localStorage.setItem("userInfo",JSON.stringify(''));
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response
        
          commit('SET_TOKEN', data.data.token)
        
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const data = response
          
          if (data.data.roles && data.data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.data.roles)
           
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_USERINFO', data.data.userInfo)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
       
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },
    // 动态修改权限
    ChangeRoles({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getInfo(role).then(response => {
          const data = response
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          resolve()
        })
      })
    }
  }
}

export default user
