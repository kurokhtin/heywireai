import React, { useState, useEffect } from 'react'
import useDidMountEffect from 'components/parts/useDidMountEffect'
import api from 'components/utils/api'
import Header from 'components/Header'
import Footer from 'components/Footer'

export default function App(){
    const [data , setData] = useState({
        response: null
    })

    useDidMountEffect(() => {
        // getNews()
    }, [])

    const getNews = props => {
         api.get('/api/hello')
            .then(response => {
                console.log(response)
            })
            .catch(error => {
               console.log(error);
            });
    }

    return (
        <main className="wrap dashboard">
            <Header />
            <section className="profile page">
                <div className="profile_wrapper">
                    <div className="profile_sticky_wrapper">
                        <div className="my_profile">
                            <div className="profile_header">
                                <h1 className="page_title">Original stories</h1>
                            </div>
                            <hr />
                        </div>
                    </div>
                </div>
                
                <div className="my_projects">
                    <div className="profile_sticky_wrapper">
                        <div className="profile_header">
                            <h1 className="page_title">Generated stories</h1>
                        </div>
                        <hr />
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}