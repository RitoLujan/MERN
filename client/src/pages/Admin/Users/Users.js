import React, { useState } from 'react';
import { Tab, Button } from 'semantic-ui-react';
import { BasicModal } from "../../../components/Shared";
import { UserForm, ListUsers } from "../../../components/admin/Users";
import "./Users.scss";

export function Users() {
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);
  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const onReload = () => setReload((prevState) => !prevState);
  const panes = [
  {
    menuItem: "Usuarios activos",
    render: () => {
      return (
        <Tab.Pane attached={false}>
          <ListUsers userActive={true} reload={reload} onReload={onReload}/>
        </Tab.Pane>
      );
    },
  },
  {
    menuItem: "Usuarios inactivos",
    render: () => {
      return (
        <Tab.Pane attached={false}>
          <ListUsers userActive={false} reload={reload} onReload={onReload}/>
        </Tab.Pane>
      );
    },
  },
];


  return (
    <>
      <div className='users-page'>
        <Button className='users-page__add' primary onClick={onOpenCloseModal}>
          Nuevo usuario
        </Button>
        <Tab menu={{ secondary: true }} panes={panes} />
      </div>
      <BasicModal show={showModal} close={onOpenCloseModal} title="Crear un nuevo usuario">
        <UserForm close={onOpenCloseModal} onReload={onReload}/>
      </BasicModal>
    </>
  )
}
