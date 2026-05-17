<script>
  import RecipeCard from './lib/components/RecipeCard.svelte';
  import { recipes as initialRecipes } from './lib/data/recipes';

  const blankRecipe = () => ({
    id: crypto.randomUUID(),
    title: '',
    image: '',
    ingredients: [{ name: '', amount: '', unit: '' }],
    steps: [''],
    meta: {
      totalDuration: '',
      utensils: [],
      nutrition: '',
      difficulty: ''
    }
  });

  let recipes = $state(structuredClone(initialRecipes));
  let selected = $state(null);
  let isDetailOpen = $state(false);
  let isFormOpen = $state(false);
  let isEditing = $state(false);
  let formRecipe = $state(blankRecipe());
  let utensilsText = $state('');

  const totalIngredients = $derived(selected ? selected.ingredients.length : 0);

  const openDetails = (recipe) => {
    selected = recipe;
    isDetailOpen = true;
  };

  const openCreateForm = () => {
    formRecipe = blankRecipe();
    utensilsText = '';
    isEditing = false;
    isFormOpen = true;
  };

  const openEditForm = () => {
    if (!selected) return;
    formRecipe = structuredClone(selected);
    utensilsText = formRecipe.meta.utensils.join(', ');
    isEditing = true;
    isFormOpen = true;
  };

  const closeForm = () => (isFormOpen = false);

  const ensureValue = (value, fallback = '—') => value?.toString().trim() || fallback;

  const saveRecipe = () => {
    formRecipe.meta.utensils = utensilsText
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    formRecipe.ingredients = formRecipe.ingredients.filter((item) => item.name.trim());
    formRecipe.steps = formRecipe.steps.filter((step) => step.trim());

    formRecipe.title = ensureValue(formRecipe.title, 'Neues Rezept');
    formRecipe.image = ensureValue(formRecipe.image, 'https://picsum.photos/900/500');
    formRecipe.meta.totalDuration = ensureValue(formRecipe.meta.totalDuration);
    formRecipe.meta.nutrition = ensureValue(formRecipe.meta.nutrition);
    formRecipe.meta.difficulty = ensureValue(formRecipe.meta.difficulty);

    if (!formRecipe.ingredients.length) {
      formRecipe.ingredients = [{ name: 'Nach Geschmack', amount: 1, unit: 'Portion' }];
    }

    if (!formRecipe.steps.length) {
      formRecipe.steps = ['Nach Belieben zubereiten und servieren.'];
    }

    if (isEditing) {
      const idx = recipes.findIndex((item) => item.id === formRecipe.id);
      if (idx >= 0) recipes[idx] = structuredClone(formRecipe);
      if (selected?.id === formRecipe.id) selected = recipes[idx];
    } else {
      recipes = [structuredClone(formRecipe), ...recipes];
      selected = recipes[0];
      isDetailOpen = true;
    }

    closeForm();
  };

  const updateImageFromFile = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const dataUrl = await fileToDataUrl(file);
    formRecipe.image = dataUrl;
  };

  const fileToDataUrl = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
</script>

