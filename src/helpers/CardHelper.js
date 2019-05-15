import uuid from "uuid";

class Card {
  static serCurrentCardIndex(state, payload) {
    return {
      ...state,
      currentCardIndex: payload
    }
  }

  static addCard(state, payload) {
    const { boards, currentBoardIndex } = state;
    const { cardTitle, cardDescription, listIndex } = payload;
    const currentBoard = boards[currentBoardIndex];
    currentBoard.lists[listIndex].cards = [
      ...currentBoard.lists[listIndex].cards,
      {
        _cardId: uuid.v4(),
        title: cardTitle,
        description: cardDescription,
      }
    ];
    return {
      ...state,
      boards: Object.assign([], boards, { [currentBoardIndex]: currentBoard })
    };
  }

  static addLabelToCard(state, payload) {
    const { boards, currentBoardIndex } = state;
    const { cardIndex, listIndex, cardLabel } = payload;
    const currentBoard = boards[currentBoardIndex];
    const isLabelExist = currentBoard.lists[listIndex].cards[cardIndex].cardLabels.some(label => {
      return label._labelId === cardLabel._labelId
    });
    if (isLabelExist) {
      currentBoard.lists[listIndex].cards[cardIndex].cardLabels = currentBoard.lists[listIndex].cards[cardIndex].cardLabels.filter(label => {
        return label._labelId !== cardLabel._labelId
      })
    } else {
      currentBoard.lists[listIndex].cards[cardIndex].cardLabels = [
        ...currentBoard.lists[listIndex].cards[cardIndex].cardLabels,
        cardLabel
      ];
    }
    return {
      ...state,
      boards: Object.assign([], boards, { [currentBoardIndex]: currentBoard })
    };
  }

  static editCardTitle(state, payload) {
    const { boards, currentBoardIndex } = state;
    const { cardTitle, cardIndex, listIndex } = payload;
    const currentBoard = boards[currentBoardIndex];
    currentBoard.lists[listIndex].cards[cardIndex].title = cardTitle;
    return {
      ...state,
      boards: Object.assign([], boards, { [currentBoardIndex]: currentBoard })
    };
  }

  static editCardDescription(state, payload) {
    const { boards, currentBoardIndex } = state;
    const { cardDescription, cardIndex, listIndex } = payload;
    const currentBoard = boards[currentBoardIndex];
    currentBoard.lists[listIndex].cards[cardIndex].description = cardDescription;
    return {
      ...state,
      boards: Object.assign([], boards, { [currentBoardIndex]: currentBoard })
    };
  }

  static moveCard(state, payload) {
    const { boards, currentBoardIndex } = state;
    const { sourceIndex, destinationIndex, sourceListIndex, destinationListIndex } = payload;
    const currentBoard = boards[currentBoardIndex];
    let sourceList = currentBoard.lists[sourceListIndex];
    let destinationList = currentBoard.lists[destinationListIndex];
    let sourceTask = sourceList.cards[sourceIndex];
    sourceList.cards.splice(sourceIndex, 1);
    destinationList.cards.splice(destinationIndex, 0, sourceTask);
    return {
      ...state,
      boards: Object.assign([], boards, { [currentBoardIndex]: currentBoard })
    };
  }

  static deleteCard(state, payload) {
    const { boards, currentBoardIndex } = state;
    const { _cardId, listIndex } = payload;
    const currentBoard = boards[currentBoardIndex];
    currentBoard.lists[listIndex].cards = currentBoard.lists[listIndex].cards.filter(card =>{
      return  card._cardId !== _cardId;
    });
    return {
      ...state,
      boards: Object.assign([], boards, { [currentBoardIndex]: currentBoard })
    };
  }
}

export default Card;
