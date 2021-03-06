import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { history } from "../../redux/store";
import { bindActionCreators } from 'redux';
import { deleteBoard } from '../../redux/boardReducer/actions/actions';
import { Text, SubmitButton } from '../BaseComponent';

class BoardDelete extends Component {
  deleteBoard = () => {
    this.props.actions.deleteBoard({
      boardId: this.props.boardId
    });
    history.push('/')
  };

  render() {
    return (
      <>
        <Text>
          All actions will be removed from the activity feed and you won’t be able to re-open the board.
          There is no undo.
        </Text>
        <SubmitButton color='danger' onClick={() => this.deleteBoard()}>
          Delete board
        </SubmitButton>
      </>
    );
  }
}

BoardDelete.propTypes = {
  boardId: PropTypes.string.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      deleteBoard: deleteBoard,
    }, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(BoardDelete);
