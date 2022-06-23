import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step4 from "./Step4";
import Step3 from "./Step3";
import eventService from "../eventService";
import { toast } from "react-toastify";
import moment from "moment";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: "relative",
    },
    layout: {
        width: "auto",
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: "auto",
            marginLeft: theme.spacing(2),
            marginRight: theme.spacing(2),
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            padding: theme.spacing(3),
        },
    },

    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: "flex",
        justifyContent: "flex-end",
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));



export default function EnterValue({ setShowEnterForm, fetchData }) {
    const { t } = useTranslation();
    const classes = useStyles();
    const { email } = JSON.parse(localStorage.getItem('user'));
    const [activeStep, setActiveStep] = React.useState(0);
    const [valueStep1, setValueStep1] = React.useState({
        beginTime: moment().format('YYYY-MM-DDTHH:mm'),
        endTime: moment().format('YYYY-MM-DDTHH:mm'),
        name: 'Chào đón tân sinh viên',
        address: 'Trường Đại học Bách Khoa Hà Nội',
        company: 'Trường Đại học Bách Khoa Hà Nội',
        manager: 'Trần Văn Bắc',
        email: 'tranbac2607@gmail.com',
        phoneNumber: '0396642607',
        facebook: 'facebook.com/BC3107',
        description: 'Sự kiện chào đón tân sinh viên, nằm trong chuỗi sự kiện của trường Bách Khoa Hà Nội...'
    });
    const [valueStep2, setValueStep2] = React.useState([]);
    const [valueStep3, setValueStep3] = React.useState();
    const [infoExcel, setInfoExcel] = React.useState();

    const steps = [
        t('event_info'),
        t('guest_info'),
        t('create_ticket'),
        t('check')
    ];

    const handleNext = () => {
        setActiveStep(activeStep + 1);
        if (activeStep === 3) {
            createEvent();
        }
        window.scrollTo(0, 0);
    };

    async function createEvent() {
        const data = {
            eventInfo: {
                name: valueStep1.name,
                address: valueStep1.address,
                company: valueStep1.company,
                time: {
                    beginTime: valueStep1.beginTime,
                    endTime: valueStep1.endTime,
                    date: valueStep1.beginTime,
                },
                manager: {
                    name: valueStep1.manager,
                    email: valueStep1.email,
                    phoneNumber: valueStep1.phoneNumber,
                    facebook: valueStep1.facebook,
                },
                description: valueStep1.description,
                isAcceptGuestJoin: valueStep1.isAcceptGuestJoin,
                owner: email
            },
            guestInfo: [...valueStep2],
            ticketTemplateInfo: {
                type: valueStep3,
                effectiveDate: 14,
            },

        };
        try {
            const res = await eventService.createEvent(data);
            if (res) {
                toast(t(res.message));
            }
            setShowEnterForm(false);
            fetchData()
            setActiveStep(0);
        } catch (error) {
            toast(t(error.response.data.message));
        }
    }

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    function handleSubmitStep1(data) {
        setValueStep1(data);
        handleNext();
    }

    function handleSubmitStep2(data, item) {
        setValueStep2(data || []);
        setInfoExcel(item);
    }

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <Step1 handleSubmit={handleSubmitStep1} data={valueStep1} />;
            case 1:
                return (
                    <Step2
                        dataStep2={valueStep2}
                        handleUpload={handleSubmitStep2}
                        infoExcel={infoExcel}
                    />
                );
            case 2:
                return (
                    <Step3
                        dataStep1={valueStep1}
                        dataStep2={valueStep2}
                        dataStep3={valueStep3}
                        setDataSet3={setValueStep3}
                    />
                );
            case 3:
                return (
                    <Step4
                        dataStep1={valueStep1}
                        dataStep2={valueStep2}
                        dataStep3={valueStep3}
                        infoExcel={infoExcel}
                    />
                );
            default:
                throw new Error("Unknown step");
        }
    }

    return (
        <React.Fragment>
            <main className={classes.layout}>
                <Paper elevation={12} className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        {t('add_event')}
                    </Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <React.Fragment>
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography variant="h5" gutterBottom>
                                    {t('add_event_success')}
                                </Typography>
                                <Typography variant="subtitle1">
                                    {t('your_ticket_sent_to_guest')}
                                </Typography>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {getStepContent(activeStep)}
                                <div className={classes.buttons}>
                                    {activeStep !== 0 && (
                                        <Button onClick={handleBack} className={classes.button}>
                                            {t('back')}
                                        </Button>
                                    )}
                                    {activeStep !== 0 && (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleNext}
                                            className={classes.button}
                                        >
                                            {activeStep === steps.length - 1
                                                ? t('create')
                                                : t('next')}
                                        </Button>
                                    )}
                                </div>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                </Paper>
            </main>
        </React.Fragment>
    );
}
