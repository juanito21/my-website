import React from 'react'
import {CustomNavbar} from "./app/CustomNavbar";
import {HomeUser} from "./features/user/HomeUser";
import {AboutUser} from "./features/user/AboutUser";
import {Footer} from "./app/Footer";
import {useSelector} from "react-redux";
import {loading} from "./app/store";
import {Skills} from "./features/skills/Skills";
import {Resume} from "./features/resume/Resume";

function App() {

  const isLoading = useSelector(state => loading(state))

  let display = <div>
    <CustomNavbar/>
    <HomeUser/>
    <main id="main">
      <AboutUser/>
      <Skills/>
      <Resume/>
    </main>
    <Footer/>
  </div>

  if (isLoading) {
    display = <div id="preloader"></div>
  }

  return display
}

export default App
