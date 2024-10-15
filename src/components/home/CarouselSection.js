// src/components/home/CarouselSection.js
import React from 'react';
import Slider from 'react-slick';
import { Box, Typography, Card, CardContent, CardMedia } from '@mui/material';

const items = [
  {
    title: 'Top Freelancer 1',
    imageUrl: 'https://source.unsplash.com/random/400x400?face',
    description: 'Expert in Graphic Design',
  },
  {
    title: 'Top Freelancer 2',
    imageUrl: 'https://source.unsplash.com/random/400x400?face',
    description: 'Professional Web Developer',
  },
  {
    title: 'Top Freelancer 3',
    imageUrl: 'https://source.unsplash.com/random/400x400?face',
    description: 'Digital Marketing Specialist',
  },
];

function CarouselSection() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <Box sx={{ py: 8, backgroundColor: '#F2F2F2' }}>
      <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700, textAlign: 'center' }}>
        Featured Freelancers
      </Typography>
      <Slider {...settings}>
        {items.map((item, index) => (
          <Box key={index} sx={{ px: 2 }}>
            <Card sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 4 }}>
              <CardMedia
                component="img"
                image={item.imageUrl}
                alt={item.title}
                sx={{ width: 150, height: 150, borderRadius: '50%' }}
              />
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {item.title}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}

export default CarouselSection;
