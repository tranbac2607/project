import { Paper } from '@material-ui/core';
import React from 'react';
import Lucky from './Lucky';
import MatchWords from './MatchWords';

function MiniGame({ gameId, setShowPopupMiniGame }) {
    return (
        <>
            <Paper elevation={3} className="m-1 p-1">
                {gameId === 1 ? <Lucky setShowPopupMiniGame={setShowPopupMiniGame}/> : <MatchWords setShowPopupMiniGame={setShowPopupMiniGame}/>}
            </Paper>
        </>
    )
}

export default MiniGame;