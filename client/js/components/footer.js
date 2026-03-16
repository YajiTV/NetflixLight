(function initFooter() {
  function renderFooter() {
    const year = new Date().getFullYear();
    return `
      <footer class="fixed bottom-0 left-0 right-0 p-4 border-t border-gray-800 text-sm text-gray-400 bg-black">
        <div class="max-w-6xl mx-auto flex justify-between">
          <span>NetflixLight</span>
          <span>&copy; ${year}</span>
        </div>
      </footer>
    `;
  }

  window.components = window.components || {};
  window.components.renderFooter = renderFooter;
})();
