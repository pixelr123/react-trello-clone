import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { moveList, moveCard, setCurrentBoardID } from "../redux/rootReducer/actions";
import styled from 'styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import BoardHeader from '../components/Board/BoardHeader'
import ListAdder from '../components/List/ListAdder';
import List from '../components/List/List'

const BoardWrapper = styled.div`
  height: 100%;
  padding-top: 1rem;
  background-color: ${props => props.color};
  transition: background-color .2s ease-in-out;
`;

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  flex-shrink: 0;
  height: 92%;
  max-width: 100vw;
  padding: 0 1rem 1rem;
  overflow: auto;
`;

class InnerList extends Component {
  render() {
    const { listsId, boardId } = this.props;
    return (
      <>
        {listsId.map((listId, index) => (
          <List
            key={index}
            index={index}
            boardId={boardId}
            listId={listId}
          />
        ))}
      </>
    )
  }
}

class Board extends Component {
  componentDidMount() {
    const boardId = this.props.match.params.boardId;
    this.props.actions.setCurrentBoardID(boardId)
  }

  componentWillUnmount() {
    this.props.actions.setCurrentBoardID(null)
  }

  handleDragEnd = (result) => {
    const { actions } = this.props;
    const { destination, source, type } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;

    if (type === 'column') {
      actions.moveList({
        boardId: this.props.board._boardId,
        sourceIndex: source.index,
        destinationIndex: destination.index,
      });
    }

    if (type === 'task') {
      actions.moveCard({
        sourceIndex: source.index,
        sourceListIndex: source.droppableId,
        destinationIndex: destination.index,
        destinationListIndex: destination.droppableId,
      });
    }
  };

  render() {
    const { board } = this.props;
    if (!board) return null;
    return (
      <BoardWrapper color={board.color}>
        <BoardHeader boardId={board._boardId}/>
        <DragDropContext onDragEnd={this.handleDragEnd}>
          <Droppable
            type='column'
            droppableId={board._boardId}
            direction='horizontal'
          >
            {(provided) => (
              <Container
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <InnerList
                  boardId={board._boardId}
                  listsId={board.lists}
                />
                {provided.placeholder}
                <ListAdder
                  boardId={board._boardId}
                />
              </Container>
            )}
          </Droppable>
        </DragDropContext>
      </BoardWrapper>
    )
  }
}

function mapStateToProps(state) {
  return {
    board: state.rootReducer.boards[state.rootReducer.currentBoardID],
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      setCurrentBoardID: setCurrentBoardID,
      moveList: moveList,
      moveCard: moveCard,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
