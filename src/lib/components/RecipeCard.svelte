<script>
  let { recipe, onSelect } = $props();
</script>

<article class="card" on:click={() => onSelect(recipe)}>
  <img src={recipe.image} alt={recipe.title} />
  <div class="content">
    <h3>{recipe.title}</h3>
    <div class="meta-row">
      <span>{recipe.meta.totalDuration}</span>
      <span>{recipe.meta.nutrition}</span>
      <span>{recipe.meta.difficulty}</span>
    </div>
  </div>
</article>

<style>
  .card {
    background: var(--card);
    border: 1px solid rgba(53, 107, 79, 0.12);
    border-radius: 18px;
    overflow: hidden;
    cursor: pointer;
    box-shadow: var(--shadow);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    backdrop-filter: blur(3px);
  }
  .card:hover {
    transform: translateY(-4px);
    box-shadow: 0 15px 32px rgba(24, 46, 34, 0.2);
  }
  img {
    width: 100%;
    height: 160px;
    object-fit: cover;
  }
  .content {
    padding: 1rem;
    display: grid;
    gap: 0.75rem;
  }
  h3 {
    font-size: 1.05rem;
  }
  .meta-row {
    display: flex;
    gap: 0.6rem;
    flex-wrap: wrap;
    color: var(--muted);
    font-size: 0.85rem;
  }
</style>
