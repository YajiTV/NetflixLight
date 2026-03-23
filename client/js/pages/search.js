(function () {
  window.pages = window.pages || {};
  window.pages.search = {
    render(container) {
      container.innerHTML = `
        ${window.components.renderHeader()}
        <main class="max-w-6xl mx-auto px-6 py-10">
          <!-- Barre de recherche -->
          <div class="mb-8">
            <input
              id="search-input"
              type="text"
              class="w-full md:w-1/2 p-3 bg-gray-900 border border-gray-700 rounded text-white focus:outline-none focus:border-red-600 transition-colors"
              placeholder=" Rechercher un film, une série..."
              autocomplete="off"
              autofocus
            />
          </div>
          
          <!-- Titre des résultats -->
          <h2 id="search-title" class="text-xl font-bold mb-4 text-white"></h2>

          <!-- grille de résultats -->
          <div id="search-results" class="flex gap-4 pb-4 overflow-x-auto">
            <p class="text-gray-400 w-full px-2">Commencez à taper pour rechercher...</p>
          </div>
        </main>
      `;

      const searchInput = document.getElementById('search-input');
      const resultsContainer = document.getElementById('search-results');
      const searchTitle = document.getElementById('search-title');
      let timer;

      // recherche
      async function Rechercher(texte) {
        if (texte === "") {
          resultsContainer.innerHTML = '<p class="text-gray-400 w-full px-2">Commencez à taper pour rechercher...</p>';
          searchTitle.textContent = '';
          return;
        }

        try {
          // API
          const reponse = await fetch('/api/tmdb/search?q=' + texte, { credentials: 'include' });
          const donnees = await reponse.json();
          const resultats = donnees.results;

          if (resultats.length === 0) {
            resultsContainer.innerHTML = '<p class="text-gray-400 w-full px-2">Aucun résultat trouvé.</p>';
            searchTitle.textContent = '';
            return;
          }

          let html = "";
          searchTitle.textContent = `Résultats pour "${texte}"`;
          
          for (let i = 0; i < resultats.length; i++) {
            let item = resultats[i];

            if (item.poster_path != null) {
              let type = item.media_type ? item.media_type : 'movie';
              let titre = item.title ? item.title : item.name;

              html += `
                <a data-link href="/detail/${type}/${item.id}" class="shrink-0 block transition transform cursor-pointer hover:opacity-75 hover:scale-105 duration-200" style="width: 160px;">
                  <img class="rounded shadow-md" style="width: 100%; height: 240px; object-fit: cover;" src="https://image.tmdb.org/t/p/w300${item.poster_path}" alt="${titre}" />
                  <p class="mt-2 text-sm truncate text-gray-300">${titre}</p>
                </a>
              `;
            }
          }
          // Affichage
          resultsContainer.innerHTML = html;
        } catch (erreur) {
          console.log(erreur);
          resultsContainer.innerHTML = '<p class="text-red-400 w-full px-2">Une erreur est survenue lors de la recherche.</p>';
          searchTitle.textContent = '';
        }
      }
      // Debounce
      searchInput.addEventListener('input', function (event) {
        let texteTape = event.target.value;
        clearTimeout(timer);
        timer = setTimeout(function () {
        Rechercher(texteTape);
        }, 300);
      });
    }
  };
})();