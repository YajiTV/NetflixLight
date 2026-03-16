(function () {
  window.pages = window.pages || {};
  window.pages.register = {
    render(container) {
      container.innerHTML = `
        ${window.components.renderHeader()}
        <main class="p-8 max-w-md mx-auto">
          <h1 class="text-2xl font-bold">Créer un compte</h1>
          <form id="register-form" class="mt-6 space-y-3">
            <input
              class="w-full p-2 bg-gray-900 border border-gray-700 rounded"
              type="text"
              name="username"
              placeholder="Username"
              required
            />
            <input
              class="w-full p-2 bg-gray-900 border border-gray-700 rounded"
              type="email"
              name="email"
              placeholder="Email"
              required
            />
            <input
              class="w-full p-2 bg-gray-900 border border-gray-700 rounded"
              type="password"
              name="password"
              placeholder="Mot de passe"
              required
            />
            <button class="w-full p-2 bg-red-600 text-white rounded" type="submit">
              S’inscrire
            </button>
            <p id="register-error" class="text-red-400 text-sm"></p>
            <p class="text-sm text-gray-400">
              Déjà un compte ? <a data-link href="/login" class="underline">Se connecter</a>
            </p>
          </form>
        </main>
      `;

      const form = document.getElementById('register-form');
      const errorEl = document.getElementById('register-error');

      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        errorEl.textContent = '';

        const formData = new FormData(form);
        const username = formData.get('username');
        const email = formData.get('email');
        const password = formData.get('password');

        try {
          await window.api.auth.register(username, email, password);
          window.history.pushState({}, '', '/login');
          window.router.init();
        } catch (err) {
          errorEl.textContent = err.message;
        }
      });
    },
  };
})();
