import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {
  selectEducationalEntries,
  selectProfessionalEntries,
  selectResumeStatus,
  selectSkillEntries
} from "./resumeSlice";
import {format} from "date-fns";
import {LinearProgress} from "@mui/material";

export const Resume = () => {
  const dispatch = useDispatch()

  const professionalEntries = useSelector(state => selectProfessionalEntries(state))
  const educationalEntries = useSelector(state => selectEducationalEntries(state))
  const skills = useSelector(state => selectSkillEntries(state))

  const resumeStatus = useSelector(state => selectResumeStatus(state))

  useEffect(() => {
    if (resumeStatus === 'idle') {
      // dispatch(fetchResume())
    }
  }, [resumeStatus, dispatch])

  const educationalContent = educationalEntries.map(entry => (
    <div className="resume-item">
      <h4>{entry.school}</h4>
      <h5>{format(new Date(entry.from), 'yyyy')} - {format(new Date(entry.to), 'yyyy')}</h5>
      <p><em>{entry.diploma} - {entry.location}</em></p>
    </div>
  ))

  const professionalContent = professionalEntries.map(entry => (
    <div className="resume-item">
      <h4>{entry.title}</h4>
      <h5>{format(new Date(entry.from), 'yyyy-MM')} - {entry.to === 'now' ? entry.to : format(new Date(entry.to), 'yyyy-MM')}</h5>
      <p><em>{entry.company}, {entry.location}</em></p>
      <p>{entry.description}</p>
      <ul>
        {entry.items.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  ))

  const skillsContent = skills.map(skill => (
    <div className={"resume-item"}>
      <h4 className="skill-title">{skill.category}</h4>
      {
        skill.items.map(item => (
          <h5 className="skill">{item} </h5>
        ))
      }
    </div>
  ))

  return (
    <section id="resume" className="resume">
      <div className="container" data-aos="fade-up">

        <div className="section-title">
          <h2>Resume</h2>
        </div>

        <div className="row">
          <div className="col-lg-6">
            <h3 className="resume-title">Skills</h3>
            {skillsContent}
            <h3 className="resume-title">Education</h3>
            {educationalContent}
          </div>
          <div className="col-lg-6">
            <h3 className="resume-title">Professional Experience</h3>
            {professionalContent}
          </div>
        </div>

      </div>
    </section>
  )
}