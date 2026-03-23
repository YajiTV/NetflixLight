(function () {
  window.components = window.components || {};

  window.components.Carousel = function (containerId, movies) {
    const list = document.getElementById(containerId);
    if (!list || !movies.length) return;

    list.innerHTML = movies.slice(0, 10).map(movie => {
      const year = (movie.release_date || movie.first_air_date || '').slice(0, 4);
      const note = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
      const title = movie.title || movie.name;

      return `
        <div class="relative shrink-0 w-40 cursor-pointer group">
          <img
            class="w-full rounded"
            src="https://image.tmdb.org/t/p/w300${movie.poster_path}"
            alt="${title}"
          />
          <div class="absolute inset-0 rounded bg-black/80 opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-2">
            <p class="text-sm font-bold leading-tight">${title}</p>
            <p class="text-xs text-yellow-400">★ ${note}</p>
            <p class="text-xs text-gray-400">${year}</p>
          </div>
        </div>
      `;
    }).join('');
  };
})();
