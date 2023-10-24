import React, {useContext, useEffect} from 'react';
import {Container} from "react-bootstrap";
import AllUsers from "../components/modals/AllUsers";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchUsers} from "../http/userAPI";
import Pages from "../components/Pages";

const UserPage = observer(() =>
{
    const {user} = useContext(Context)

    useEffect(()=>
    {
        fetchUsers().then(data => {
            user.setUsers(data.rows)
            user.setTotalCount(data.count)
        })
    },[])

    useEffect(() =>{
        fetchUsers(user.page).then(data =>
        {
            user.setUsers(data.rows)
            user.setTotalCount(data.count)
        })
    },[user.page])

    return (
        <Container>
            <AllUsers />
            <Pages />
        </Container>
    );
});

export default UserPage;