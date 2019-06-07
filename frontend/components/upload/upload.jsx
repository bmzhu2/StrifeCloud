import React from 'react';
import {connect} from 'react-redux';
import UploadSplash from './upload_splash';
import UploadFormContainer from './upload_form_container';

class Upload extends React.Component {
  render() {
    const component = (!!this.props.currentUser ? <UploadFormContainer /> : <UploadSplash />);

    return(
      <div className="main-body">
        {component}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.session.currentUser
});

export default connect(mapStateToProps, null)(Upload);