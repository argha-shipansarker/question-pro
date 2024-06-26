import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  // createBrowserRouter,
  // RouterProvider,
  // createRoutesFromElements,
  Route,
  BrowserRouter,
  Routes
} from "react-router-dom";
import Layout from "./Layout.tsx"
import Home from './components/Home/Home.tsx';
import DashboardLayout from './components/Dashboard/DashboardLayout.tsx';
import Posts from './components/Dashboard/Post.tsx';
// import App from './App.tsx'
import './index.css'
import AppProvider from './store/AppContext.tsx';
import User from './components/User/User.tsx';
import MyComponent from './components/MyComponent/MyComponent.tsx';
import Comments from './components/Dashboard/Comments.tsx';
import Button from './ReusableComponents/Button.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='user' element={<User />} />
            <Route path='component'
              element={
                <MyComponent>
                  <div style={{ display: "flex", columnGap: "14px", alignItems: "center", userSelect: "none" }}>
                    <div>this is a div</div>
                    <Button style={{ backgroundColor: "green", color: "white" }}>button Active</Button>
                    <Button style={{ backgroundColor: "red", color: "white" }}>button Inactive</Button>
                  </div>
                </MyComponent>
              }
            />
            <Route path="dashboard/*" element={<DashboardLayout />}>
              <Route path="posts" element={<Posts />} />
              <Route path="comments" element={<Comments />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  </React.StrictMode>,
)
