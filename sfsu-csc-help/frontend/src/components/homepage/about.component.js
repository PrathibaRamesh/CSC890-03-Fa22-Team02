import React, { Component } from "react";

export default class About extends Component {
  render() {
    return (
      <div>
        <header id="header" class="header fixed-top d-flex align-items-center">
          <div class="container d-flex align-items-center justify-content-between">
            <a href="/" class="logo d-flex align-items-center me-auto me-lg-0">
              <img src="assets/img/logo.png" alt="" />
            <h1><span>|</span> Department of Computer Science</h1>
            </a>

            <nav id="navbar" class="navbar">
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#events">Events</a></li>
              <li class="dropdown"><a href="#"><span>Menu</span> <i class="bi bi-chevron-down dropdown-indicator"></i></a>
                <ul>
                <li class="dropdown"><a href="#"><span>Undergraduate</span> <i class="bi bi-chevron-down dropdown-indicator"></i></a>
                    <ul>
                      <li><a href="#">Deep Drop Down 1</a></li>
                      <li><a href="#">Deep Drop Down 2</a></li>
                      <li><a href="#">Deep Drop Down 3</a></li>
                      <li><a href="#">Deep Drop Down 4</a></li>
                      <li><a href="#">Deep Drop Down 5</a></li>
                    </ul>
                  </li>
                  <li class="dropdown"><a href="#"><span>Graduate</span> <i class="bi bi-chevron-down dropdown-indicator"></i></a>
                    <ul>
                      <li><a href="#">Deep Drop Down 1</a></li>
                      <li><a href="#">Deep Drop Down 2</a></li>
                      <li><a href="#">Deep Drop Down 3</a></li>
                      <li><a href="#">Deep Drop Down 4</a></li>
                      <li><a href="#">Deep Drop Down 5</a></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li><a href="#contact">Contact</a></li>
            </ul>
            </nav>

            <a class="btn-book-a-table" href="#sign-up">Sign Up</a>
            <i class="mobile-nav-toggle mobile-nav-show bi bi-list"></i>
            <i class="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></i>
          </div>
        </header>

        <section id="home" class="hero d-flex align-items-center section-bg">
          <div class="container">
            <div class="row justify-content-between gy-5">
              <div class="col-lg-5 order-2 order-lg-1 d-flex flex-column justify-content-center align-items-center align-items-lg-start text-center text-lg-start">
                <h2 data-aos="fade-up" className="text-center">Gator's <br />Self Help Portal</h2>
                <p data-aos="fade-up" data-aos-delay="100">One stop solution to all your queries</p>
                <div class="d-flex" data-aos="fade-up" data-aos-delay="200">
                  <a href="#chat" class="btn-book-a-table">QuickChat</a>
                  <a href="https://www.youtube.com/watch?v=LQR0qGCX98U" class="glightbox btn-watch-video d-flex align-items-center"><i class="bi bi-play-circle"></i><span>Watch Tutorial</span></a>
                </div>
              </div>
              <div class="col-lg-5 order-1 order-lg-2 text-center text-lg-start">
                <img src="assets/img/hero-img.png" class="img-fluid" alt="" data-aos="zoom-out" data-aos-delay="300" />
              </div>
            </div>
          </div>
        </section>

        <main id="main">
        <section id="about" class="about">
          <div class="container" data-aos="fade-up">

            <div class="section-header">
              <h2>About Us</h2>
              <p>Learn More <span>About Us</span></p>
            </div>
            <div class="container d-flex align-items-center justify-content-center flex-wrap">
              <div class="box">
                <div class="body">
                  <div class="imgContainer">
                    <img src="assets/img/profile/prathiba.jpeg" alt="" />
                  </div>
                  <div class="content d-flex flex-column align-items-center justify-content-center">
                    <div>
                      <h3 class="text-white fs-5">Prathiba Ramesh</h3>
                        <p class="fs-6 text-white">
                          An international graduate student at SFSU, currently in second semester. 
                          I have a previous work experience as Software Developer and am more interested into frontend technologies.
                        </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="box">
                <div class="body">
                <div class="imgContainer">
                  <img src="assets/img/profile/anudeep.jpeg" alt="" />
                    </div>
                      <div class="content d-flex flex-column align-items-center justify-content-center">
                        <div>
                          <h3 class="text-white fs-5">Anudeep Katukojwala</h3>
                          <p class="fs-6 text-white">Add your stuff</p>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
          </div>
        </section>
        </main>
        
      </div>
    );
  }
}
