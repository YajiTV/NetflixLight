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
          <div id="hero-banner" class="relative w-full bg-gray-900" style="height: 60vh;">
            <p class="flex items-center justify-center h-full text-gray-400">Veuillez vous connecter sur 
            <a href="/login" class="underline text-gray-400 hover:text-white ml-1"> /login</a>
            </p>
          </div>

          <!--Zone carousel-->
          <div class="max-w-6xl mx-auto px-6 py-10">
            <h2 class="mb-4 text-2xl font-bold">Tendances de la semaine</h2>
            <div id="trending-list" class="flex gap-4 pb-4 overflow-x-auto"></div>
          </div>
        </main>
      `;

      // chargement du Backend
      try {
        const res = await fetch('/api/tmdb/home', { credentials: 'include' });

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
      window.components.Carousel('trending-list', movies);
    },
  };
})();