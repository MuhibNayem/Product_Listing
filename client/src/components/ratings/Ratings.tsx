import React from 'react';
import { Rating as MuiRating, RatingProps } from '@mui/material';

interface Props extends RatingProps {}

const Rating: React.FC<Props> = (props) => {
  return (
    <MuiRating
      name="rating"
      precision={0.1}
      size="small"
      {...props}
    />
  );
};

export default Rating;
