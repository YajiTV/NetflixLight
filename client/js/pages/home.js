(function () {
  window.pages = window.pages || {};

  window.pages.home = {

    // / => render()
    render: async function (container) {

      // squelette (header, footer)
      container.innerHTML = `
  ${window.components.renderHeader()}
  <main id="main-content">
    <div id="hero-banner" class="relative h-500px"></div>
    <section class="px-8 py-6">
      <h2 class="mb-4 text-xl font-bold">Tendances</h2>
      <div id="trending-list" class="flex gap-4 overflow-x-auto pb-2"></div>
    </section>
  </main>
`;
      // chargement donnée du backend
      try {
        const res = await fetch('/api/tmdb/home', { credentials: 'include' });

        // Si l'utilisateur n'est pas connecté (401), on affiche un message avec lien
        if (res.status === 401) {
          document.getElementById('main-content').innerHTML = `
            <div class="flex items-center justify-center py-20">
  <p class="text-gray-400">
    Veuillez vous connecter pour accéder aux données :
    <a href="/login" data-link class="ml-1 underline text-white">login</a>
  </p>
</div>
          `;
          return;
        }
        if (!res.ok) return;

        const data = await res.json();

        //insere les données
        this.renderHero(data.trending.results);
        this.renderTrending(data.trending.results);

      } catch (err) {
        console.error('Erreur chargement home:', err);
      }
    },

    // Grande banierre
    renderHero: function (movies) {
      const banner = document.getElementById('hero-banner');
      if (!banner || !movies.length) return;

      // Film au hasard parmi les tendances
      const movie = movies[Math.floor(Math.random() * movies.length)];
      const imageUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

      banner.style.backgroundImage = `url('${imageUrl}')`;
      banner.style.backgroundSize = 'cover';
      banner.style.backgroundPosition = 'center';

      banner.innerHTML = `
        <!-- Dégradé noir en bas pour lire le texte -->
        <div class="absolute inset-0 bg-linear-to-t from-black via-transparent to-black/40"></div>

        <!-- Titre + description en bas à gauche -->
        <div class="absolute bottom-10 left-10 z-10 max-w-xl">
          <h1 class="mb-3 text-4xl font-bold">${movie.title || movie.name}</h1>
          <p class="text-gray-300 line-clamp-3">${movie.overview}</p>
        </div>
      `;
    },

    // Caroussel
    renderTrending: function (movies) {
      const list = document.getElementById('trending-list');
      if (!list) return;

      // 10 premiers
      list.innerHTML = movies.slice(0, 10).map(movie => `
        <div class="shrink-0 w-40 transition cursor-pointer hover:opacity-75">
          <img
            class="w-full rounded"
            src="https://image.tmdb.org/t/p/w300${movie.poster_path}"
            alt="${movie.title || movie.name}"
          />
          <p class="mt-1 text-sm truncate">${movie.title || movie.name}</p>
        </div>
      `).join('');
    },

  };
})();
