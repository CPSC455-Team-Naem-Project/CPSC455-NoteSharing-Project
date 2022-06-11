import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Noteteaser from '../components/Noteteaser';
import { faImage, faFilePdf } from '@fortawesome/free-solid-svg-icons'
import {courses} from '../constants/courses'


export default {
    /* 👇 The title prop is optional.
    * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
    * to learn how to generate automatic titles
    */
    title: 'Noteteaser',
    component: Noteteaser,
  } as ComponentMeta<typeof Noteteaser>;

  export const Image: ComponentStory<typeof Noteteaser> = () => <Noteteaser iconType={faImage} title="Syllabus" course={courses.CPSC110} visibility= {'Private'} rating={3}></Noteteaser>;

  export const PDF: ComponentStory<typeof Noteteaser> = () => <Noteteaser iconType={faFilePdf} title="Syllabus" course={courses.CPSC210} visibility={"Public"} rating={5}></Noteteaser>;