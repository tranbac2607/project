import { Box, Paper, Typography, makeStyles, Grid, Link } from '@material-ui/core';
import React from 'react';
import { FileText, Download } from 'react-feather';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: theme.spacing(2),
        padding: theme.spacing(2),
        '&:hover': {
            cursor: 'pointer'
        }
    },
    info: {
        display: 'flex',
        alignItems: 'center'
    },
    name: {
        fontWeight: '500',
    },
    icon: {
        fontSize: 64,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}));

export default function StoreItem({ data }) {
    const classes = useStyles();

    return (
        <Paper elevation={9} className={classes.root}>
            <Grid container>
                <Grid item xs={3} lg={1} className={classes.icon}>
                    <FileText size={64} />
                </Grid>
                <Grid item xs={3} lg={10} className={classes.info}>
                    <Box>
                        <Typography variant="h5" className={classes.name}>
                            {data?.name}
                        </Typography>
                        <Typography component="subtitle1" >
                            {moment(data?.dateCreated).format('DD/MM/YYYY HH:mm')}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={1} lg={1} className={classes.icon}>
                    <Link href={data.path} target="_blank"><Download size={32} /></Link>
                </Grid>
            </Grid>
        </Paper>
    )
}