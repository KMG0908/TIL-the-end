export const applyDrag = (arr, dragResult) => {
  const { removedIndex, addedIndex, payload } = dragResult;
  if (removedIndex === null && addedIndex === null) return arr;

  const result = [...arr];
  let itemToAdd = payload;

  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0];
    result.forEach(card => {
      if (card.index > removedIndex) {
        card.index = card.index - 1;
      }
    });
  }

  if (addedIndex !== null) {
    result.forEach(card => {
      if (card.index >= addedIndex) {
        card.index = card.index + 1;
      }
    });
    itemToAdd.index=addedIndex
    result.splice(addedIndex, 0, itemToAdd);
  }
  console.log(result);

  return result;
};

export const generateItems = (count, creator) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(creator(i));
  }
  return result;
};
