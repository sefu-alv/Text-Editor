const butInstall = document.getElementById('buttonInstall');
// Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  window.deferredPrompt = event;
  butInstall.classList.toggle('hidden', false);
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  butInstall.classList.toggle('hidden', true);

  const prompt = window.deferredPrompt;

  if (!prompt) {
    return;
  }

  prompt.prompt();

  window.deferredPrompt = null;


});

// Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  console.log('PWA was installed');
  window.deferredPrompt = null;
});