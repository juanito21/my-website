import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {fetchUser, selectUser, selectUserError, selectUserStatus} from "./userSlice";
import Typewriter from 'typewriter-effect';

export const HomeUser = () => {
  const dispatch = useDispatch()

  const user = useSelector(state => selectUser(state))
  const userStatus = useSelector(state => selectUserStatus(state))
  const userError = useSelector(state => selectUserError(state))

  const availableClassName = user.status && user.status.toLowerCase() === 'available' ? 'green' : 'red';

  useEffect(() => {
    if (userStatus === 'idle') {
      // dispatch(fetchUser())
    }
  }, [userStatus, dispatch])

  return (
    <section id="hero" className="d-flex flex-column justify-content-center">
      <div className="container" data-aos="zoom-in" data-aos-delay="100">
        <div className={'title'}>
          <h1>{user.name} {user.surname}</h1>
          <span className={`status ${availableClassName}`}> <i className="bi bi-circle-fill"></i> {user.status} </span>
        </div>
          <span className="typed">
          <Typewriter
            class="typed"
            options={{
              delay: 90,
              deleteSpeed: 60,
              strings: user.roles,
              autoStart: true,
              loop: true,
            }}
          />
        </span>
        <div className="social-links">
          <a href="https://www.malt.fr/profile/jeanhascoet" target={'_blank'}><i className="bi bi-link-45deg"></i> malt</a>
          <a href="https://www.linkedin.com/in/jeanhascoet/"><i className="bi bi-linkedin"></i> linkedin</a>
          <a href={`mailto:${user.email}`} target={'_blank'}><i className="bi bi-envelope"></i> {user.email}</a>
        </div>
      </div>
    </section>
  )
}