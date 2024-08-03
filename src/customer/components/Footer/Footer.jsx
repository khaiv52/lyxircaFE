import React from 'react'
import { Button, Grid, Typography } from '@mui/material'

const Footer = () => {
  return (
    <div className='z-10 w-full'>
        <Grid className='text-center text-white bg-black'
        container
        sx={{bgColor: "black", color: "white", py:3}}>
            <Grid item xs={12} sm={6} md={3} pb={3}>
                <Typography className='pb-5' variant='h6'> Company </Typography>
                <div>
                <Button sx={{ color: 'rgba(255, 255, 255, 0.7)' }} > About </Button>
                </div>
                <div>
                <Button sx={{ color: 'rgba(255, 255, 255, 0.7)' }} > Blog </Button>
                </div>
                <div>
                <Button sx={{ color: 'rgba(255, 255, 255, 0.7)' }} > Press </Button>
                </div>
                <div>
                <Button sx={{ color: 'rgba(255, 255, 255, 0.7)' }} > Jobs </Button>
                </div>
                <div>
                <Button sx={{ color: 'rgba(255, 255, 255, 0.7)' }} > Partners </Button>
                </div>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Typography className='pb-5' variant='h6'> Solutions </Typography>
                <div>
                <Button sx={{ color: 'rgba(255, 255, 255, 0.7)' }} > Marketing </Button>
                </div>
                <div>
                <Button sx={{ color: 'rgba(255, 255, 255, 0.7)' }} > Analytics </Button>
                </div>
                <div>
                <Button sx={{ color: 'rgba(255, 255, 255, 0.7)' }} > Customers </Button>
                </div>
                <div>
                <Button sx={{ color: 'rgba(255, 255, 255, 0.7)' }} > Commerce </Button>
                </div>
                <div>
                <Button sx={{ color: 'rgba(255, 255, 255, 0.7)' }} > Support </Button>
                </div>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Typography className='pb-5' variant='h6'> Documentation </Typography>
                <div>
                <Button sx={{ color: 'rgba(255, 255, 255, 0.7)' }} > Guides </Button>
                </div>
                <div>
                <Button sx={{ color: 'rgba(255, 255, 255, 0.7)' }} > API Status </Button>
                </div>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Typography className='pb-5' variant='h6'> Legal </Typography>
                <div>
                <Button sx={{ color: 'rgba(255, 255, 255, 0.7)' }} > Privacy </Button>
                </div>
                <div>
                <Button sx={{ color: 'rgba(255, 255, 255, 0.7)' }} > Claim </Button>
                </div>
                <div>
                <Button sx={{ color: 'rgba(255, 255, 255, 0.7)' }} > Terms </Button>
                </div>
            </Grid>
            <Grid className='pt-20' item xs={12}>
                <Typography variant='body2' component='p' align='center'>
                    &copy; 2024 Khai - Hien. All rights reserved.
                </Typography>
            </Grid>
        </Grid>
    </div>
  )
}

export default Footer
