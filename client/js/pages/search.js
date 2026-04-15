(function () {
  window.pages = window.pages || {};
  window.pages.search = {
    render(container) {
      if (!window.store.getState().user) {
        window.router.navigate('/login');
        return;
      }

      container.innerHTML = `
        ${window.components.renderHeader()}
        <main class="max-w-6xl mx-auto px-6 py-10">


          <!-- Searchbar -->
          <div class="mb-8">
            <input
              id="search-input"
              type="text"
              class="w-full md:w-1/2 p-3 bg-gray-900 border border-gray-700 rounded text-white focus:outline-none focus:border-red-600 transition-colors"
              placeholder=" Search for a film, a TV series..."
              autocomplete="off"
              autofocus
            />
          </div>
          
          <!-- Title of the results -->
          <h2 id="search-title" class="text-xl font-bold mb-4 text-white"></h2>

          <!-- results grid -->
          <div id="search-results" class="flex gap-4 pb-4 overflow-x-auto">
            <p class="text-gray-400 w-full px-2">Start typing to search...</p>
          </div>
        </main>
      `;

      const searchInput = document.getElementById('search-input');
      const resultsContainer = document.getElementById('search-results');
      const searchTitle = document.getElementById('search-title');

      // search
      async function search(texte) {
        if (texte === "") {
          resultsContainer.innerHTML = '<p class="text-gray-400 w-full px-2">Start typing to search...</p>';
          searchTitle.textContent = '';
          return;
        }

        try {
          // API
          const donnees = await window.api.tmdb.search(texte);
          const resultats = donnees.results;

          if (resultats.length === 0) {
            resultsContainer.innerHTML = '<p class="text-gray-400 w-full px-2">No results found.</p>';
            searchTitle.textContent = '';
            return;
          }

          let html = "";
          searchTitle.textContent = `Results for the search "${texte}"`;
          
          for (let i = 0; i < resultats.length; i++) {
            let item = resultats[i];

            if (item.poster_path != null) {
              let type = item.media_type ? item.media_type : 'movie';
              let titre = item.original_title || item.original_name || item.title || item.name;

              html += `
                <a data-link href="/detail/${type}/${item.id}" class="shrink-0 block transition transform cursor-pointer hover:opacity-75 hover:scale-105 duration-200" style="width: 160px;">
                  <img class="rounded shadow-md" style="width: 100%; height: 240px; object-fit: cover;" src="https://image.tmdb.org/t/p/w300${item.poster_path}" alt="${titre}" />
                  <p class="mt-2 text-sm truncate text-gray-300">${titre}</p>
                </a>
              `;
            }
          }
          // Display
          resultsContainer.innerHTML = html;
        } catch (erreur) {
          console.log(erreur);
          resultsContainer.innerHTML = '<p class="text-red-400 w-full px-2">Une erreur est survenue lors de la recherche.</p>';
          searchTitle.textContent = '';
        }
      }
      searchInput.addEventListener('input', window.utils.debounce(function (event) {
        search(event.target.value);
      }, 300));
    }
  };
})();