<main class="page">
  <header class="topbar">
    <div>
      <p class="eyebrow">Mein Kochbereich</p>
      <h1>Lieblingsrezepte Dashboard</h1>
    </div>
    <button class="action" on:click={openCreateForm}>+ Neues Rezept</button>
  </header>

  <section class="layout">
    <section class="list-panel">
      <h2>Rezepte</h2>
      <div class="grid">
        {#each recipes as recipe}
          <RecipeCard {recipe} onSelect={openDetails} />
        {/each}
      </div>
    </section>
  </section>

  {#if isDetailOpen && selected}
    <div class="overlay" role="presentation" on:click={() => (isDetailOpen = false)}>
      <aside class="detail-modal" role="dialog" aria-modal="true" on:click|stopPropagation>
        <button class="close" on:click={() => (isDetailOpen = false)}>×</button>
        <img src={selected.image} alt={selected.title} class="hero" />
        <div class="modal-head">
          <h2>{selected.title}</h2>
          <button class="edit" on:click={openEditForm}>Bearbeiten</button>
        </div>
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
    </div>
  {/if}

  {#if isFormOpen}
    <div class="overlay" role="presentation" on:click={closeForm}>
      <section class="form-modal" role="dialog" aria-modal="true" on:click|stopPropagation>
        <h2>{isEditing ? 'Rezept bearbeiten' : 'Neues Rezept anlegen'}</h2>
        <div class="form-grid">
          <label>Titel <input bind:value={formRecipe.title} /></label>
          <label>Bild-URL <input bind:value={formRecipe.image} placeholder="https://..." /></label>
          <label>Oder Bild hochladen <input type="file" accept="image/*" on:change={updateImageFromFile} /></label>
          <label>Dauer <input bind:value={formRecipe.meta.totalDuration} placeholder="30 Min" /></label>
          <label>Ernährung <input bind:value={formRecipe.meta.nutrition} placeholder="Vegetarisch" /></label>
          <label>Schwierigkeit <input bind:value={formRecipe.meta.difficulty} placeholder="Leicht" /></label>
          <label class="full">Utensilien (kommagetrennt) <input bind:value={utensilsText} /></label>

          <label class="full">Zutaten (eine pro Zeile: Menge|Einheit|Name)
            <textarea
              rows="5"
              value={formRecipe.ingredients
                .map((i) => `${i.amount || ''}|${i.unit || ''}|${i.name || ''}`)
                .join('\n')}
              on:input={(event) => {
                formRecipe.ingredients = event.currentTarget.value
                  .split('\n')
                  .map((line) => {
                    const [amount = '', unit = '', name = ''] = line.split('|');
                    return { amount: amount.trim(), unit: unit.trim(), name: name.trim() };
                  });
              }}></textarea>
          </label>

          <label class="full">Zubereitung (ein Schritt pro Zeile)
            <textarea
              rows="5"
              value={formRecipe.steps.join('\n')}
              on:input={(event) => (formRecipe.steps = event.currentTarget.value.split('\n'))}></textarea>
          </label>
        </div>

        <div class="actions-row">
          <button class="ghost" on:click={closeForm}>Abbrechen</button>
          <button class="action" on:click={saveRecipe}>Speichern</button>
        </div>
      </section>
    </div>
  {/if}
</main>

<style>
  .page { padding: 2rem; display: grid; gap: 1.5rem; }
  .topbar { display: flex; justify-content: space-between; align-items: center; }
  .eyebrow { color: var(--green-soft); font-weight: 600; margin-bottom: 0.4rem; }
  h1 { font-size: clamp(1.6rem, 3vw, 2.4rem); }
  .action { border: none; background: var(--green); color: white; padding: 0.7rem 1rem; border-radius: 999px; font-weight: 600; }
  .layout { display: grid; gap: 1.5rem; }
  .list-panel { background: var(--paper-dark); border-radius: 20px; padding: 1rem; }
  .grid { margin-top: 1rem; display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; }

  .overlay { position: fixed; inset: 0; background: rgba(22, 36, 29, 0.52); display: grid; place-items: center; padding: 1rem; z-index: 20; }
  .detail-modal, .form-modal { width: min(760px, 100%); max-height: min(90vh, 920px); overflow: auto; background: #fffdf8; border-radius: 24px; padding: 1.2rem; display: grid; gap: 1rem; position: relative; }
  .close { position: absolute; right: 1rem; top: 1rem; border: none; background: #e5ece6; width: 2rem; height: 2rem; border-radius: 50%; font-size: 1.2rem; }
  .hero { width: 100%; height: 240px; object-fit: cover; border-radius: 14px; }
  h3 { margin-bottom: 0.4rem; }
  ul,ol { margin: 0; padding-left: 1.2rem; color: #2f3f33; display: grid; gap: 0.4rem; }
  .chips { display: flex; gap: 0.5rem; flex-wrap: wrap; }
  .chips span { background: #e0eddc; color: #2f5e45; border-radius: 999px; padding: 0.3rem 0.65rem; font-size: 0.82rem; }
  .modal-head { display: flex; justify-content: space-between; gap: 1rem; align-items: center; }
  .edit { border: 1px solid #b9cfbf; background: #eef5ee; padding: 0.5rem 0.9rem; border-radius: 999px; }

  .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem; }
  label { display: grid; gap: 0.35rem; font-size: 0.9rem; color: #42544a; }
  input, textarea { border: 1px solid #ced9cf; border-radius: 10px; padding: 0.65rem; font: inherit; }
  .full { grid-column: 1 / -1; }
  .actions-row { display: flex; justify-content: flex-end; gap: 0.7rem; }
  .ghost { border: 1px solid #c8d4cb; background: white; color: #42544a; padding: 0.7rem 1rem; border-radius: 999px; }

  @media (max-width: 720px) {
    .page { padding: 1rem; }
    .topbar { flex-wrap: wrap; gap: 0.9rem; }
    .detail-modal, .form-modal {
      width: 100%;
      max-height: 96vh;
      border-radius: 18px 18px 0 0;
      align-self: end;
      padding-bottom: 1.5rem;
    }
    .form-grid { grid-template-columns: 1fr; }
    .hero { height: 190px; }
  }
</style>
