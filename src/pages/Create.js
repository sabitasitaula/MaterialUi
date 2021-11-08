import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import ButtonGroup from '@material-ui/core/ButtonGroup';
import Container from '@material-ui/core/Container';
// import AcUnitOutlinedIcon from '@material-ui/icons/AcUnitOutlined';
// import CancelScheduleSendIcon from '@material-ui/icons/CancelScheduleSend';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { FormControlLabel } from '@material-ui/core';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import { useHistory } from 'react-router';


const useStyles = makeStyles({
    // btn:{
    //     fontSize:60,
    //     background:'violet',
    //     '&:hover':{
    //         background:'blue'
    //     }
    // },
    // title:{
    //     textDecoration:'underline',
    //     marginBottom:20
    // }

    field: {
        marginTop: 20,
        marginBottom: 20,
        display: 'block'
    }
})

function Create() {
    const classes = useStyles()
    const history=useHistory()
    const [title, setTitle] = useState('')
    const [details, setDetails] = useState('')
    const [titleError, setTitleError] = useState(false)
    const [detailsError, setDetailsError] = useState(false)
    const [category, setCategory] = useState('money')

    const handleSubmit = (e) => {
        e.preventDefault()

        setTitleError(false)
        setDetailsError(false)

        if (title == '') {
            setTitleError(true)
        }
        if (details == '') {
            setDetailsError(true)
        }

        if (title && details) {
            fetch('http://localhost:8000/notes',{
                method:"POSt",
                headers:{"content-type":"application/json"},
                body:JSON.stringify({title,details,category})
            }).then(()=>history.push('/'))
        }

        setTitle('');
        setDetails('');
    }

    return (
        <Container>
            <Typography className={classes.title} variant="h6"
                color="textSecondary" component="h1" gutterBottom>
                Create a new Note
            </Typography>

            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={classes.field}
                    label="Note Title"
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    required
                    error={titleError}
                />

                <TextField
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    className={classes.field}
                    label="Details"
                    variant="outlined"
                    color="secondary"
                    multiline
                    rows={4}
                    fullWidth
                    required
                    error={detailsError}
                />

                <FormControl className={classes.field}>
                    <FormLabel>Select Your Note</FormLabel>
                    <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
                        <FormControlLabel value="money" control={<Radio />} label="Money" />
                        <FormControlLabel value="todos" control={<Radio />} label="Todos" />
                        <FormControlLabel value="reminders" control={<Radio />} label="Reminders" />
                        <FormControlLabel value="works" control={<Radio />} label="Works" />
                    </RadioGroup>
                </FormControl>

                <Button
                    className={classes.btn} type="submit" color="secondary" variant="contained" endIcon={<KeyboardArrowRightIcon />}>
                    Submit
                </Button>
            </form>

            {/* <Button type="submit" color="primary" variant="contained">
                Submit
            </Button>
            <Button type="submit" variant="outlined" startIcon={<CancelScheduleSendIcon />} color="secondary">
                Submit
            </Button> */}

            {/* <Button type="submit" color="secondary" variant="contained" disableElevation onClick={()=> console.log("You clicked me")}>
                Submit
            </Button><br /><br/><br/> */}

            {/* <ButtonGroup variant="contained" color="success">
                <Button>
                    One
                </Button>
                <Button>
                    Two
                </Button>
                <Button>
                    Three
                </Button>
            </ButtonGroup> */}
            {/* <AcUnitOutlinedIcon color="primary" fontSize="small" /> */}
            {/* <AcUnitOutlinedIcon /> */}
            {/* <AcUnitOutlinedIcon color="secondary" fontSize="large" /> */}



        </Container>
    )
}

export default Create
