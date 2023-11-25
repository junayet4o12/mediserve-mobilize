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
import './CampDetails.css'
import RegistrationModal from './RegistrationModal';
import { AuthContext } from '../../firebase/authProvider/AuthProviders';
import Swal from 'sweetalert2';
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
const CampDetailsCard = ({ camp }) => {
    const { user } = useContext(AuthContext)
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
        console.log('hello');
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
        <div className=''>
            <Card sx={{ maxWidth: 600 }}>
                <CardHeader sx={{ color: '#08539f' }}


                    title={campName}

                    subheader={`${formattedDate} (${startTime} to ${endTime})`}
                />
                <Box sx={{ position: 'relative' }}>
                    <CardMedia
                        component="img"
                        height="194"
                        image={image}
                        alt="Paella dish"
                    />
                    <Box sx={{ position: 'absolute', top: '20px', right: '20px', }}>
                        <Typography sx={{ fontWeight: 'bold', background: '#00000098', fontSize: '20px', color: '#7cdcf7', px: '15px', py: '5px', borderRadius: '7px' }}>
                            ${campFees}


                        </Typography>
                    </Box>
                </Box>
                <CardContent>
                    <Typography sx={{ fontWeight: 'bold', fontSize: '20px', color: '#0f7be7 ', pb: '10px' }}>
                        {specializedService}
                    </Typography>
                    <Typography sx={{ fontWeight: 'bold', fontSize: '20px', color: '#0f7be7 ', pb: '10px' }}>
                        <ModeStandbyIcon></ModeStandbyIcon> Target Audience:  {targetAudience}
                    </Typography>
                    <Typography sx={{ fontWeight: 'bold', color: '#0f7be7 ' }}>
                        <WhereToVoteIcon></WhereToVoteIcon> Location: {venueLocation?.placeName}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>

                <CardActions disableSpacing>
                    <Button onClick={handleOpen} className='joinbtn'>Join Camp</Button>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        {!expanded ? 'Click Here' : ''}    <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse sx={{ background: 'lightblue' }} in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography sx={{ color: '#2e4c87', fontWeight: 'bold', fontSize: '24px', py: '10px', textAlign: 'center' }}>
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
        </div>
    );
};

export default CampDetailsCard;