import * as React from 'react';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';

const CustomRating = styled(Rating)({
  '& .MuiRating-iconEmpty, .MuiRating-iconFilled': {
    color: 'orange',
  },
});

export default function BookRating({ rating}) {
  return (
    <div style={{ display: 'flex', alignItems: 'start' }}>
      <CustomRating name="half-rating-read" value={rating} precision={0.5} readOnly size="small" />
    </div>
  );
}
