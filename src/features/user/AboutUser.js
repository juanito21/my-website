import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {format} from 'date-fns'
import {fetchUser, selectUser, selectUserError, selectUserStatus} from "./userSlice";

export const AboutUser = () => {
  const dispatch = useDispatch()

  const user = useSelector(state => selectUser(state))
  const userStatus = useSelector(state => selectUserStatus(state))
  const userError = useSelector(state => selectUserError(state))

  useEffect(() => {
    if (userStatus === 'idle') {
      // dispatch(fetchUser())
    }
  }, [userStatus, dispatch])

  const birthdate = user.birthdate ? format(new Date(user.birthdate), 'dd MMM yyyy') : undefined

  return (
    <section id="about" className="about">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>About</h2><br/><br/>
          <p className={'about-description'}>{user.description}</p>
        </div>

        <div className="row">
          <div className="col-lg-4">
            <img src={`data:image/jpeg;base64,${user.avatar}`} className="img-thumbnail rounded img-fluid" alt=""/>
          </div>
          <div className="col-lg-8 pt-4 pt-lg-0 content">
            <h3>{user.title}</h3>
            <br/>
            <div className="row">
              <div className="col-lg-13">
                <ul>
                  <li><i className="bi bi-chevron-right"></i> <strong>Birthday:</strong><span>{birthdate}</span></li>
                  <li><i className="bi bi-chevron-right"></i> <strong>Phone:</strong><span>{user.phone}</span></li>
                  <li><i className="bi bi-chevron-right"></i> <strong>City:</strong><span>{user.location}</span></li>
                  <li><i className="bi bi-chevron-right"></i> <strong>Degree:</strong> <span>{user.degree}</span></li>
                  <li><i className="bi bi-chevron-right"></i> <strong>Email:</strong><span>{user.email}</span></li>
                  <li><i className="bi bi-chevron-right"></i> <strong>Status:</strong><span>{user.status}</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}