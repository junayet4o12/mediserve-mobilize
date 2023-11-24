/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, CardActionArea, CardActions, TextField } from '@mui/material';
import './PopularCamp.css'
import { Link } from 'react-router-dom';
import PinDropIcon from '@mui/icons-material/PinDrop';
import { PhotoProvider, PhotoView } from 'react-photo-view';

const CampCard = ({ camp }) => {
    const { description, image, _id, campName, campFees, DateAndTime, venueLocation, specializedService, healthcareExpert, targetAudience, participators } = camp

    const timeForm = (time) => {
        return new Date(time)
    }
    // + 31536000000
    const formattedDate = timeForm(DateAndTime?.date).toLocaleDateString("en-US", { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });

    const startTime = timeForm(DateAndTime?.startTime).toLocaleTimeString("en-US", { hour: 'numeric', minute: 'numeric', hour12: true });

    const endTime = timeForm(DateAndTime?.endTime).toLocaleTimeString("en-US", { hour: 'numeric', minute: 'numeric', hour12: true });

    return (
        <div>
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <Box sx={{ position: 'relative', maxHeight: '230px', overflow: 'hidden' }}>
                        <PhotoProvider >
                            <PhotoView src={image}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={image}
                                    alt="green iguana"
                                />
                            </PhotoView>
                        </PhotoProvider>
                        <Box sx={{ position: 'absolute', width: '100%', bottom: '0px' }}>
                            <Typography sx={{ fontWeight: 'bold', background: '#00000098', color: '#7cdcf7', px: '10px', py: '5px' }}>
                                {formattedDate}
                                <Typography variant='p' sx={{ fontWeight: '500', fontSize: '13px', ml: '4px' }}>
                                    ({startTime} to {endTime})
                                </Typography>
                                <Typography variant='body2'>
                                    <PinDropIcon style={{ fontSize: '20px' }}></PinDropIcon>{venueLocation?.placeName}
                                </Typography>
                            </Typography>



                        </Box>
                        <Box sx={{ position: 'absolute', top: '5px', right: '5px', }}>
                            <Typography sx={{ fontWeight: 'bold', background: '#00000098', color: '#7cdcf7', px: '10px', py: '5px', borderRadius: '5px' }}>
                                ${campFees}


                            </Typography>
                        </Box>
                    </Box>

                    <CardContent>
                        <Typography sx={{ whiteSpace: 'nowrap' }} gutterBottom variant="h5" component="div">
                            {campName}
                        </Typography>
                        <Typography sx={{ whiteSpace: 'nowrap', my: '0px' }} gutterBottom variant="h6" component="div">
                            For {targetAudience}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {description.slice(0, 150)}...
                        </Typography>
                        <Typography variant="h6" color="text.secondary" sx={{ marginTop: '10px', fontWeight: 'bold', color: '#0477bf' }}>
                            Participators: {participators}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Link to={`/camp-details/${_id}`}>
                        <Button className='detailsbtn' size="small" color="primary">
                            Details
                        </Button>
                    </Link>
                </CardActions>
            </Card>
        </div>
    );
};

export default CampCard;