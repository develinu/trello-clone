<script>
  import { autoFocusout } from '~/actions/autoFocusout'
  import { onDestroy, tick, createEventDispatcher } from 'svelte'
  import { lists } from '~/store/list'

  export let list

  const dispatcher = createEventDispatcher()

  let isEditMode = false
  let title = list.title
  let textareaEl  

  function saveTitle() {
    if (title.trim()) {
      lists.edit({
        listId: list.id,
        title
      })
    }
    offEditMode()
  }
  function removeList() {
    lists.remove({
      listId: list.id
    })
    offEditMode()
  }
  async function onEditMode() {
    isEditMode = true
    dispatcher("editMode", true)
    title = list.title
    await tick()
    textareaEl && textareaEl.focus()
  }
  function offEditMode() {
    isEditMode = false
    dispatcher("editMode", false)
  }

  onDestroy(() => {
    offEditMode()
  })
</script>

<style lang="scss">
  h2.title {
    position: relative;
    font-weight: 700;
    padding: 4px 8px;
    cursor: pointer;

    .btn {
      display: none;
      position: absolute;  // 부모 요소에 position이 반드시 명시되어 있어야 함. // display가 block으로 바뀜
      top: 0;
      right: 0;
    }
  }

  :global(.list__inner:hover .edit-btn-for-list) {
    display: block !important;
  }
</style>

{#if isEditMode}
  <div 
    class="edit-mode"
    use:autoFocusout={offEditMode}>
    <textarea
      bind:value={title}
      bind:this={textareaEl}
      placeholder="Enter a title for this list..."
      on:keydown={e => {
        e.key === "Enter" && saveTitle()
        e.key === "Escape" && offEditMode()
        e.key === "Esc" && offEditMode()
      }} />
    <div class="actions">

    </div>
    <div 
      class="btn success"
      on:click={saveTitle}>
      Save
    </div>
    <div 
      class="btn"
      on:click={offEditMode}>
      Cancel
    </div>
    <div 
      class="btn danger"
      on:click={removeList}>
      Delete List
    </div>
  </div>
{:else}
  <h2 class="title">
    {list.title}
    <div 
      class="btn small edit-btn-for-list"
      on:click={onEditMode}>
      Edit
    </div>
  </h2>
{/if}