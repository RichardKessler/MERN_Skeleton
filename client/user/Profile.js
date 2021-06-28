import React, { useEffect, useState } from 'react'
import { read } from './api-user'


export default function Profile({ match }) {
    const classes = useStyles()
    const [user, setUser] = useState({})
    const [redirectToSignin, setRedirectToSignin] = useState(false)
    const jwt = auth.isAuthenticated()

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        read({
            userId: match.params.userId
        }, {t: jwt.token}, signal).then((data) => {
            if (data && data.error) {
                setRedirectToSignin(true)
            } else {
                setUser(data)
            }
        })

        return function cleanup() {
            abortController.abort()
        }

    }, [match.params.userId])

    if (redirectToSignin) {
        return <Redirect to='/signin/'/>
    }
    return (
        <Paper className={classes.root} elevation={4}>
            <Typography varian="h6" className={classes.title}>
                Profile
            </Typography>
            <List dense>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <Person/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={user.name} secondary={user.email}/>
                </ListItem>
                <Divider/>
                <ListItem>
                    <ListItemText primary={"Joined: " + (
                        new Date(user.created)).toDateString()}/>
                </ListItem>
            </List>
        </Paper>
    )
}