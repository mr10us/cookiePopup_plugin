document.addEventListener('DOMContentLoaded', () => {
  const cookiePolicy = document.querySelector('.cookie-policy');

  // Header control buttons
  const resizeButton = cookiePolicy.querySelector('.cookie__header button.resize');
  const closeButton = cookiePolicy.querySelector('.cookie__header button.close');

  // Body 
  const cookieBody = cookiePolicy.querySelector('.cookie__body');

  resizeButton.addEventListener('click', () => {
    cookiePolicy.classList.toggle('maximize');
  });
  closeButton.addEventListener('click', () => {
    cookiePolicy.remove();
  });

  cookieBody.addEventListener('scroll', () => {
    const bodyFullHeight = cookieBody.scrollHeight; // Full height
    const bodyCurrentHeight = cookieBody.clientHeight; // Visible height
    const bodyScrolled = cookieBody.scrollTop; // Scroll height
  
    // For center
    if (bodyScrolled >= 20 && bodyScrolled + bodyCurrentHeight < bodyFullHeight - 20) {
      cookieBody.style.maskImage = 'linear-gradient(0deg, transparent 0, var(--color-background) 15%, var(--color-background) 85%, transparent 100%)';
    } 
    // For bottom
    else if (bodyScrolled + bodyCurrentHeight >= bodyFullHeight - 20) {
      cookieBody.style.maskImage = 'linear-gradient(0deg, var(--color-background) 85%, transparent 100%)';
    } 
    // For top
    else {
      cookieBody.style.maskImage = 'linear-gradient(0deg, transparent 0, var(--color-background) 15%)';
    }
  });
  
});