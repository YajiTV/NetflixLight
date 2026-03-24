(function () {
  window.pages = window.pages || {};

  window.pages.detail = {
    async render(container, type, id) {
      if (!window.store.getState().user) {
        container.innerHTML = `
          ${window.components.renderHeader()}
          <div class="flex items-center justify-center text-gray-400" style="height: 60vh;">
            Please log in to <a href="/login" data-link class="underline ml-1">/login</a>
          </div>
        `;
        return;
      }

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

      const castList = (film.credits?.cast || []).slice(0, 10);
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
              <div class="absolute inset-0 pointer-events-none" style="background: linear-gradient(to right, transparent 60%, black 100%);"></div>
              <div class="absolute inset-0 pointer-events-none" style="background: linear-gradient(to top, black 0%, transparent 20%);"></div>
            </div>
            <!-- Right Side -->
            <div class="w-full md:w-1/2 flex flex-col justify-center px-8 py-12 md:pl-12 z-10" style="padding-right: 12%;">
              <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">${titre}</h1>
              <p class="text-gray-400 mb-6 text-lg">${annee} · ${duree} · ★ ${film.vote_average ? film.vote_average.toFixed(1) : 'N/A'}</p>
              <div class="flex gap-3 flex-wrap mb-8">${genres}</div>
              <p class="text-gray-300 text-lg leading-relaxed">${film.overview}</p>
              <div class="flex gap-4 flex-wrap" style="margin-top: 2.5rem;">
                <button class="border border-white text-white transition-colors hover:bg-white hover:text-black cursor-pointer" style="padding: 10px 16px; border-radius: 50px; display: flex; align-items: center; justify-content: center;">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" style="width: 24px; height: 24px;">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
                <button class="border border-white text-white font-bold transition-colors hover:bg-white hover:text-black cursor-pointer" style="padding: 10px 24px; border-radius: 50px; display: flex; align-items: center; gap: 8px;">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" style="width: 24px; height: 24px;">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Bande-annonce
                </button>
              </div>
            </div>
          </div>
          ${castHtml}
        </main>
      `;
    }
  };
})();
