import React from 'react';
import { Routes, Route } from "react-router-dom";
import { ClientLayout } from "../layouts";
import { Home, Contact, Blog, Courses, Post } from "../pages/Web";

export function WebRouter() {

  const loadLayout = (Layout, Page) => {
    return (
        <Layout>
            <Page />
        </Layout>
    );
  };

  return (
    <Routes>
        <Route path='/' element={loadLayout(ClientLayout, Home)} />
        <Route path='/contact' element={loadLayout(ClientLayout, Contact)} />
        <Route path='/blog' element={loadLayout(ClientLayout, Blog)} />
        <Route path='/courses' element={loadLayout(ClientLayout, Courses)} />
        <Route path='/blog/:path' element={loadLayout(ClientLayout, Post)} />
    </Routes>
  )
}
