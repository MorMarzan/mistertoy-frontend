import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import './assets/style/main.scss'

import { store } from './store/store'
import { UserMsg } from './cmps/UserMsg.jsx'
import { ToyIndex } from './pages/ToyIndex.jsx'
import { ToyDetails } from './pages/ToyDetails.jsx'
import { ToyEdit } from './cmps/ToyEdit.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { Dashboard } from './pages/Dashboard.jsx'


export function App() {

    return (
        <Provider store={store}>
            <Router>
                <section className="main-layout app">
                    <AppHeader />
                    <main className="main-layout full app">
                        <Routes>
                            <Route element={<HomePage />} path="/" />
                            <Route element={<AboutUs />} path="/about" />
                            <Route element={<Dashboard />} path="/dashboard" />
                            <Route element={<ToyIndex />} path="/toy" />
                            <Route element={<ToyDetails />} path="/toy/:toyId" />
                            <Route element={<ToyEdit />} path="/toy/edit" />
                            <Route element={<ToyEdit />} path="/toy/edit/:toyId" />
                        </Routes>
                    </main>
                    <AppFooter />
                    <UserMsg />
                </section>
            </Router>
        </Provider>
    )
}


