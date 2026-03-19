(function(){
  window.pages = window.pages || {};

  window.pages.player = {
    render(container, params) {
      container.innerHTML = `
        <h1>player</h1>
        <p>Paramètres : ${JSON.stringify(params)}</p>
      `;
    }
  };
})();