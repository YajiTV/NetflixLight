(function(){
  window.pages = window.pages || {};

  window.pages.profile = {
    render(container, params) {
      container.innerHTML = `
        <h1>profile</h1>
        <p>Paramètres : ${JSON.stringify(params)}</p>
      `;
    }
  };
})();