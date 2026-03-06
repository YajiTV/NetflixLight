(function(){
  window.pages = window.pages || {};

  window.pages.register = {
    render(container, params) {
      container.innerHTML = `
        <h1>register</h1>
        <p>Paramètres : ${JSON.stringify(params)}</p>
      `;
    }
  };
})();