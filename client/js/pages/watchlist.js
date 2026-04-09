(function () {
  window.pages = window.pages || {};

  window.pages.watchlist = {
    async render(container) {
      if (!window.store.getState().user) {
        window.router.navigate('/login');
        return;
      }

      container.innerHTML = `
        ${window.components.renderHeader()}
        <main class="max-w-6xl mx-auto px-6 py-10">
          <h1 class="text-2xl font-bold text-white mb-8">Ma liste</h1>
          <div id="watchlist-content" class="text-gray-400">Chargement...</div>
        </main>
      `;

      const res = await fetch('/api/watchlist', { credentials: 'include' });
      const items = res.ok ? await res.json() : [];
      const zone = document.getElementById('watchlist-content');

      if (items.length === 0) {
        zone.innerHTML = `
          <p class="mb-4">Ta liste est vide. Ajoute des films et séries depuis leur page détail !</p>
          <button id="btn-browse" class="border border-white text-white px-5 py-2 rounded hover:bg-white hover:text-black transition">
            Parcourir le catalogue
          </button>
        `;
        document.getElementById('btn-browse').addEventListener('click', function () {
          window.router.navigate('/');
        });
        return;
      }

      const grid = document.createElement('div');
      grid.style.cssText = 'display:grid; grid-template-columns: repeat(auto-fill, minmax(160px,1fr)); gap:16px;';
      zone.innerHTML = '';
      zone.appendChild(grid);

      items.forEach(function (item) {
        const card = document.createElement('div');
        card.style.cssText = 'position:relative; border-radius:8px; overflow:hidden; cursor:pointer; transition: transform 0.2s;';
        card.onmouseenter = function () { card.style.transform = 'scale(1.03)'; };
        card.onmouseleave = function () { card.style.transform = 'scale(1)'; };

        const img = document.createElement('img');
        img.src = item.poster_path
          ? 'https://image.tmdb.org/t/p/w300' + item.poster_path
          : '';
        img.alt = item.title;
        img.style.cssText = 'width:100%; display:block;';

        const info = document.createElement('div');
        info.style.cssText = 'padding:8px; background:#1a1a1a;';
        info.innerHTML = `
          <p style="color:white; font-size:0.85rem; font-weight:bold;">${item.title}</p>
          <span style="color:#aaa; font-size:0.75rem;">${item.media_type === 'movie' ? 'Film' : 'Série'}</span>
        `;

        const btnRemove = document.createElement('button');
        btnRemove.textContent = '✕';
        btnRemove.title = 'Retirer des favoris';
        btnRemove.style.cssText = 'position:absolute; top:6px; right:6px; background:rgba(0,0,0,0.7); color:white; border:none; border-radius:50%; width:26px; height:26px; cursor:pointer; font-size:0.8rem;';
        btnRemove.addEventListener('click', async function (e) {
          e.stopPropagation();
          await fetch('/api/watchlist/' + item.tmdb_id + '?type=' + item.media_type, {
            method: 'DELETE',
            credentials: 'include'
          });
          card.remove();
          if (grid.children.length === 0) window.pages.watchlist.render(container);
        });

        card.appendChild(img);
        card.appendChild(info);
        card.appendChild(btnRemove);
        card.addEventListener('click', function () {
          window.router.navigate('/detail/' + item.media_type + '/' + item.tmdb_id);
        });

        grid.appendChild(card);
      });
    }
  };
})();
