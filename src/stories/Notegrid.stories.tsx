import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {courses} from '../constants/courses'
import { faImage, faFilePdf } from '@fortawesome/free-solid-svg-icons'
import { Note } from '../components/Noteteaser';
import Notegrid from '../components/NoteGrid';


export default {
    /* 👇 The title prop is optional.
    * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
    * to learn how to generate automatic titles
    */
    title: 'Notegrid',
    component: Notegrid,
  } as ComponentMeta<typeof Notegrid>;

  let noteArr: Note[] = []
  let i = 0;

  for(let property in courses) {
    let myCourse = courses[property as keyof typeof courses]
    let icon = i%2 == 0? faImage: faFilePdf
    i++

    let noteObject = {
      title: property,
      iconType: icon,
      course: myCourse,
      rating: 5,
      visibility: "Private",
      id: 1
    }
    noteArr.push(noteObject)
 }

 const options = [
  { label: 'CPSC 310', id: 1 },
  { label: 'ECON 101', id: 2 },
];

  export const Primary: ComponentStory<typeof Notegrid> = () => <Notegrid notes={noteArr} options = {options}></Notegrid>;

