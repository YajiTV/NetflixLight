(function () {
  window.pages = window.pages || {};
  window.pages.login = {
    render(container) {
      container.innerHTML = `
        ${window.components.renderHeader()}
        <main class="p-8 max-w-md mx-auto">
          <h1 class="text-2xl font-bold">Log in</h1>
          <form id="login-form" class="mt-6 space-y-3">
            <input
              class="w-full p-2 bg-gray-900 border border-gray-700 rounded"
              type="text"
              name="identifier"
              placeholder="Email or username"
              required
            />
            <input
              class="w-full p-2 bg-gray-900 border border-gray-700 rounded"
              type="password"
              name="password"
              placeholder="Password"
              required
            />
            <button class="w-full p-2 bg-red-600 text-white rounded" type="submit">
              Log in
            </button>
            <p id="login-error" class="text-red-400 text-sm"></p>
          </form>
        </main>
      `;

      const form = document.getElementById('login-form');
      const errorEl = document.getElementById('login-error');

      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        errorEl.textContent = '';

        const formData = new FormData(form);
        const identifier = formData.get('identifier');
        const password = formData.get('password');

        try {
          await window.api.auth.login(identifier, password);
          window.router.navigate('/');
        } catch (err) {
          errorEl.textContent = err.message;
        }
      });
    },
  };
})();
