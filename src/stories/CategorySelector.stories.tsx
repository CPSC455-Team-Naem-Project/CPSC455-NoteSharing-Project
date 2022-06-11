import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import CategorySelctor from '../components/CategorySelector';
import {courses} from '../constants/courses'


export default {
    /* 👇 The title prop is optional.
    * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
    * to learn how to generate automatic titles
    */
    title: 'CategorySelctor',
    component: CategorySelctor,
  } as ComponentMeta<typeof CategorySelctor>;

  let courseArr: any[] = []
  for(let property in courses) {
    let course = courses[property as keyof typeof courses]
    courseArr.push(course)
 }  

  export const Primary: ComponentStory<typeof CategorySelctor> = () => <CategorySelctor courses={courseArr}></CategorySelctor>;

