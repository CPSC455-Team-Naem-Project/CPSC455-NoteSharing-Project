import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { faUser } from '@fortawesome/free-solid-svg-icons'
import {courses} from '../constants/courses'
import Navbar from '../components/Navbar';



export default {
    /* 👇 The title prop is optional.
    * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
    * to learn how to generate automatic titles
    */
    title: 'Navbar',
    component: Navbar,
  } as ComponentMeta<typeof Navbar>;

  const options = [
    { label: 'CPSC 310', id: 1 },
    { label: 'ECON 101', id: 2 },
  ];  
  
  export const Image: ComponentStory<typeof Navbar> = () => <Navbar options = {options} />

