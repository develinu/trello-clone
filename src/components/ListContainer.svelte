<script>
  import { onMount } from 'svelte'
  import { lists } from '~/store/list'
  import List from '~/components/List.svelte'
  import CreateList from '~/components/CreateList.svelte'
  import Sortable from 'sortablejs'

  let listsEl
  let sortableLists

  onMount(() => {
    sortableLists = new Sortable(listsEl, {
      group: "My Lists",
      handle: ".list",
      delay: 50,
      animation: 0,
      forceFallback: true, 
      // true : sortablejs 자체 DnD 동작
      // false : html5 기본 DnD 동작 -> 크로스 브라우징 이슈 발생

      onEnd(event) {
        console.log(event)
        lists.reorder({
          oldIndex: event.oldIndex,
          newIndex: event.newIndex
        })
      }
    })
  })
</script>

<div class="list-container">
  <div 
    bind:this={listsEl}
    class="lists"
    >
    {#each $lists as list (list.id)}
      <List {list} />
    {/each}
  </div>
  <CreateList />
</div>

<style lang="scss">
  .list-container {
    width: 100vw;
    height: calc(100vh - 40px);
    // border: 10px solid red;
    padding: 30px;
    box-sizing: border-box;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    font-size: 0;
    line-height: 20px;

    .lists {
      display: inline-block;
      height: 100%;
      // border: 10px solid blue;
      // box-sizing: border-box;  // padding과 border만 고려하면 됨
      white-space: nowrap;
      font-size: 0;
    }
  }
</style>