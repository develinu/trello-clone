<script>
  import CreateCard from '~/components/CreateCard.svelte'
  import ListTitle from '~/components/ListTitle.svelte'
  import Card from '~/components/Card.svelte'

  export let list
</script>

<div class="list">
  <div class="list__inner">
    <div class="list__haeding">
      <ListTitle {list} />
      <p>
        {list.cards.length} cards
      </p>
    </div>
    <div class="list__cards">
      {#each list.cards as card (card.id)}
        <Card 
          listId={list.id} 
          {card} />
      {/each}
    </div>
    <CreateCard listId={list.id} />
  </div>
</div>

<style lang="scss">
  .list {
    display: inline-block;
    font-size: 16px;
    white-space: normal;
    width: 290px;
    height: 100%;
    // border: 10px solid yellowgreen;
    // box-sizing: border-box;
    margin: 0 4px;    

    :global(&.sortable-ghost) {
      position: relative;
      opacity: .2;
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
    
    .list__inner {
      display: flex;
      flex-direction: column;
      max-height: 100%;
      padding: 10px 8px;
      box-sizing: border-box;
      background: #ebecf0;
      border-radius: 4px;
      
      .list__heading {        
        margin-bottom: 10px;
        p {
          color: #5e6c84;
          padding: 0 8px;
        }
      }
      .list__cards {
        overflow-x: hidden;
        overflow-y: auto;
      }      
    }
  }
</style>