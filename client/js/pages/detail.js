(function () {
  window.pages = window.pages || {};

  window.pages.detail = {
    async render(container, type, id) {
      if (!window.store.getState().user) {
        sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
        window.router.navigate('/login');
        return;
      }
      
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
      const poster = film.poster_path ? `https://image.tmdb.org/t/p/w500${film.poster_path}` : '';

      console.log('[similar raw]', film.similar);
      const similarList = (film.similar?.results || [])
        .filter(m => m.poster_path)
        .slice(0, 12)
        .map(m => ({ ...m, media_type: type }));
      console.log('[similarList]', similarList);

      const similarCarousel = similarList.length ? `
        <section class="mt-12">
          <h2 class="text-xl font-bold text-white mb-5">Similaires</h2>
          <div class="flex gap-4 overflow-x-auto pb-3" style="scrollbar-width: none;">
            ${similarList.map(item => {
              const t = item.title || item.name;
              const n = item.vote_average ? item.vote_average.toFixed(1) : 'N/A';
              const y = (item.release_date || item.first_air_date || '').slice(0, 4);
              return `
                <a data-link href="/detail/${type}/${item.id}"
                   class="relative shrink-0 w-40 cursor-pointer group">
                  <img class="w-full rounded" loading="lazy"
                       src="https://image.tmdb.org/t/p/w300${item.poster_path}"
                       alt="${t}" />
                  <div class="absolute inset-0 rounded bg-black/80 opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-2">
                    <p class="text-sm font-bold leading-tight">${t}</p>
                    <p class="text-xs text-yellow-400">★ ${n}</p>
                    <p class="text-xs text-gray-400">${y}</p>
                  </div>
                </a>
              `;
            }).join('')}
          </div>
        </section>
      ` : '';
      const trailer  = film.videos?.results?.find(v => v.site === 'YouTube' && v.type === 'Trailer');

      const castList = (film.credits?.cast || []).slice(0, 12);
      const castCarousel = castList.length ? `
        <section class="mt-12">
          <h2 class="text-xl font-bold text-white mb-5">Casting</h2>
          <div class="flex gap-4 overflow-x-auto pb-3" style="scrollbar-width: none;">
            ${castList.map(actor => `
              <a href="https://fr.wikipedia.org/w/index.php?search=${encodeURIComponent(actor.name)}"
                 target="_blank" rel="noopener noreferrer"
                 class="shrink-0 w-28 no-underline group">
                <div class="overflow-hidden rounded-lg mb-2 bg-gray-800">
                  <img
                    src="${actor.profile_path
                      ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                      : `https://ui-avatars.com/api/?name=${encodeURIComponent(actor.name)}&background=333&color=fff&size=128`
                    }"
                    alt="${actor.name}"
                    loading="lazy"
                    class="w-full aspect-2/3 object-cover object-top group-hover:opacity-80 transition"
                  />
                </div>
                <p class="text-xs font-semibold text-white leading-tight truncate">${actor.name}</p>
                <p class="text-xs text-gray-500 mt-0.5 leading-tight truncate">${actor.character}</p>
              </a>
            `).join('')}
          </div>
        </section>
      ` : '';

      container.innerHTML = `
        ${window.components.renderHeader()}
        <main class="max-w-6xl mx-auto px-6 sm:px-10 py-10">

          <!-- Movie details -->
          <div class="flex gap-8 flex-wrap items-start">

            <!-- Poster -->
            ${poster ? `
            <img src="${poster}" alt="${titre}"
              class="w-44 rounded-xl shadow-2xl shrink-0" />
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

              <!-- Buttons -->
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

          <!-- Similar -->
          ${similarCarousel}

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

      function IframeYtb() {
        const pauseplay = document.getElementById('pauseplay');
        const volume = document.getElementById('Volume');

        if (!pauseplay || !volume) {
          return;
        }

        // Load YouTube API if not already loaded
        if (!window.YT) {
          const tag = document.createElement('script');
          tag.src = 'https://www.youtube.com/iframe_api';
          const firstScriptTag = document.getElementsByTagName('script')[0];
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }

        let player;
        let apiReady = false;

        // Check if API is already loaded
        if (window.YT && window.YT.Player) {
          apiReady = true;
          createPlayer();
        } else {
          // Wait for API to load
          window.onYouTubeIframeAPIReady = () => {
            apiReady = true;
            createPlayer();
          };
        }

        function createPlayer() {
          if (!apiReady || player) return;
          
          const iframe = document.getElementById('trailer');
          if (!iframe) return;

          try {
            player = new YT.Player('trailer', {
              events: {
                onReady: onPlayerReady,
                onStateChange: onPlayerStateChange
              }
            });
          } catch (e) {
            console.error('Erreur création player:', e);
          }
        }

        function onPlayerReady(event) {
          updatePlayPauseButton();
        }

        function onPlayerStateChange(event) {
          updatePlayPauseButton();
        }

        function updatePlayPauseButton() {
          if (!player) return;
          try {
            const pauseplay = document.getElementById('pauseplay');
            if (!pauseplay) return;
            
            if (player.getPlayerState() === YT.PlayerState.PLAYING) {
              pauseplay.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" class="w-6 h-6">
                  <path fill-rule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75h-1.5a.75.75 0 01-.75-.75V5.25z" clip-rule="evenodd" />
                </svg>
              `;
            } else {
              pauseplay.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" class="w-6 h-6">
                  <path fill-rule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.647c1.295.742 1.295 2.545 0 3.286L7.279 20.99c-1.25.717-2.779-.217-2.779-1.643V5.653Z" clip-rule="evenodd" />
                </svg>
              `;
            }
          } catch (e) {
            console.error('Erreur update button:', e);
          }
        }

        // Play/Pause button
        pauseplay.addEventListener('click', () => {
          if (!player) {
            console.warn('Player not ready');
            return;
          }
          try {
            if (player.getPlayerState() === YT.PlayerState.PLAYING) {
              player.pauseVideo();
            } else {
              player.playVideo();
            }
            updatePlayPauseButton();
          } catch (e) {
            console.error('Erreur play/pause:', e);
          }
        });

        // Volume button
        volume.addEventListener('click', () => {
          if (!player) {
            console.warn('Player not ready');
            return;
          }
          try {
            if (player.isMuted()) {
              player.unMute();
              volume.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" class="w-6 h-6">
                  <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM17.78 9.22a.75.75 0 10-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 001.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 101.06-1.06L20.56 12l1.72-1.72a.75.75 0 00-1.06-1.06l-1.72 1.72-1.72-1.72z"/>
                </svg>
              `;
            } else {
              player.mute();
              volume.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" class="w-6 h-6">
                  <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM10.72 11.06a.75.75 0 000 1.06l3.97 3.97a.75.75 0 001.06-1.06l-2.69-2.69 2.69-2.69a.75.75 0 00-1.06-1.06l-3.97 3.97z"/>
                </svg>
              `;
            }
          } catch (e) {
            console.error('Erreur volume:', e);
          }
        });
      }

      // Trailer modal logic
      const btnTrailer = document.getElementById('btn-trailer');
      if (btnTrailer && trailer) {
        btnTrailer.addEventListener('click', () => {
          const modal = document.createElement('div');
          modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4';
          modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
          modal.style.backdropFilter = 'blur(12px)';
          modal.style.WebkitBackdropFilter = 'blur(12px)'; // For Safari compatibility
          modal.addEventListener('click', () => modal.remove());

          modal.innerHTML = `
            <div class="relative w-full max-w-2xl">
              <button id="close-modal" class="absolute -top-10 right-0 text-white text-3xl font-bold hover:text-gray-300 cursor-pointer">&times;</button>
              <div class="rounded-[20px] overflow-hidden shadow-2xl bg-black" style="border: 4px solid white;">
                <div class="relative w-full" style="padding-top: 56.25%;">
                  <iframe id="trailer"
                    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
                    src="https://www.youtube.com/embed/${trailer.key}?autoplay=1&rel=0&enablejsapi=1"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
                <!-- Custom Controls -->
                <div class="bg-black p-4 flex gap-3 justify-center text-white border-t border-gray-700">
                  <button id="pauseplay" class="px-4 py-2 bg-white text-black font-semibold hover:bg-gray-200 transition flex items-center justify-center" style="border-radius: 12px; width: 44px; height: 44px;">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" class="w-6 h-6">
                      <path fill-rule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.647c1.295.742 1.295 2.545 0 3.286L7.279 20.99c-1.25.717-2.779-.217-2.779-1.643V5.653Z" clip-rule="evenodd" />
                    </svg>
                  </button>
                  <button id="Volume" class="px-4 py-2 bg-white text-black font-semibold hover:bg-gray-200 transition flex items-center justify-center" style="border-radius: 12px; width: 44px; height: 44px;">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" class="w-6 h-6">
                      <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM17.78 9.22a.75.75 0 10-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 001.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 101.06-1.06L20.56 12l1.72-1.72a.75.75 0 00-1.06-1.06l-1.72 1.72-1.72-1.72z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          `;

          modal.querySelector('div').addEventListener('click', (e) => e.stopPropagation());
          modal.querySelector('#close-modal').addEventListener('click', () => modal.remove());

          document.body.appendChild(modal);

          // Initialize custom controls
          IframeYtb();
        });
      }
    }
  };
})();
