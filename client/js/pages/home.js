(function(){
  // register pages namespace
  window.pages = window.pages || {};

  window.pages.home = {
    render: async function(container, params) {
      container.innerHTML = `
        <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">          
          <!-- ZONE BANNIÈRE : Prend toute la largeur de l'écran et 80% de la hauteur -->
          <div id="zone-banniere" class="w-screen ml-[calc(50%-50vw)] bg-gray-800 relative overflow-hidden" style="height: 50vh;">
            <div id="texte-chargement" class="absolute inset-0 flex items-center justify-center text-gray-400">Chargement du film...</div>
          </div>

          <div class="max-w-6xl mx-auto px-6 py-10">
            <header class="flex items-center justify-between mb-12 mt-4">
              <h1 class="text-5xl font-bold">Netflix Light</h1>
              <nav class="flex gap-6">
                <a href="/" data-link class="transition hover:scale-120">Home</a>
                <a href="/search" data-link class="transition hover:scale-120">Search</a>
                <a href="/watchlist" data-link class="transition hover:scale-120">Watchlist</a>
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
        const apiKey = 'cbd2531855b6d57b1572ef0f89edf701';
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

          const zoneBanniere = document.getElementById('zone-banniere');
          if (zoneBanniere) {
            const imageUrl = `https://image.tmdb.org/t/p/original${randomMovie.backdrop_path}`;
            
            // On applique l'image de fond directement sur la div principale (zone-banniere)
            zoneBanniere.style.backgroundImage = `url('${imageUrl}')`;
            zoneBanniere.classList.add('bg-cover', 'bg-center');

            zoneBanniere.innerHTML = `
              <!-- VOILE SOMBRE BAS : Dégradé noir pour lire le texte en bas -->
              <div id="voile-sombre" class="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
              
              <!-- VOILE SOMBRE HAUT : Dégradé noir pour faire ressortir la future barre de navigation -->
              <div id="voile-sombre-haut" class="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-transparent to-transparent"></div>
              
              <!-- CONTENU : Texte et boutons positionnés en bas à gauche -->
              <div id="contenu-banniere" class="absolute bottom-10 left-10 text-yellow z-10">
                <h1 id="titre-film" class="text-5xl font-bold mb-4">${randomMovie.title || randomMovie.name}</h1>
                <p id="description-film" class="text-lg max-w-xl mb-6 line-clamp-3">${randomMovie.overview}</p>
                
                <div id="groupe-boutons" class="flex gap-4">
                  <button id="bouton-lecture" class="bg-transparent text-white border border-white px-6 py-2 font-bold rounded hover:bg-white hover:text-black transition"> Lecture </button>
                  <button id="bouton-infos" class="bg-transparent text-white border border-white px-6 py-2 font-bold rounded hover:bg-white hover:text-black transition"> Plus d'infos </button>
                </div>
              </div>
            `;
          }
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des tendances:", error);
        const zoneBanniere = document.getElementById('zone-banniere');
        if (zoneBanniere) {
          zoneBanniere.innerHTML = '<p class="text-red-500 flex items-center justify-center h-full">Erreur lors du chargement.</p>';
        }
      }
    }
  };
})();