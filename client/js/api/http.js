(function initHttpApi() {
  window.http = async function(url, options = {}) {
  const res = await fetch(url, { credentials: 'include', ...options });
  if (res.status === 401) { window.router.navigate('/login'); return; }
  return res;
};

})();
