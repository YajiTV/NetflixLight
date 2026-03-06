(function(){
  window.pages = window.pages || {};

  window.pages.detail = {
    render(container, params) {
      container.innerHTML = `
        <h1>detail</h1>
        <p>Paramètres : ${JSON.stringify(params)}</p>
      `;
      container.querySelectorAll('a[data-link]').forEach(a => {
        a.addEventListener('click', e => {
          e.preventDefault();
          window.app.router.navigate(new URL(a.href).pathname);
        });
      });
    }
  };
})();