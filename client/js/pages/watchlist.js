(function(){
  window.pages = window.pages || {};

  window.pages.watchlist = {
    render(container, params) {
      container.innerHTML = `
        <h1>watchlist</h1>
        <p>Paramètres : ${JSON.stringify(params)}</p>
      `;
    }
  };
})();