(function(){
  window.pages = window.pages || {};

  window.pages.login = {
    render(container, params) {
      container.innerHTML = `
        <h1>login</h1>
        <p>Paramètres : ${JSON.stringify(params)}</p>
      `;
    }
  };
})();