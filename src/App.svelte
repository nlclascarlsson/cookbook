<script>
  import RecipeCard from './lib/components/RecipeCard.svelte';
  import { recipes } from './lib/data/recipes';

  let selected = $state(recipes[0]);

  const totalIngredients = $derived(selected.ingredients.length);
</script>

<main class="page">
  <header class="topbar">
    <div>
      <p class="eyebrow">Mein Kochbereich</p>
      <h1>Lieblingsrezepte Dashboard</h1>
    </div>
    <button class="action">+ Neues Rezept</button>
  </header>

  <section class="layout">
    <section class="list-panel">
      <h2>Rezepte</h2>
      <div class="grid">
        {#each recipes as recipe}
          <RecipeCard {recipe} onSelect={(r) => (selected = r)} />
        {/each}
      </div>
    </section>

    <aside class="detail-panel">
      <img src={selected.image} alt={selected.title} class="hero" />
      <h2>{selected.title}</h2>
      <div class="chips">
        <span>{selected.meta.totalDuration}</span>
        <span>{selected.meta.nutrition}</span>
        <span>{selected.meta.difficulty}</span>
      </div>

      <section>
        <h3>Zutaten ({totalIngredients})</h3>
        <ul>
          {#each selected.ingredients as ingredient}
            <li>{ingredient.amount} {ingredient.unit} {ingredient.name}</li>
          {/each}
        </ul>
      </section>

      <section>
        <h3>Zubereitung</h3>
        <ol>
          {#each selected.steps as step}
            <li>{step}</li>
          {/each}
        </ol>
      </section>

      <section>
        <h3>Utensilien</h3>
        <p>{selected.meta.utensils.join(', ')}</p>
      </section>
    </aside>
  </section>
</main>

<style>
  .page { padding: 2rem; display: grid; gap: 1.5rem; }
  .topbar { display: flex; justify-content: space-between; align-items: center; }
  .eyebrow { color: var(--green-soft); font-weight: 600; margin-bottom: 0.4rem; }
  h1 { font-size: clamp(1.6rem, 3vw, 2.4rem); }
  .action { border: none; background: var(--green); color: white; padding: 0.7rem 1rem; border-radius: 999px; font-weight: 600; }
  .layout { display: grid; gap: 1.5rem; grid-template-columns: 1.4fr 1fr; }
  .list-panel,.detail-panel { background: var(--paper-dark); border-radius: 20px; padding: 1rem; }
  .grid { margin-top: 1rem; display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; }
  .detail-panel { display: grid; gap: 1rem; align-content: start; }
  .hero { width: 100%; height: 220px; object-fit: cover; border-radius: 14px; }
  h3 { margin-bottom: 0.4rem; }
  ul,ol { margin: 0; padding-left: 1.2rem; color: #2f3f33; display: grid; gap: 0.4rem; }
  .chips { display: flex; gap: 0.5rem; flex-wrap: wrap; }
  .chips span { background: #e0eddc; color: #2f5e45; border-radius: 999px; padding: 0.3rem 0.65rem; font-size: 0.82rem; }

  @media (max-width: 980px) {
    .layout { grid-template-columns: 1fr; }
  }
</style>
