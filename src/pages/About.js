// src/pages/About.js
import React from "react";

const About = () => {
  return (
    <div>
      {/* Header */}
      <header className="bg-secondary text-center py-5">
        <h1 className="display-3 fw-bold text-white">The Generics!</h1>
      </header>

      {/* About Section */}
      <div className="container my-5">
        <h2 className="text-center mb-5 fw-bold" style={{ fontFamily: "cursive" }}>
          About
        </h2>

        {/* Flex Layout */}
        <div className="d-flex flex-column flex-md-row align-items-start justify-content-center gap-4">
          
          {/* Left Image + Caption */}
          <div className="flex-shrink-0 text-center">
            <img
              src="https://thaka.bing.com/th/id/OIP.RSwB6h9SWQ2I7bWzByMWjQHaFN?w=222&h=180&c=7&r=0&o=5&pid=1.7"
              alt="Band"
              className="img-fluid rounded-circle shadow"
              style={{ width: "250px", height: "250px", objectFit: "cover" }}
            />
      
          </div>

          {/* Right Text */}
          <div className="text-justify" style={{ maxWidth: "800px" }}>
            <p>
              Lorem ipsum carrots enhanced rebates. Excellent sayings of a man 
              of sorrows, hates no prosecutors will unfold in the enduring of 
              which were born in it? Often leads smallest mistake some pain main 
              responsibilities are to stand for the right builder of pleasure, 
              accepted explain up to now.
            </p>
            <p>
              The things we are accusing of these in the explication of the 
              truth receives from the flattery of her will never be the trouble 
              and they are refused to the pleasures and the pleasures of the 
              pain, explain the treatment of excepturi of the blessed sufferings.
            </p>
            <p>
              I never said will unfold in him receives at another time he may 
              please the one that those works, we are less than they, this 
              refused to the pleasures of deleniti? Those are! Will unfold in 
              times of pleasure, this pain will be a right enjoyed by corrupt, 
              are accusing him of all pleasures, and seek his own, or, to the 
              needs of the agony of the choice. We hate the fellow.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-info py-4">
        <div className="container d-flex justify-content-between align-items-center">
          <h1 className="display-3 fw-bold text-white m-2">The Generics</h1>
          <div className="d-flex gap-4">
            <i className="fa-brands fa-youtube fa-lg text-white m-3"></i>
            <i className="fa-brands fa-facebook fa-lg text-white m-3"></i>
            <i className="fa-brands fa-linkedin fa-lg text-white m-3"></i>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
