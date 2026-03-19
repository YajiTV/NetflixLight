(function(){
  window.pages = window.pages || {};

  window.pages.detail = {
    render(container, params) {
      container.innerHTML = `
        <h2>Page détail</h2>
        <p>Paramètres : ${JSON.stringify(params)}</p>
      `;
    }
  };
})();