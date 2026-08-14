/**
 * PORTAL SLIDER REDIRECT PIPELINES
 * Direct Vanilla JS translation matching your exact static class targets.
 */
document.addEventListener('DOMContentLoaded', () => {
  
  // 1. PORTAL SLIDER SELECTION ROW 1
  const link1 = document.querySelector('.portal_sliderlink-1');
  if (link1) {
    link1.addEventListener('click', () => {
      window.location.href = "/legacy-site/";
    });
  }

  // 2. PORTAL SLIDER SELECTION ROW 2
  const link2 = document.querySelector('.portal_sliderlink-2');
  if (link2) {
    link2.addEventListener('click', () => {
      window.location.href = "/legacy-site/fcreviews";
    });
  }

  // 3. PORTAL SLIDER SELECTION ROW 3
  const link3 = document.querySelector('.portal_sliderlink-3');
  if (link3) {
    link3.addEventListener('click', () => {
      window.location.href = "/legacy-site/normalreviews";
    });
  }

  // 4. PORTAL SLIDER SELECTION ROW 4
  const link4 = document.querySelector('.portal_sliderlink-4');
  if (link4) {
    link4.addEventListener('click', () => {
      window.location.href = "/legacy-site/blog/";
    });
  }

  // 5. PORTAL SLIDER SELECTION ROW 5
  const link5 = document.querySelector('.portal_sliderlink-5');
  if (link5) {
    link5.addEventListener('click', () => {
      window.location.href = "/legacy-site/about/";
    });
  }

});
