(function () {
  window.pages = window.pages || {};

  window.pages.home = {

    // / => render()
    render: async function (container) {

      // squelette (header, footer)
      container.innerHTML = `
        ${window.components.renderHeader()}
        <main>
          <!--Zone bannière hero-->
          <div id="hero-banner" class="relative w-full bg-gray-900" style="height: 60vh;"></div>

          <!--Zone carousel-->
          <div class="max-w-6xl mx-auto px-6 py-10">
            <h2 class="mb-4 text-2xl font-bold">Trends of the week</h2>
            <div id="trending-list" class="flex gap-4 pb-4 overflow-x-auto"></div>
          </div>

          <!-- Zone carousel serie pop -->
          <div class="max-w-6xl mx-auto px-6 py-10">
            <h2 class="mb-4 text-2xl font-bold">Popular series</h2>
            <div id="popular-tv-list" class="flex gap-4 pb-4 overflow-x-auto"></div>
          </div>

          <!-- Zone popular movie -->
          <div class="max-w-6xl mx-auto px-6 py-10">
            <h2 class="mb-4 text-2xl font-bold">Highest rated</h2>
            <div id="top-rated-list" class="flex gap-4 pb-4 overflow-x-auto"></div>
          </div>

          <!-- Zone Action -->
          <div class="max-w-6xl mx-auto px-6 py-10">
            <h2 class="mb-4 text-2xl font-bold">Action</h2>
            <div id="action-list" class="flex gap-4 pb-4 overflow-x-auto"></div>
          </div>

          <!-- Zone Comédie -->
          <div class="max-w-6xl mx-auto px-6 py-10">
            <h2 class="mb-4 text-2xl font-bold">Comedy</h2>
            <div id="comedy-list" class="flex gap-4 pb-4 overflow-x-auto"></div>
          </div>

          <!-- Zone Thriller -->
          <div class="max-w-6xl mx-auto px-6 py-10">
            <h2 class="mb-4 text-2xl font-bold">Thriller</h2>
            <div id="thriller-list" class="flex gap-4 pb-4 overflow-x-auto"></div>
          </div>

          <!-- Zone Animation -->
          <div class="max-w-6xl mx-auto px-6 py-10">
            <h2 class="mb-4 text-2xl font-bold">Animation</h2>
            <div id="animation-list" class="flex gap-4 pb-4 overflow-x-auto"></div>
          </div>

        </main>

      `;

      // chargement du Backend
      try {
  const res = await fetch('/api/tmdb/home', { credentials: 'include' });

  const data = await res.json();
  
  this.renderHero(data.trending.results);

  const [action, comedy, thriller, animation] = await Promise.all([
    fetch('/api/tmdb/genre/28', { credentials: 'include' }).then(r => r.json()),
    fetch('/api/tmdb/genre/35', { credentials: 'include' }).then(r => r.json()),
    fetch('/api/tmdb/genre/53', {credentials:  'include'}).then(r => r.json()),
    fetch('/api/tmdb/genre/16', {credentials:  'include'}).then(r => r.json()),
  ]);

  // Caroussel
  window.components.Carousel('trending-list', data.trending.results);
  window.components.Carousel('popular-tv-list', data.popularTv.results);
  window.components.Carousel('top-rated-list', data.topRated);
  window.components.Carousel('action-list', action);
  window.components.Carousel('comedy-list', comedy);
  window.components.Carousel('thriller-list', thriller);
  window.components.Carousel('animation-list', animation);

} catch (err) {
  console.error('Error loading home page:', err);
}},


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

      const mediaType = movie.media_type || (movie.title ? 'movie' : 'tv');

      banner.innerHTML = `
        <!-- Dégradé noir en bas pour lire le texte -->
        <div class="absolute inset-0 bg-linear-to-t from-black via-transparent to-black/40"></div>

        <!-- Titre + description + boutons en bas à gauche -->
        <div class="absolute bottom-10 left-10 z-10 max-w-xl">
          <h1 class="mb-3 text-4xl font-bold">${movie.title || movie.name}</h1>
          <p class="text-gray-300 line-clamp-3 mb-5">${movie.overview}</p>
          <div class="flex gap-3">
            <a data-link href="/detail/${mediaType}/${movie.id}" class="px-5 py-2 bg-white text-black font-semibold rounded hover:bg-gray-200 transition">
              See more information
            </a>
            <button id="hero-fav-btn" class="px-5 py-2 border border-white text-white font-semibold rounded hover:bg-white/10 transition">
              Add to favorites
            </button>
          </div>
        </div>
      `;

      // Logique bouton favoris
      document.getElementById('hero-fav-btn').addEventListener('click', async () => {
        const res = await fetch('/api/watchlist', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tmdb_id: movie.id,
            media_type: mediaType,
            title: movie.title || movie.name,
            poster_path: movie.poster_path || '',
          }),
        });
        const btn = document.getElementById('hero-fav-btn');
        if (res.ok) {
          btn.textContent = 'Add to favorites';
          btn.disabled = true;
        }
      });
    },


    // Caroussel
    // renderTrending: function (movies) {
    //   window.components.Carousel('trending-list', movies);
    // },
    // renderPopularTv: function(serie) {
    //   window.components.Carousel('popular-tv-list', serie);
    // },
    // renderTopRated: function (items) {
    //   window.components.Carousel('top-rated-list', items);
    // },

  };
})();