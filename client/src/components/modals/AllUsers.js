import React, {useContext} from 'react';
import {Table} from "react-bootstrap";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const AllUsers = observer(() =>
{
    const {user} = useContext(Context)

    return (
        <Table striped bordered hover size="sm" variant='dark' className="m-md-2" >
            <thead>
            <tr>
                <th data-field="id">ID</th>
                <th data-field="email">Email</th>
                <th data-field="role">Role</th>
            </tr>
            </thead>
            <tbody>
            {user.users.map(user =>
                <tr
                    key={user.id}
                >
                    <td> {user.id}</td>
                    <td> {user.email}</td>
                    <td> {user.role}</td>
                </tr>
            )}
            </tbody>
        </Table>
    );
});

export default AllUsers;