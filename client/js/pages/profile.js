(function () {
  window.pages = window.pages || {};

  window.pages.profile = {

    async render(container) {
      if (!window.store.getState().user) {
        window.router.navigate('/login');
        return;
      }

      const profiles = await window.api.profiles.getAll();

      container.innerHTML = `
        ${window.components.renderHeader()}
        <main class="min-h-screen flex flex-col items-center justify-center gap-8">

          <h1 class="text-3xl font-bold">Who's watching?</h1>

          <div id="profiles-grid" class="flex flex-wrap justify-center gap-6">
            ${profiles.map(p => `
              <div class="flex flex-col items-center gap-2 group cursor-pointer" data-profile-id="${p.id}">
                <div class="relative">
                  <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(p.name)}&background=e50914&color=fff&size=128"
                    class="w-24 h-24 rounded-full border-2 border-transparent group-hover:border-white transition" />
                  <button class="btn-delete absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 transition hover:bg-red-600"
                    data-id="${p.id}">✕</button>
                </div>
                <span class="text-sm text-gray-400 group-hover:text-white transition">${p.name}</span>
              </div>
            `).join('')}
          </div>

          ${profiles.length < 5 ? `
            <div class="flex flex-col items-center gap-3">
              <input id="new-name" type="text" maxlength="20" placeholder="New profile name"
                class="px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-red-500" />
              <p id="error-msg" class="text-red-400 text-sm hidden">Please enter a name.</p>
              <button id="btn-create" class="px-6 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-semibold transition">
                Add profile
              </button>
            </div>
          ` : '<p class="text-gray-400 text-sm">Maximum 5 profiles reached.</p>'}

        </main>
      `;

      this.bindEvents(container);
    },

    bindEvents(container) {
      // Create profile
      const btnCreate = document.getElementById('btn-create');
      if (btnCreate) {
        btnCreate.addEventListener('click', async () => {
          const input = document.getElementById('new-name');
          const name = input.value.trim();
          const errorEl = document.getElementById('error-msg');

          if (!name) {
            errorEl.classList.remove('hidden');
            return;
          }

          const res = await window.api.profiles.create(name, null);
          if (res.ok) {
            await this.render(container);
          } else {
            errorEl.textContent = 'Error creating profile.';
            errorEl.classList.remove('hidden');
          }
        });
      }

      // Delete profile
      document.getElementById('profiles-grid').addEventListener('click', async (e) => {
        const deleteBtn = e.target.closest('.btn-delete');
        if (!deleteBtn) return;
        e.stopPropagation();
        await window.api.profiles.remove(deleteBtn.dataset.id);
        await this.render(container);
      });

      // Select profile → go to home
      document.getElementById('profiles-grid').addEventListener('click', (e) => {
        const card = e.target.closest('[data-profile-id]');
        if (!card || e.target.closest('.btn-delete')) return;
        sessionStorage.setItem('activeProfileId', card.dataset.profileId);
        window.router.navigate('/');
      });
    },

  };
})();
