/* eslint-disable react/prop-types */
// import React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';


import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WhereToVoteIcon from '@mui/icons-material/WhereToVote';
import { useContext, useState } from 'react';
import { Box, Button, Modal } from '@mui/material';
import ModeStandbyIcon from '@mui/icons-material/ModeStandby';
import Swal from 'sweetalert2';
import { AuthContext } from '../../firebase/authProvider/AuthProviders';
import RegistrationModal from '../CampDetails/RegistrationModal';
import { Link } from 'react-router-dom';
import './AvailableCamps.css'
import useOrganizers from '../../hooks/useOrganizers';
import { motion } from "framer-motion"
import { PhotoProvider, PhotoView } from "react-photo-view";
const ExpandMore = styled((props) => {
    const { ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));
const AvailableCampsCard = ({ camp, idx }) => {
    const { user } = useContext(AuthContext)
    const [isOrganizer] = useOrganizers()
    const { _id, description, image, campName, campFees, DateAndTime, venueLocation, targetAudience, benefits, specializedService } = camp

    const [expanded, setExpanded] = useState(false);
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        if (!user) {
            return Swal.fire({
                title: 'Error!',
                text: 'Please Log in First',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
        setOpen(true)
    };
    const handleClose = () => {
        setOpen(false)
    };
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const timeForm = (time) => {
        return new Date(time)
    }

    // + 31536000000
    const formattedDate = timeForm(DateAndTime?.date).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' });

    const startTime = timeForm(DateAndTime?.startTime).toLocaleTimeString("en-US", { hour: 'numeric', minute: 'numeric', hour12: true });

    const endTime = timeForm(DateAndTime?.endTime).toLocaleTimeString("en-US", { hour: 'numeric', minute: 'numeric', hour12: true });
    return (
        <div>
            <motion.div initial={{ x: ((idx + 1) % 2 ? 100 : -100) }}
                whileInView={{ x: 0 }}
                transition={{ duration: 0.7 }} className='overflow-hidden'>
                <Card sx={{ maxWidth: 340, mb: '10px', pb: '0px', }}>

                    <Typography sx={{ fontSize: '19px', ml: '15px', fontWeight: 'bold', mb: '5px', mt: '5px', pt: '0px', color: '#0f7be7' }}>
                        {campName}
                    </Typography>
                    <Typography sx={{ fontSize: '14px', ml: '15px', fontWeight: 'bold', mb: '10px', mt: '0px', pt: '0px' }}>
                        {formattedDate} ({startTime} to {endTime})
                    </Typography>
                    <Box sx={{ position: 'relative', }}>
                        <Box sx={{ width: '100%', height: '200px', overflow: 'hidden' }}>
                            <PhotoProvider>
                                <PhotoView src={image}>
                                    <CardMedia
                                        sx={{ cursor: 'pointer' }}
                                        component="img"

                                        image={image}
                                        alt="Paella dish"
                                    />
                                </PhotoView>
                            </PhotoProvider>
                        </Box>
                        <Box sx={{ position: 'absolute', top: '10px', right: '10px', }}>
                            <Typography sx={{ fontWeight: 'bold', background: '#00000098', fontSize: '18px', color: '#7cdcf7', px: '13px', py: '5px', borderRadius: '7px' }}>
                                ${campFees}


                            </Typography>
                        </Box>
                    </Box>
                    <CardContent>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '18px', color: '#0f7be7 ', pb: '5px' }}>
                            {specializedService}
                        </Typography>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '14px', color: '#0f7be7 ', pb: '5px' }}>
                            <ModeStandbyIcon></ModeStandbyIcon> Target Audience:  {targetAudience}
                        </Typography>
                        <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: '#0f7be7 ' }}>
                            <WhereToVoteIcon></WhereToVoteIcon> Location: {venueLocation?.placeName}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                            {description?.slice(0, 130)}...
                        </Typography>
                    </CardContent>

                    <CardActions disableSpacing>
                        <Button sx={{ mr: '10px' }} disabled={isOrganizer} onClick={handleOpen} className='availablejoinbtn'>Join Camp</Button>
                        <Link to={`/camp-details/${camp?._id}`}>
                            <Button onClick={handleOpen} className='availabledetailsbtn'>Details</Button>
                        </Link>
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            {!expanded ? <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>Click Here</Typography> : ''}    <ExpandMoreIcon />
                        </ExpandMore>
                    </CardActions>
                    <Collapse sx={{ background: 'lightblue' }} in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography sx={{ color: '#2e4c87', fontWeight: 'bold', fontSize: '20px', py: '10px', textAlign: 'center' }}>
                                {campName} ({specializedService})
                            </Typography>
                            <Typography paragraph sx={{ fontWeight: '600', fontSize: '14.5px' }}>
                                {description}
                            </Typography>
                            <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>Some Benefits:</Typography>
                            <Typography paragraph>
                                {
                                    benefits?.map((benefit, idx) => <p className='font-semibold ' key={idx}>{idx + 1}. {benefit} </p>)
                                }
                            </Typography>

                        </CardContent>
                    </Collapse>
                </Card>

                <RegistrationModal camp={camp} handleOpen={handleOpen} handleClose={handleClose} id={_id} open={open}></RegistrationModal>
            </motion.div>
        </div>
    );
};

export default AvailableCampsCard;