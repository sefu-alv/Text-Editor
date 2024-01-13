// This variable will hold the `beforeinstallprompt` event
let deferredPrompt;

const butInstall = document.getElementById('buttonInstall');
// Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
 
  event.preventDefault();
  
  deferredPrompt = event;

  
  butInstall.style.display = 'block';
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  
  butInstall.style.display = 'none';
  
  deferredPrompt.prompt();
  
  const choiceResult = await deferredPrompt.userChoice;

  if (choiceResult.outcome === 'accepted') {
    console.log('PWA setup accepted');
  }
  else {
    console.log('PWA setup rejected');
  }

  
  butInstall.style.display = 'none';


});

// Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  console.log('PWA was installed');
});