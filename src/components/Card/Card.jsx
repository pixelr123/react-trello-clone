import React, { Component } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { setCurrentBoardIndex, deleteCard } from '../../redux/boardReducer/actions';
import CardModal from "./CardModal";
import { NavLink } from 'react-router-dom';

const Title = styled.h4`
  padding-bottom: .5rem;
  margin-bottom: .5rem;
  border-bottom: 1px solid #e3e3e3
`;

const Description = styled.p`
  color: #4c4c4c;
  font-size: .75rem;
`;

const Button = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  visibility: hidden;
  padding: .5rem;
  font-size: .75rem;
  color: #444;
  cursor: pointer;
  transition: transform .2s ease-in;
`;

const Container = styled.div`
  position: relative;
  padding: .5rem;
  border: 1px solid lightgrey;
  border-radius: 2px;
  background-color: white;  
  &:hover {
    background-color: #ededed;
  }   
  &:hover ${Button} {
    visibility: visible;
  }   
   margin-bottom: .5rem;
`;


class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
    }
  }

  toggleModal = () => {
    this.setState({
      isOpened: !this.state.isOpened
    })
  };

  render() {
    const { isOpened } = this.state;
    const { currentBoardIndex, card, cardIndex, listIndex, isDraggingOver} = this.props;
    if (!card) return null;
    return (
      <>
        <Draggable
          index={cardIndex}
          draggableId={`${card._cardId}`}
        >
          {(provided, snapshot) => (
            <>
              <NavLink to={`/board/${currentBoardIndex}/card/${cardIndex}`}>asd</NavLink>
              <Container
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                isDragging={snapshot.isDragging}
                onClick={() => this.toggleModal()}
              >
                <Title>{card.title}</Title>
                <Description>{card.description}</Description>
              </Container>
              {isDraggingOver && provided.placeholder}
            </>
          )}
        </Draggable>
        {isOpened && (
          <CardModal
            listIndex={listIndex}
            cardIndex={cardIndex}
            toggleModal={this.toggleModal}
          />
        )}
      </>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const { rootReducer } = state;
  const board = rootReducer.boards[rootReducer.currentBoardIndex];
  const list = board.lists[ownProps.listIndex];
  const card = list.cards[ownProps.cardIndex];
  return {
    card: card,
    currentBoardIndex: rootReducer.currentBoardIndex
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      setCurrentBoardIndex: setCurrentBoardIndex,
      deleteCard: deleteCard,
    }, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Card);
