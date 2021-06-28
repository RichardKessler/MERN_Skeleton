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

    
}