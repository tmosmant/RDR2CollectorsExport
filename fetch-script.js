const cards = $('*[data-ui-name="rdrCard"]');

cards.each((index, card) => {
  console.log(card.href);
});
