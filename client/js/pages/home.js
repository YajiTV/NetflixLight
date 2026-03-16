(function(){
  // register pages namespace
  window.pages = window.pages || {};

  window.pages.home = {
    render: function(container, params) {
      container.innerHTML = `
        <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <div class="max-w-6xl mx-auto px-6 py-10">
            <header class="flex items-center justify-between mb-12">
              <h1 class="text-3xl font-bold">Netflix Light</h1>
              <nav class="flex gap-6">
                <a href="/" data-link class="hover:text-red-600">Home</a>
                <a href="/search" data-link class="hover:text-red-600">Search</a>
                <a href="/watchlist" data-link class="hover:text-red-600">Watchlist</a>
              </nav>
            </header>

            <section class="mb-12">
              <h2 class="text-4xl font-bold mb-4">Explore Movies & Shows</h2>
              <p class="text-gray-600 dark:text-gray-400">Coming soon</p>
            </section>

          </div>
        </div>
      `;
    }
  };
})();