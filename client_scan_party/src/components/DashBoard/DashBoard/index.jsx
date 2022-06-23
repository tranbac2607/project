import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    makeStyles,
    Paper,
    Typography,
    Grid,
    List,
    ListItem,
    ListItemText,
} from '@material-ui/core';
import React, { useState } from 'react';
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
    },
    titleHeader: {
        fontSize: 24
    },
    listEvent: {
        width: '100%',
        padding: theme.spacing(3),
        marginTop: theme.spacing(3)
    }
}));

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }

function DashBoard() {
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('user'));
    return (
        <Box>
            <Paper className="p-1 m-1 h-100 w-100 flex-justify-content-center-align-items-center">
                <Typography variant="h5" align="center">Welcome back {user.lastName} {user.firstName}</Typography>
                <Grid container spacing={2}>
                    <Grid item xs="4">
                        <Card>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image="/static/images/cards/contemplative-reptile.jpg"
                                    title="Contemplative Reptile"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Tin nhắn
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Bạn có 12 tin nhắn mới
                                    </Typography>
                                    <List component="nav" aria-label="secondary mailbox folders">
                                        <ListItem button>
                                            <ListItemText primary="Trash" />
                                        </ListItem>
                                        <ListItemLink href="#simple-list">
                                            <ListItemText primary="Spam" />
                                        </ListItemLink>
                                    </List>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item xs="4">
                        <Card className={classes.root}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image="/static/images/cards/contemplative-reptile.jpg"
                                    title="Contemplative Reptile"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Đánh giá
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p" align="center">
                                        Điểm đánh giá trung bình
                                        </Typography>
                                    <Rating
                                        name="averageRating"
                                        value={1}
                                        size="large"
                                        readOnly
                                        className="flex-justify-content-center"
                                    />
                                    <Typography>
                                        Bạn có 12 đánh giá mới
                                    </Typography>
                                    <List component="nav" aria-label="secondary mailbox folders">
                                        <ListItem button>
                                            <ListItemText primary="Trash" />
                                        </ListItem>
                                        <ListItemLink href="#simple-list">
                                            <ListItemText primary="Spam" />
                                        </ListItemLink>
                                    </List>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item xs="4">
                        <Card className={classes.root}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image="/static/images/cards/contemplative-reptile.jpg"
                                    title="Contemplative Reptile"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Nhắc nhở
                            </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Sự kiện a sẽ bắt đầu trong 2 tiếng nữa
                            </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>
            </Paper>
        </Box >
    )
}

export default DashBoard;