(function(){
  // register pages namespace
  window.pages = window.pages || {};

  window.pages.home = {
    render: async function(container, params) {
      container.innerHTML = `
        <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <div id = "hero-banner-container" class="w-full h-[60vh] bg-gray-800 flex items-center justify-center">
            <p class="text-gray-400">Film à la une</p>
          </div>
          <div class="max-w-6xl mx-auto px-6 py-10">
            <header class="flex items-center justify-between mb-12 mt-4">
              <h1 class="text-3xl font-bold">Netflix Light</h1>
              <nav class="flex gap-6">
                <a href="/" data-link class="hover:text-red-600">Home</a>
                <a href="/search" data-link class="hover:text-red-600">Search</a>
                <a href="/watchlist" data-link class="hover:text-red-600">Watchlist</a>
              </nav>
            </header>

            <section class="mb-12">
              <h2 class="text-4xl font-bold mb-4">Explore Movies & Shows</h2>
              <p class="text-gray-600 dark:text-gray-400">Suite du catalogue</p>
            </section>
          </div>
        </div>
      `;
      this.loadRandomHeroBanner();
      // enable SPA links
      container.querySelectorAll('a[data-link]').forEach(a => {
        a.addEventListener('click', e => {
          e.preventDefault();
          window.app.router.navigate(new URL(a.href).pathname);
        });
      });
    },
    loadRandomHeroBanner: async function() {
      try {
        const apiKey = '';
        const url = `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}&language=fr-FR`;

        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const data = await response.json();
        const trendingMovies = data.results;

        if (trendingMovies && trendingMovies.length > 0) {

          const randomIndex = Math.floor(Math.random() * trendingMovies.length);
          const randomMovie = trendingMovies[randomIndex];

          const bannerContainer = document.getElementById('hero-banner-container');
          if (bannerContainer) {
            const imageUrl = `https://image.tmdb.org/t/p/original${randomMovie.backdrop_path}`;
            
            bannerContainer.innerHTML = `
              <div class="relative w-full h-full bg-cover bg-center" style="background-image: url('${imageUrl}');">
                <div class="absolute inset-0 bg-black bg-opacity-60"></div>
                <div class="absolute bottom-10 left-10 text-white max-w-xl z-10">
                  <h1 class="text-5xl font-extrabold mb-4">${randomMovie.title || randomMovie.name}</h1>
                  <p class="text-lg mb-6 text-gray-200 line-clamp-3">${randomMovie.overview}</p>
                  <div class="flex gap-4">
                    <button class="bg-white text-black px-6 py-2 font-bold rounded hover:bg-gray-300">▶ Lecture</button>
                    <button class="bg-gray-500 bg-opacity-70 text-white px-6 py-2 font-bold rounded hover:bg-opacity-50">ⓘ Plus d'infos</button>
                  </div>
                </div>
              </div>
            `;
          }
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des tendances:", error);
        const bannerContainer = document.getElementById('hero-banner-container');
        if (bannerContainer) {
          bannerContainer.innerHTML = '<p class="text-red-500">Erreur lors du chargement du film à la une.</p>';
        }
      }
    }
  };
})();