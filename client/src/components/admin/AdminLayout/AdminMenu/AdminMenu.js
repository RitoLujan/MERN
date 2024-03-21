import React from 'react';
import { Menu, Icon, MenuItem } from 'semantic-ui-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from "../../../../hooks";
import "./AdminMenu.scss";

export function AdminMenu() {
    const pathname = useLocation();
    const { 
        user: { role }, 
    } = useAuth();
    const isAdmin = role === "admin";
    const isCurrentPath = (path) => {
        if (path === pathname) return true;
        return false;
    };

  return (
    <Menu fluid vertical icon text className='admin-menu'>
        { isAdmin && (
            <>
                <MenuItem as={Link} to="/admin/users" active={isCurrentPath("/admin/users")}>
                    <Icon name='user outline' />
                    Usuario
                </MenuItem>

                <MenuItem as={Link} to="/admin/menu" active={isCurrentPath("/admin/menu")}>
                    <Icon name='bars' />
                    Menu
                </MenuItem>

                <MenuItem as={Link} to="/admin/courses" active={isCurrentPath("/admin/courses")}>
                    <Icon name='computer' />
                    Cursos
                </MenuItem>

                <MenuItem as={Link} to="/admin/newsletter" active={isCurrentPath("/admin/newsletter")}>
                    <Icon name='mail' />
                    Newsletter
                </MenuItem>
            </>
        )}
        <MenuItem as={Link} to="/admin/blog" active={isCurrentPath("/admin/blog")}>
            <Icon name='comment alternate outline' />
            Blog
        </MenuItem>
    </Menu>
  )
}
