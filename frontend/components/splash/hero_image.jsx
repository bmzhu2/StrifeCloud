import React from 'react';
import {withRouter} from 'react-router-dom'

const HeroImage = (props) => {
  return(
    <section className="hero-image">
      <div className="hero-text">
        <h1>What's next in music is first on StrifeCloud</h1>
        <p>Upload your first track and begin your journey. StrifeCloud gives you space to create, find your fans, and connect with
        other artists.</p>
        <button onClick={() => props.history.push("/upload/")}>Start uploading today</button>
      </div>
    </section>
  )
}

export default withRouter(HeroImage);