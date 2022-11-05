import React from "react";
import { Link } from "react-router-dom";

function Navbar(props) {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <header id="header" class="header fixed-top d-flex align-items-center">
          <div class="container d-flex align-items-center justify-content-between">
            <a href="/home" class="logo d-flex align-items-center me-auto me-lg-0">
              <img src="assets/img/logo.png" alt="" />
            <h1><span>|</span> Department of Computer Science</h1>
            </a>

            <nav id="navbar" class="navbar">
            <ul>
              <li><a href="/home">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/dashboard">Dashboard</a></li>
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
              <li><a href="/help">Ask Help</a></li>
            </ul>
            </nav>

            <a class="btn-book-a-table" href="/">Log Out</a>
            <i class="mobile-nav-toggle mobile-nav-show bi bi-list"></i>
            <i class="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></i>
          </div>
        </header>
        </nav>
    </div>
  );
}

export default Navbar;
