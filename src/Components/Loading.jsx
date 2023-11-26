// import React from 'react';

import { Box, CircularProgress } from "@mui/material";

const Loading = () => {
    return (
        <div className="h-max w-max mx-auto mt-20">
            <Box sx={{ position: 'relative' }}>
                <CircularProgress
                    variant="determinate"
                    sx={{
                        color: 'gray'
                    }}
                    size={40}
                    thickness={4}
                    value={100}
                />
                <CircularProgress
                    variant="indeterminate"
                    disableShrink
                    sx={{
                        color: 'blue',
                        animationDuration: '550ms',
                        position: 'absolute',
                        left: 0,
                        
                    }}
                    size={40}
                    thickness={4}
                />
            </Box>
        </div>
    );
};

export default Loading;