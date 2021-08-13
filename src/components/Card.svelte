<script>
  import { onDestroy, tick, createEventDispatcher } from 'svelte'
  import { autoFocusout } from '~/actions/autoFocusout'
  import { cards } from '~/store/list'

  export let listId
  export let card

  const dispatcher = createEventDispatcher()

  let isEditMode = false
  let title
  let textareaEl

  function saveCard() {
    if (title.trim()) {
      cards.edit({
        listId,
        cardId: card.id,
        title
      })
    }
    offEditMode()
  }
  function removeCard() {
    cards.remove({
      listId,
      cardId: card.id
    })
    offEditMode()
  }
  async function onEditMode() {
    isEditMode = true
    dispatcher("editMode", true)
    title = card.title
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

<div class="card">
  {#if isEditMode}
    <div 
      use:autoFocusout={offEditMode}
      class="edit-mode">
      <textarea
        bind:value={title}
        bind:this={textareaEl}
        placeholder="Enter a title for this card..."
        on:keydown={e => {
          e.key === "Enter" && saveCard()
          e.key === "Escape" && offEditMode()
          e.key === "Esc" && offEditMode()
        }}></textarea>
        <div class="actions">
          <div 
            class="btn success"
            on:click={saveCard}>
            Save
          </div>
          <div 
            class="btn"
            on:click={offEditMode}>
            Cancel
          </div>
          <div 
            class="btn danger"
            on:click={removeCard}>
            Delete Card
          </div>
        </div>
    </div>
  {:else}
    <div class="title">
      {card.title}
    </div>
    <div 
      class="btn small"
      on:click={onEditMode}>
      Edit
    </div>
  {/if}
</div>

<style lang="scss">
  .card {
    margin: 0 0 8px 0;
    &:last-child {
      margin: 0 0 1px 0;
    }
    :global(&.sortable-ghost) {
      position: relative;
      opacity: .1;
      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: black;
        border-radius: 4px;
      }      
    }
    :global(&.sortable-chosen) {
      cursor: move;
    }

    .title {
      position: relative;
      background-color: white;
      padding: 6px 8px;
      border-radius: 4px;
      box-shadow: 0 1px 0 rgba(9, 39, 66, .25);
      line-height: 20px;

      &:hover {
        background: #f5f5f5;
      }
      .btn {
        position: absolute;
        top: 6px;
        right: 8px;
        display: none;        
      }
      &:hover .btn{
        display: block;
      }
    }
  }
</style>