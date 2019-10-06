export default (function() {
  function setRemUint() {
    var rem = document.documentElement.clientWidth;
    if (rem >= 750) {
      rem = 750;
    } else if (rem <= 320) {
      rem = 320;
    }
    document.documentElement.style.fontSize = rem / 10 + 'px';
    console.log(document.documentElement.style.fontSize);
  }
  setRemUint();
  window.addEventListener('resize', setRemUint);
})();
