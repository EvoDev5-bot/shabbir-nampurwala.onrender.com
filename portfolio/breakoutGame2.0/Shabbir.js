const s = {
  random: function (start, end, decimals) {
    if (decimals) {
      return Math.random() * end + start;
    } else {
      return Math.floor(Math.random() * end + start);
    }
  },
  dice: function () {
    return Math.floor(Math.random() * 7 + 1);
  },
  $: function (identifier) {
    return document.querySelector(identifier);
  },
  $$: function (identifier) {
    return document.querySelectorAll(identifier);
  },
};
