import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import './assets/style/main.css'

// const Router = ReactRouterDOM.BrowserRouter
// const { Route, Routes } = ReactRouterDOM
// const { Provider } = ReactRedux

// import { AppHeader } from './cmps/AppHeader'
// import { AppFooter } from './cmps/AppFooter'

// import { HomePage } from './pages/HomePage'
// import { AboutUs } from './pages/AboutUs'
import { ToyIndex } from './pages/ToyIndex.jsx'
import { store } from './store/store'
import { UserMsg } from './cmps/UserMsg.jsx'
// import { ToyDetails } from './pages/ToyDetails.jsx'
import { toyService } from './services/toy.service.js'
import { ToyDetails } from './pages/ToyDetails.jsx'
import { ToyEdit } from './cmps/ToyEdit.jsx'


export function App() {

    return (
        <Provider store={store}>
            <Router>
                <section className="main-layout app">
                    {/* <AppHeader /> */}
                    <main>
                        <Routes>
                            {/* <Route element={<HomePage />} path="/" /> */}
                            {/* <Route element={<AboutUs />} path="/about" /> */}
                            <Route element={<ToyIndex />} path="/toy" />
                            <Route element={<ToyDetails />} path="/toy/:toyId" />
                            <Route element={<ToyEdit />} path="/toy/edit" />
                            <Route element={<ToyEdit />} path="/toy/edit/:toyId" />
                        </Routes>
                    </main>
                    {/* <AppFooter /> */}
                    <UserMsg />
                </section>
            </Router>
        </Provider>
    )
}


