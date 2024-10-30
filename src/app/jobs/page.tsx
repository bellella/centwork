'use client';
import { Grid, Typography, Link, Avatar, Tooltip, Fab, CardContent, Stack, Rating } from '@mui/material';
import { IconBasket } from '@tabler/icons-react';
import BlankCard from '../components/shared/BlankCard';
import axios from "axios";
import React from 'react';
import PageContainer from '../components/container/PageContainer';
import DashboardCard from '../components/shared/DashboardCard';

const ecoCard = [
  {
    title: "Programmer",
    subheader: "September 14, 2023",
    photo: '/images/products/s4.jpg',
    salesPrice: 375,
    price: 285,
    rating: 4,
  },
  {
    title: "MacBook Air Pro",
    subheader: "September 14, 2023",
    photo: '/images/products/s5.jpg',
    salesPrice: 650,
    price: 900,
    rating: 5,
  },
  {
    title: "Red Valvet Dress",
    subheader: "September 14, 2023",
    photo: '/images/products/s7.jpg',
    salesPrice: 150,
    price: 200,
    rating: 3,
  },
  {
    title: "Cute Soft Teddybear",
    subheader: "September 14, 2023",
    photo: '/images/products/s11.jpg',
    salesPrice: 285,
    price: 345,
    rating: 2,
  },
];

const Jobs = () => {
  React.useEffect(() => {
    // API 호출
    axios
      .get("/api/test") // API 경로를 입력합니다.
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.error("API 호출 에러:", error);
      });
  }, []);
  return (
    <PageContainer title="Jobs" description="this is Icons">
      <DashboardCard title="Jobs">
        <Grid container spacing={3}>
          {ecoCard.map((product, index) => (
            <Grid item xs={12} md={4} lg={3} key={index}>
              <BlankCard>
                <Typography component={Link} href="/">
                  <Avatar
                    src={product.photo}
                    variant="square"
                    sx={{
                      height: 250,
                      width: "100%",
                    }}
                  />
                </Typography>
                <CardContent sx={{ p: 3, pt: 2 }}>
                  <Typography variant="h6">{product.title}</Typography>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    mt={1}
                  >
                    <Stack direction="row" alignItems="center">
                      <Typography variant="h6">${product.price}</Typography>
                    </Stack>
                    <Rating
                      name="read-only"
                      size="small"
                      value={product.rating}
                      readOnly
                    />
                  </Stack>
                </CardContent>
              </BlankCard>
            </Grid>
          ))}
        </Grid>
      </DashboardCard>
    </PageContainer>
  );
};

export default Jobs;
