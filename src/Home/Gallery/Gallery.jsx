// import React from 'react';
import { Box, ImageListItemBar } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import Title from '../../Components/Title/Title';
const Gallery = () => {


    const itemData = [
        {
          img: 'https://i.ibb.co/6b2bWp9/bestbehaviour.jpg',
          title: 'Kindness Counts',
          author: 'Dr. Empathy',
        },
        {
          img: 'https://i.ibb.co/LRQwwp0/best-Doctors.jpg',
          title: 'Expert Healers',
          author: 'Dr. Wisdom',
        },
        {
          img: 'https://i.ibb.co/6P16Hv4/goodfood.jpg',
          title: 'Healthy Bites',
          author: 'Nutri Chef',
        },
        {
          img: 'https://i.ibb.co/qBjpLBs/goodmedicine-quality.jpg',
          title: 'Quality Care',
          author: 'Dr. Excellence',
        },
        {
          img: 'https://i.ibb.co/5KgYm7f/increaserateofclient.jpg',
          title: 'Client Boost',
          author: 'Dr. Impact',
        },
        {
          img: 'https://i.ibb.co/zRPzcf4/operation-equivement.jpg',
          title: 'Equip & Operate',
          author: 'Dr. Precision',
        },
        {
          img: 'https://i.ibb.co/YkRgS2M/operation.jpg',
          title: 'Life-Changing Ops',
          author: 'Dr. Transformation',
        },
        {
          img: 'https://i.ibb.co/jVQ1FBD/operationroom.jpg',
          title: 'Surgical Suite',
          author: 'Dr. Surgery',
        },
        {
          img: 'https://i.ibb.co/mC0jypj/patientroom.jpg',
          title: 'Patient Haven',
          author: 'Nurse Comfort',
        },
        {
          img: 'https://i.ibb.co/61nZbbZ/seniordoctor.jpg',
          title: 'Senior Care',
          author: 'Dr. Seniority',
        },
        {
          img: 'https://i.ibb.co/Zm8VsKb/singleachievment.jpg',
          title: 'Solo Success',
          author: 'Dr. Solo',
        },
        {
          img: 'https://i.ibb.co/7CHPYXH/teamconference.jpg',
          title: 'Team Talks',
          author: 'Dr. Collaboration',
        },
      ];

    return (
        <div className='bg-blue-50'>
            <Title title={'Our Gallery'} desc={'Healing Moments Gallery'}></Title>
            <Box sx={{ width: '80%', mx: 'auto', height: 500, overflowY: 'scroll' }}>
                <ImageList variant="masonry" cols={2} gap={8}>
                    {itemData.map((item) => (
                        <ImageListItem key={item.img}>

                            <PhotoProvider>
                                <PhotoView src={item?.img}>
                                    <img className='cursor-pointer'
                                        srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                        src={`${item.img}?w=248&fit=crop&auto=format`}
                                        alt={item.title}
                                        loading="lazy"
                                    />
                                </PhotoView>
                            </PhotoProvider>
                            <ImageListItemBar sx={{fontWeight: 'bold'}} position="below" title={item.title} />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Box>
        </div >
    );
};

export default Gallery;