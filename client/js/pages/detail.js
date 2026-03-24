(function () {
  window.pages = window.pages || {};

  window.pages.detail = {
    async render(container, type, id) {
      const reponse = await fetch(`/api/tmdb/detail/${type}/${id}`, {
        credentials: 'include'
      });
      const film = await reponse.json();
      const titre    = film.title || film.name;
      const annee    = (film.release_date || film.first_air_date || '').slice(0, 4);
      const duree    = film.runtime ? `${Math.floor(film.runtime / 60)}h ${film.runtime % 60}min` : `${film.number_of_seasons} saison(s)`;
      const genres   = film.genres.map(g => `<span class="border border-white text-white text-sm shadow inline-block" style="padding: 6px 18px; border-radius: 50px; margin: 0 8px 8px 0;">${g.name}</span>`).join('');
      const backdrop = film.backdrop_path ? `https://image.tmdb.org/t/p/w1280${film.backdrop_path}` : '';
      const poster   = film.poster_path  ? `https://image.tmdb.org/t/p/w780${film.poster_path}`   : '';
      const displayImage = poster || backdrop;

      container.innerHTML = `
        ${window.components.renderHeader()}
        <main class="flex flex-wrap bg-black min-h-screen">
          <!-- Left Side -->
          <div class="w-full md:w-1/2 relative" style="min-height: 60vh;">
            <img src="${displayImage}" alt="${titre}" class="absolute inset-0 w-full h-full p-4 md:p-8" style="object-fit: contain;" />
            <!-- Fondus sécurisés via styles inline -->
            <div class="absolute inset-0 pointer-events-none" style="background: linear-gradient(to right, transparent 75%, black 100%);"></div>
            <div class="absolute inset-0 pointer-events-none" style="background: linear-gradient(to top, black 0%, transparent 20%);"></div>
          </div>
          <!-- Right Side -->
          <div class="w-full md:w-1/2 flex flex-col justify-center px-8 py-12 md:pl-12 z-10" style="padding-right: 12%;">
            <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">${titre}</h1>
            <p class="text-gray-400 mb-6 text-lg">${annee} · ${duree} · ★ ${film.vote_average ? film.vote_average.toFixed(1) : 'N/A'}</p>
            <div class="flex gap-3 flex-wrap mb-8">${genres}</div>
            <p class="text-gray-300 text-lg leading-relaxed">${film.overview}</p>
          </div>
        </main>
      `;
    }
  };
})();