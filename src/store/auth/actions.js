import axios from 'axios'
import { Notify } from 'quasar'

export function getPortsList () {
  return new Promise((resolve, reject) => {
    axios.get('data/ports.json', { baseURL: window.location.origin })
      .then(response => {
        resolve(response.data)
        // console.log(response.data)
        // state.commit('setListPorts', response.data)
      })
      .catch(error => {
        Notify.create({
          color: 'red-5',
          textColor: 'white',
          icon: 'fas fa-exclamation-triangle',
          message: 'Problems in obtaining the information. ' + error.response.data,
          position: 'top'
        })
      })
  })
}

export function fetchListPorts (state, data) {
  state.commit('setListPorts', data)
}

export function getExcursionsList () {
  return new Promise((resolve, reject) => {
    axios.get('data/shorex.json', { baseURL: window.location.origin })
      .then(response => {
        resolve(response.data)
        // console.log(response.data)
        // state.commit('setListPorts', response.data)
      })
      .catch(error => {
        Notify.create({
          color: 'red-5',
          textColor: 'white',
          icon: 'fas fa-exclamation-triangle',
          message: 'Problems in obtaining the information. ' + error.response.data,
          position: 'top'
        })
      })
  })
}

export function fetchListExcursions (state, data) {
  state.commit('setListExcursions', data)
}
