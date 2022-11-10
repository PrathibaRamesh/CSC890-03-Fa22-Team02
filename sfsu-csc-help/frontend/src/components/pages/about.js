import React from "react";
import Navbar from "../NavBar.js";

const About = (props) => {
    window.history.forward();
    return (
      <div>
        <Navbar />

            <main id="main">
                <br />
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
                      <h3 class="text-white fs-5">Prathiba Ramesh - Frontend Lead</h3>
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
                          <h3 class="text-white fs-5">Anudeep Katukojwala - Backend Lead</h3>
                          <p class="fs-6 text-white">I am a Graduate Student doing my Masters in Computer Science. I love to work on backend systems. I had a year and half experience of working in the tech industry. In my free time, I love to spend time exploring new places in the California state.</p>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
          </div>
        </section>

      <section id="menu" class="menu">
      <div class="container" data-aos="fade-up">
      <div class="section-header">
          <p>Team Plan and Schedule </p>
        </div>
        <div class="tab-content" data-aos="fade-up" data-aos-delay="300">
          <div class="tab-pane fade active show" id="menu-starters">
            <div class="row gy-5">
              <div class="col-lg-6 menu-item">
                <h4>Communication</h4>
                <p class="ingredients">
                  Discord Channel
                </p>  
                <br />           
                <h4>Weekly meeting</h4>
                <p class="ingredients">
                  Friday @ 3PM PST via zoom
                </p>
              </div>

              <div class="col-lg-6 menu-item">
                <h4>Learning Plan</h4>
                <p class="ingredients">
                  September - OpenAI Learning
                </p>
                <p class="ingredients">
                  October - Integrating Open AI into tech stack
                </p>
                <p class="ingredients">
                  November - Fine Tunning in Open AI
                </p>
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
export default About;
