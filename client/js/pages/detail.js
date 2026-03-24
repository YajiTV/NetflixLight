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

      const castList = (film.credits?.cast || []).slice(0, 10); // 10 premiers
      const castHtml = castList.length ? `
        <div class="w-full max-w-6xl mx-auto px-8 md:px-16 py-8">
          <h2 class="text-2xl font-bold text-white mb-6">Main Cast</h2>
          <div class="flex gap-6 overflow-x-auto pb-4">
            ${castList.map(actor => `
              <div class="shrink-0 w-20 flex flex-col items-center text-center">
                <img src="${actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : `https://ui-avatars.com/api/?name=${encodeURIComponent(actor.name)}&background=333&color=fff`}" alt="${actor.name}" class="w-12 h-12 md:w-16 md:h-16 rounded-full shadow-md mb-3" style="object-fit: cover;" />
                <p class="text-sm font-bold text-gray-200">${actor.name}</p>
                <p class="text-xs text-gray-500 mt-1">${actor.character}</p>
              </div>
            `).join('')}
          </div>
        </div>
      ` : '';

      container.innerHTML = `
        ${window.components.renderHeader()}
        <main class="bg-black">
          <div class="flex flex-wrap w-full min-h-screen pb-12 md:pb-0">
            <!-- Left Side -->
            <div class="w-full md:w-1/2 relative" style="min-height: 60vh;">
              <img src="${displayImage}" alt="${titre}" class="absolute inset-0 w-full h-full" style="object-fit: contain; object-position: left;" />
              <!-- Fondus sécurisés via styles inline -->
              <div class="absolute inset-0 pointer-events-none" style="background: linear-gradient(to right, transparent 60%, black 100%);"></div>
              <div class="absolute inset-0 pointer-events-none" style="background: linear-gradient(to top, black 0%, transparent 20%);"></div>
            </div>
            <!-- Right Side -->
            <div class="w-full md:w-1/2 flex flex-col justify-center px-8 py-12 md:pl-12 z-10" style="padding-right: 12%;">
              <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">${titre}</h1>
              <p class="text-gray-400 mb-6 text-lg">${annee} · ${duree} · ★ ${film.vote_average ? film.vote_average.toFixed(1) : 'N/A'}</p>
              <div class="flex gap-3 flex-wrap mb-8">${genres}</div>
              <p class="text-gray-300 text-lg leading-relaxed">${film.overview}</p>
            </div>
          </div>
          ${castHtml}
        </main>
      `;
    }
  };
})();