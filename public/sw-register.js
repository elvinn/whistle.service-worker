(function () {
  if ('serviceWorker' in navigator && (
    window.location.protocol === 'https:' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname === 'localhost'
  )) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').then(registration => {
        console.log('SW registered: ', registration)
      }).catch(registrationError => {
        console.log('SW registration failed: ', registrationError)
      })
    })
  }
})()
