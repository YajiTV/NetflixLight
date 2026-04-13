(function () {
  window.pages = window.pages || {};

  window.pages.detail = {
    async render(container, type, id) {
      if (!window.store.getState().user) {
        sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
        window.router.navigate('/login');
        return;
      }

      container.innerHTML = `
        ${window.components.renderHeader()}
        <main class="max-w-5xl mx-auto px-6 py-10 text-gray-400">Chargement...</main>
      `;

      const film      = await window.api.tmdb.getDetail(type, id);
      const watchlist = await window.api.watchlist.getAll();
      let isInWatchlist = watchlist.some(w => String(w.tmdb_id) === String(id) && w.media_type === type);

      const titre  = film.title || film.name;
      const annee  = (film.release_date || film.first_air_date || '').slice(0, 4);
      const duree  = film.runtime
        ? `${Math.floor(film.runtime / 60)}h ${film.runtime % 60}min`
        : `${film.number_of_seasons} saison(s)`;
      const note   = film.vote_average ? film.vote_average.toFixed(1) : 'N/A';
      const genres = (film.genres || []).map(g => `
        <span class="px-3 py-1 rounded-full border border-gray-600 text-sm text-gray-300">${g.name}</span>
      `).join('');
      const poster   = film.poster_path   ? `https://image.tmdb.org/t/p/w500${film.poster_path}`    : '';
      const backdrop = film.backdrop_path ? `https://image.tmdb.org/t/p/w1280${film.backdrop_path}` : '';
      const trailer  = film.videos?.results?.find(v => v.site === 'YouTube' && v.type === 'Trailer');

      const castList = (film.credits?.cast || []).slice(0, 12);
      const castCarousel = castList.length ? `
        <section class="mt-10">
          <h2 class="text-xl font-bold mb-4">Casting</h2>
          <div class="flex gap-5 overflow-x-auto pb-3" style="scrollbar-width: none;">
            ${castList.map(actor => `
              <a href="https://fr.wikipedia.org/w/index.php?search=${encodeURIComponent(actor.name)}"
                 target="_blank" rel="noopener noreferrer"
                 class="shrink-0 w-24 flex flex-col items-center text-center no-underline group">
                <img
                  src="${actor.profile_path
                    ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(actor.name)}&background=222&color=fff&size=128`
                  }"
                  alt="${actor.name}"
                  loading="lazy"
                  class="w-16 h-16 rounded-full object-cover mb-2 shadow group-hover:ring-2 group-hover:ring-red-500 transition"
                />
                <p class="text-xs font-semibold text-white leading-tight">${actor.name}</p>
                <p class="text-xs text-gray-500 mt-0.5 leading-tight">${actor.character}</p>
              </a>
            `).join('')}
          </div>
        </section>
      ` : '';

      container.innerHTML = `
        ${window.components.renderHeader()}
          <!-- Fiche film -->
          <div class="flex gap-8 flex-wrap items-start">

            <!-- Poster -->
            ${poster ? `
            <img src="${poster}" alt="${titre}"
              class="w-44 rounded-xl shadow-2xl shrink-0 ${backdrop ? '' : ''}" />
            ` : ''}

            <!-- Infos -->
            <div class="flex-1 min-w-0 pt-2">
              <h1 class="text-3xl font-bold text-white mb-1">${titre}</h1>
              <p class="text-gray-400 text-sm mb-4">
                ${annee} &nbsp;·&nbsp; ${duree} &nbsp;·&nbsp; ★ ${note}
              </p>
              <div class="flex flex-wrap gap-2 mb-5">${genres}</div>
              <p class="text-gray-300 leading-relaxed text-sm mb-6 max-w-2xl">
                ${film.overview || 'Aucun synopsis disponible.'}
              </p>

              <!-- Boutons -->
              <div class="flex gap-3">
                ${trailer ? `
                <button id="btn-trailer" class="px-5 py-2 rounded-full font-semibold text-sm transition border border-white text-white hover:bg-white hover:text-black flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 -ml-1"><path fill-rule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.647c1.295.742 1.295 2.545 0 3.286L7.279 20.99c-1.25.717-2.779-.217-2.779-1.643V5.653Z" clip-rule="evenodd" /></svg>
                  Trailer
                </button>
                ` : ''}
                <button id="btn-watchlist"
                  class="px-5 py-2 rounded-full font-semibold text-sm transition border ${isInWatchlist
                    ? 'bg-red-600 border-red-600 text-white'
                    : 'border-white text-white hover:bg-white hover:text-black'}">
                  ${isInWatchlist ? 'In watchlist' : 'Add to watchlist'}
                </button>
              </div>
            </div>

          </div>

          <!-- Carousel casting -->
          ${castCarousel}

        </main>
      `;

      // Toggle watchlist
      const btn = document.getElementById('btn-watchlist');

      function updateBtn() {
        btn.className = `px-5 py-2 rounded-full font-semibold text-sm transition border ${isInWatchlist
          ? 'bg-red-600 border-red-600 text-white'
          : 'border-white text-white hover:bg-white hover:text-black'}`;
        btn.textContent = isInWatchlist ? 'In watchlist' : 'Add to watchlist';
      }

      btn.addEventListener('click', async function () {
        isInWatchlist = !isInWatchlist;
        updateBtn();

        const res = isInWatchlist
          ? await window.api.watchlist.add({ tmdb_id: id, media_type: type, title: titre, poster_path: film.poster_path || '' })
          : await window.api.watchlist.remove(id, type);

        if (!res.ok) {
          isInWatchlist = !isInWatchlist;
          updateBtn();
        }
      });

      // Trailer modal logic
      const btnTrailer = document.getElementById('btn-trailer');
      if (btnTrailer && trailer) {
        btnTrailer.addEventListener('click', () => {
          const modal = document.createElement('div');
          modal.className = 'fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4';
          modal.addEventListener('click', () => modal.remove());

          modal.innerHTML = `
            <div class="relative w-full max-w-2xl">
              <button id="close-modal" class="absolute -top-10 right-0 text-white text-3xl font-bold hover:text-gray-300 cursor-pointer">&times;</button>
              <div class="rounded-[20px] border-4 border-white overflow-hidden shadow-2xl bg-black">
                <div class="relative w-full" style="padding-top: 56.25%;">
                  <iframe
                    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
                    src="https://www.youtube.com/embed/${trailer.key}?autoplay=1&rel=0"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
              </div>
            </div>
          `;
          
          modal.querySelector('div').addEventListener('click', (e) => e.stopPropagation());
          modal.querySelector('#close-modal').addEventListener('click', () => modal.remove());
          
          document.body.appendChild(modal);
        });
      }
    }
  };
})();
