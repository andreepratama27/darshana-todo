import httpClient from '../services/httpClient'

class Api {
  static login(obj) {
    return httpClient().post('auth/login', obj).then(resp => resp)
  }

  static register(obj) {
    return httpClient().post('auth/register', obj).then(resp => resp)
  }

  static getTodo(token) {
    return httpClient(token).get('todo').then(resp => resp)
  }

  static postTodo(token, obj) {
    return httpClient(token).post('todo', obj).then(resp => resp)
  }

  static updateTodo(token, obj) {
    return httpClient(token).put(`todo/${obj.id}`, obj).then(resp => resp)
  }

  static deleteTodo(token, obj) {
    return httpClient(token).delete(`todo/${obj.id}`).then(resp => resp)
  }
}

export default Api