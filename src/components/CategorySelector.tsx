import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition, IconProp } from '@fortawesome/fontawesome-svg-core';
import { faImage, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Button, Grid } from '@mui/material';

interface Props {
  courses: any[];
}

export default function CategorySelctor({ courses }: Props) {
  let cats = courses.map((course) => (
    <Grid item xs={2}>
      <Button className={course.className} variant="outlined" size="small" sx={ { borderRadius: 8, color:"black" } }>
        {course.name}
      </Button>
    </Grid>
  ));

  return (
    <Grid container spacing={1}>
      {cats}
    </Grid>
  );
}
