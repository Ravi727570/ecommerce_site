import React from "react";

const Home = () => {
  return (
    <div>
      {/* Page-specific header */}
      <header className="bg-secondary text-center py-5">
  <h1 className="display-3 fw-bold text-white mb-4">The Generics!</h1>

  {/* Buttons */}
  <div className="d-flex flex-column align-items-center gap-3">
    <button className="btn btn-outline-info">
      Get Our Latest Album
    </button>

    <button className="btn btn-outline-info rounded-circle d-flex align-items-center justify-content-center p-3">
  <i className="fa fa-play text-info fs-5"></i>
</button>

  </div>
</header>


      {/* Extra content for Home */}
      <div className="container my-4 text-center">
  <h2 className="fw-bold mb-4">Tours</h2>
  <div className="container">
    <div className="spans d-flex align-items-center justify-content-between p-3 border-bottom">
      <span className="text1 fw-bold">july 16</span>
      <span className="place1">DETROIT, MI</span>
      <span className="music1">DTE ENERGY MUSIC THEATRE</span>
      <button className="btn bg-info text-white">Book tickets</button>
    </div>
    <div className="spans d-flex align-items-center justify-content-between p-3 border-bottom">
      <span className="text2 fw-bold">july 19</span>
      <span className="place2">CONCORD, CA</span>
      <span className="music2">DTE ENERGY MUSIC THEATRE</span>
      <button className="btn bg-info text-white">Book tickets</button>
    </div>
    <div className="spans d-flex align-items-center justify-content-between p-3 border-bottom">
      <span className="text2 fw-bold">july 26</span>
      <span className="place2">LAS VEGAS, NV</span>
      <span className="music2">DTE ENERGY MUSIC THEATRE</span>
      <button className="btn bg-info text-white">Book tickets</button>
    </div>
    <div className="spans d-flex align-items-center justify-content-between p-3 border-bottom">
      <span className="text3 fw-bold">Aug 02</span>
      <span className="place3">PHOENIX, AZ</span>
      <span className="music3">DTE ENERGY MUSIC THEATRE</span>
      <button className="btn bg-info text-white">Book tickets</button>
    </div>
    <div className="spans d-flex align-items-center justify-content-between p-3 border-bottom">
      <span className="text4 fw-bold">Aug 10</span>
      <span className="place4">BRISTOW, VA</span>
      <span className="music4">DTE ENERGY MUSIC THEATRE</span>
      <button className="btn bg-info text-white">Book tickets</button>
    </div>
    <div className="spans d-flex align-items-center justify-content-between p-3 border-bottom">
      <span className="text5 fw-bold">Aug 16</span>
      <span className="place5">TORONTO,ON</span>
      <span className="music5">DTE ENERGY MUSIC THEATRE</span>
      <button className="btn bg-info text-white">Book tickets</button>
    </div>
  </div>
</div>
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

export default Home;
