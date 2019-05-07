import React from 'react';
import {connect} from 'react-redux';
import {openModal} from '../../actions/modal_actions';

const HeroImage = ({openModal}) => {
  return(
    <section className="hero-image">
      <div className="hero-text">
        <h1>What's next in music is first on StrifeCloud</h1>
        <p>Upload your first track and begin your journey. StrifeCloud gives you space to create, find your fans, and connect with
        other artists.</p>
        <button onClick={() => openModal('signup')}>Start uploading today</button>
      </div>
    </section>
  )
}

const mapDispatchToProps = dispatch => ({
  openModal: mode => dispatch(openModal(mode))
})

export default connect(null, mapDispatchToProps)(HeroImage);