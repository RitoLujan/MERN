import React, { useState, useEffect } from 'react';
import { Loader } from 'semantic-ui-react';
import { map, size } from 'lodash';
import { User } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { UserItem } from "../UserItem";

const userController = new User();

export function ListUsers(props) {
    const { userActive, reload, onReload  } = props;
    const [ users, setUsers ] = useState(null);
    const { accessToken } = useAuth();

    useEffect(() => {
        (async () => {
            try {
                setUsers(null);
                const response = await userController.getUsers(accessToken, userActive);
                setUsers(response);
            } catch (error) {
                console.error(error);
            }
        })()
    }, [userActive, reload]);

    if(!users) return <Loader active inline="centered" />
    if(size(users) === 0) return "No hay ningun usuario";

  return map(users, (user) => <UserItem key={user._id} user={user} onReload={onReload} />);
}
