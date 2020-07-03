import React from 'react';
import Modal from '../Modal';
import history from '../../history';
import { connect } from 'react-redux';
import {fetchStream, deleteStream} from '../../actions';

class StreamDelete extends React.Component {

  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  handleClickDeleteButton = () =>  {
    this.props.deleteStream(this.props.match.params.id);
    // this is use to navigate user back to homepage
    history.push('/');
  }

  handleClickCancelButton = () =>  {
    history.push('/');
  }

  renderContent() {
    return (
      <div>
       Are you use to delete this stream?
       <div className="content">
          Title: {this.props.stream.title}
          <div className="description">
           Description:{this.props.stream.description}
          </div>
       </div>
       </div>
    );
  }

  renderActions() {
    return (
      <div>
       <React.Fragment>
         <button className="ui primary button" onClick={this.handleClickDeleteButton}>Delete</button>
         <button className="ui button"onClick={this.handleClickCancelButton}>Cancel</button>
       </React.Fragment>
      </div>
    );
  }

  render() {
    return (
      <div>
          StreamDelete
          <Modal
            title="Delete Stream"
            content={this.renderContent()}
            actions={this.renderActions()}
            onDimiss={() => history.push('/')}
          />
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return {stream: state.streams[ownProps.match.params.id]}
}

export default connect(mapStateToProps, {fetchStream, deleteStream})(StreamDelete);
