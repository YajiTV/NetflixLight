(function () {
  window.pages = window.pages || {};

  window.pages.home = {

    // / => render()
    render: async function (container) {

      // skeleton (header, footer)
      container.innerHTML = `
        ${window.components.renderHeader()}
        <main>
          <!--Hero banner zone-->
          <div id="hero-banner" class="relative w-full" style="height: 60vh; background-color: var(--bg-surface);"></div>

          <!--Carousel zone-->
          <div class="max-w-6xl mx-auto px-6 py-10">
            <h2 class="mb-4 text-2xl font-bold">Trends of the week</h2>
            <div id="trending-list" class="flex gap-4 pb-4 overflow-x-auto"></div>
          </div>

          <!-- Popular series carousel zone -->
          <div class="max-w-6xl mx-auto px-6 py-10">
            <h2 class="mb-4 text-2xl font-bold">Popular series</h2>
            <div id="popular-tv-list" class="flex gap-4 pb-4 overflow-x-auto"></div>
          </div>

          <!-- Popular movie zone -->
          <div class="max-w-6xl mx-auto px-6 py-10">
            <h2 class="mb-4 text-2xl font-bold">Highest rated</h2>
            <div id="top-rated-list" class="flex gap-4 pb-4 overflow-x-auto"></div>
          </div>

          <!-- Zone Action -->
          <div class="max-w-6xl mx-auto px-6 py-10">
            <h2 class="mb-4 text-2xl font-bold">Action</h2>
            <div id="action-list" class="flex gap-4 pb-4 overflow-x-auto"></div>
          </div>

          <!-- Comedy zone -->
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

      // Backend loading
      try {
        const data = await window.api.tmdb.getHome();

        this.renderHero(data.trending.results);

        const [action, comedy, thriller, animation] = await Promise.all([
          window.api.tmdb.getGenre(28),
          window.api.tmdb.getGenre(35),
          window.api.tmdb.getGenre(53),
          window.api.tmdb.getGenre(16),
        ]);

        // Carousel
        window.components.Carousel('trending-list', data.trending.results);
        window.components.Carousel('popular-tv-list', data.popularTv.results);
        window.components.Carousel('top-rated-list', data.topRated);
        window.components.Carousel('action-list', action);
        window.components.Carousel('comedy-list', comedy);
        window.components.Carousel('thriller-list', thriller);
        window.components.Carousel('animation-list', animation);

      } catch (err) {
        console.error('Error loading home page:', err);
      }
    },


    // Hero banner
    renderHero: function (movies) {
      const banner = document.getElementById('hero-banner');
      if (!banner || !movies.length) return;

      // Random movie from trending
      const movie = movies[Math.floor(Math.random() * movies.length)];
      const imageUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

      banner.style.backgroundImage = `url('${imageUrl}')`;
      banner.style.backgroundSize = 'cover';
      banner.style.backgroundPosition = 'center';

      const mediaType = movie.media_type || (movie.title ? 'movie' : 'tv');

      banner.innerHTML = `
        <!-- Dark gradient at the bottom to read the text -->
        <div class="absolute inset-0 bg-linear-to-t from-black via-transparent to-black/40"></div>

        <!-- Title + description + buttons at the bottom left -->
        <div class="absolute bottom-10 left-10 z-10 max-w-xl">
          <h1 class="mb-3 text-4xl font-bold">${movie.title || movie.name}</h1>
          <p class="text-gray-300 line-clamp-3 mb-5">${movie.overview}</p>
          <div class="flex gap-3">
            <a data-link href="/detail/${mediaType}/${movie.id}" class="px-5 py-2 bg-white text-black font-semibold rounded hover:bg-gray-200 transition">
              See more information
            </a>
            <button id="hero-fav-btn" class="px-5 py-2 border border-white text-white font-semibold rounded hover:bg-white/10 transition">
              Add to watchlist
            </button>
          </div>
        </div>
      `;

      // Watchlist button logic
      document.getElementById('hero-fav-btn').addEventListener('click', async () => {
        const btn = document.getElementById('hero-fav-btn');

        const res = await window.api.watchlist.add({
          tmdb_id: movie.id,
          media_type: mediaType,
          title: movie.title || movie.name,
          poster_path: movie.poster_path || '',
        });

        if (res.ok) {
          btn.textContent = 'Added';
          btn.disabled = true;
        } else {
          btn.textContent = 'Error, try again and again';
          setTimeout(() => { btn.textContent = 'Add to watchlist'; }, 3000);
        }
      });
    },

  };
})();
