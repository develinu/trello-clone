import { writable } from 'svelte/store'
import cryptoRandomString from 'crypto-random-string'

const crypto = () => cryptoRandomString({ length : 10 })
const repoLists = JSON.parse(window.localStorage.getItem('lists')) || []

const _lists = writable(repoLists)
_lists.subscribe($lists => {
  window.localStorage.setItem("lists", JSON.stringify($lists))
})

export const lists = {
  subscribe: _lists.subscribe,
  add(payload) {
    const { title } = payload
    _lists.update($lists => {
      $lists.push({
        id: crypto(),
        title,
        cards: []
      })
      return $lists
    })
  }
}