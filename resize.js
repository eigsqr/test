document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("canvas");
  const originalWidth = 2000; // Original canvas width
  const originalHeight = 1414; // Original canvas height

  function resizeCanvas() {
    // Calculate the viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Check if the viewport width is below 800px & orientation is portrait
    if (viewportWidth < 800 && viewportWidth < viewportHeight) {
      return; // Exit the function and do not resize the canvas
    }

    // Calculate the desired canvas width and height
    const desiredCanvasWidth = viewportWidth * 0.9;
    const aspectRatio = originalWidth / originalHeight;
    const desiredCanvasHeight = desiredCanvasWidth / aspectRatio;

    // Check if the canvas height is larger than the viewport height
    if (desiredCanvasHeight > viewportHeight) {
      // If the canvas height is too large, limit it to the viewport height minus 20%
      const maxHeight = viewportHeight * 0.8; // 80% of viewport height
      const scaleFactor = maxHeight / desiredCanvasHeight;
      canvas.width = desiredCanvasWidth * scaleFactor;
      canvas.height = maxHeight;
    } else {
      // If the canvas fits within the viewport height, use the desired dimensions
      canvas.width = desiredCanvasWidth;
      canvas.height = desiredCanvasHeight;
    }
  }

  // Initial resize
  resizeCanvas();

  // Resize canvas when the window is resized
  window.addEventListener("resize", resizeCanvas);
});

// Refresh the page when the width, height, or orientation changes
window.addEventListener("resize", function () {
  location.reload();
});
