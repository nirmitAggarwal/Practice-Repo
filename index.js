function hexToHsl(hex) {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

const hsl = hexToHsl("#2233ff");
console.log(hsl);

window.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#H").value = hsl.h;
  document.querySelector("#S").value = hsl.s;
  document.querySelector("#L").value = hsl.l;
  updateColorTab();

  document.querySelector("#H").addEventListener("input", (e) => {
    hsl.h = parseInt(e.target.value);
    updateColorTab();
  });

  document.querySelector("#S").addEventListener("input", (e) => {
    hsl.s = parseInt(e.target.value);
    updateColorTab();
  });

  document.querySelector("#L").addEventListener("input", (e) => {
    hsl.l = parseInt(e.target.value);
    updateColorTab();
  });
});

function updateColorTab() {
  document.querySelector(
    ".color-tab"
  ).style.backgroundColor = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
}
