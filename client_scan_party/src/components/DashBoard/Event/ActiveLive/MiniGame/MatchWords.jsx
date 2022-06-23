import { Box, Button, Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import eventService from '../../eventService';
import foul from '../../../../../assets/images/foul.png';

const arrayWord = ["Đẹp trai", "Vui vẻ", "Xinh gái", "Âu cơ", "cha con", "Vật dụng", "Bài bạc", "Trứng cút", "Thương mại", "Sùn sùi"]

function MatchWords({ setShowPopupMiniGame }) {
    const [randomWord, setRandomWord] = useState();

    useEffect(() => {
        getRandom()
    }, [])

    function getRandom() {
        const randomWord = arrayWord[Math.floor(Math.random() * (arrayWord.length - 0) + 0)];
        setRandomWord(randomWord)
    }

    return (
        <Box>
            <Grid container justifyContent="center" alignItems="center" style={{ position: 'relative' }}>
                <img src={foul} style={{ width: '32px', height: '32px' }} />
                <Typography variant="h5" >Nối từ</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setShowPopupMiniGame(true)}
                    style={{ height: '20px', position: "absolute", right: '0' }}
                >
                    Change
                </Button>
            </Grid>
            <Box style={{ textAlign: 'center' }}>
                <Typography variant="h5" >Từ bắt đầu: {randomWord}</Typography>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => getRandom()}
                >
                    Từ mới
                </Button>
            </Box>
        </Box >
    )
}

export default MatchWords;