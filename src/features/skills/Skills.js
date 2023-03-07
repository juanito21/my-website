import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {fetchSkills, selectSkills, selectSkillsStatus} from "./skillsSlice";
import {LinearProgress} from "@mui/material";

export const Skills = () => {
  const dispatch = useDispatch()

  const skills = useSelector(state => selectSkills(state))
  const skillsStatus = useSelector(state => selectSkillsStatus(state))

  useEffect(() => {
    if (skillsStatus === 'idle') {
      // dispatch(fetchSkills())
    }
  }, [skillsStatus, dispatch])

  const skillsContent = skills.map(skill => (
    <div className="col-lg-6">
      <h3 className="resume-title">{skill.category}</h3>
      {
        skill.items.map(item => (
          <div className="progress">
            <span className="skill">{item.name} <i className="val">{item.level * 100}%</i></span>
            <LinearProgress variant={"determinate"} value={item.level * 100} />
          </div>
        ))
      }
    </div>
  ))

  return (
    <section id="skills" className="skills section-bg">
      <div className="container" data-aos="fade-up">

        <div className="section-title">
          <h2>Skills</h2>
        </div>

        <div className="row skills-content">
          {skillsContent}
        </div>

      </div>
    </section>
  )
}