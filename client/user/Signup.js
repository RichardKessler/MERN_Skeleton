import React from 'react'
import Card from '@material-ui/core/Card'
import { CardActions, Button, Icon } from '@material-ui/core'
import { CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from "@material-ui/core"
import { create } from "./api-user.js"
import { Link } from 'react-router-dom'


export default function Signup() {
    const classes = useStyles()
    const [values, setValues] = useState({
        name: '',
        password: '',
        email: '',
        open: false,
        error: ''
    })

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    const clickSubmit = () => {
        const user = {
            name: values.name || undefined,
            email: values.email || undefined,
            password: values.password || undefined
        }
        create(user).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error})
            } else {
                setValues({ ...values, error: '', open: true})
            }
        })
    }

    return (
        <div>
            <Card className={classes.card}>
                <CardContent>
                    <Typography varient="h6" className={classes.title}>
                        Sign Up
                    </Typography>
                    <TextField id="name" label="Name" className={classes.textField} value={values.name} onchange={handleChange('name')} margin="normal"/>
                    <br/>
                    <TextField id="email" type="email" label="Email" className={classes.textField} value={values.email} onchange={handleChange('email')} margin="normal"/>
                    <br/>
                    <TextField id="password" type="password" label="Password" className={classes.textField} value={values.password} onChange={handleChange('password')} margin="normal"/>
                    <br/> {
                        values.error && (<Typography component="p" color="error">
                            <Icon color="error" className={classes.error}>error</Icon>
                            {values.error}
                        </Typography>)
                    }
                </CardContent>
                <CardActions>
                    <Button color="primary" varient="contained" onClick={clickSubmit} className={classes.submit}>Submit</Button>
                </CardActions>
            </Card>
            <Dialog open={values.open} disableBackdropClick={true}>
                <DialogTitle>New Account</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        New account successfully created.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Link to="/signin">
                        <Button color="primary" autoFocus="autoFocus" varient="contained">
                            Sign In
                        </Button>
                    </Link>
                </DialogActions>
            </Dialog>
        </div>
    )
}