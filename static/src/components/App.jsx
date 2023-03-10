import React, { useState, useEffect } from 'react'
import useDidMountEffect from 'components/parts/useDidMountEffect'
import api from 'components/utils/api'
import Header from 'components/Header'
import Footer from 'components/Footer'
import Filters from 'components/dashboard/Filters'
import PostsListSkeleton from 'components/parts/PostsListSkeleton'
import PostsItem from 'components/parts/PostsItem'
import NoProjects from 'components/parts/NoProjects'
import BrainIcon from 'components/icons/BrainIcon'
import GlobeIcon from 'components/icons/GlobeIcon'
import 'react-loading-skeleton/dist/skeleton.css'

export default function App(){
    const [data , setData] = useState({
        aylienData: [],
        gptData: [],
        currentType: 'original',
        loading: false,
        finished: true,
        total: 0,
        writing_style: ''
    })

    // const getNews = props => {
    //      api.get('/api/hello')
    //         .then(response => {
    //             console.log(response)
    //         })
    //         .catch(error => {
    //            console.log(error);
    //         });
    // }
    const handleResult = (response) => {
        if(response.status == 200){
            // console.log(response.data)
            setData((data) => ({
                ...data,
                aylienData: response.data
            }))
        }
    }

    const handleLoading = (result, form, error) =>{

        setData((data) => ({
            ...data,
            loading: result,
            total: form.total,
            finished: error,
            writing_style: form.writing_style
        }))
    }

    const changeType = (type) => {
        setData((data) => ({
            ...data,
            currentType: type
        }))
    }

    useEffect(() => {
        if(data.aylienData.length > 0 && data.loading == false){
            data.aylienData.forEach((item) => {
                console.log(item.id, data.writing_style)

                let formData = new FormData();
                formData.append('id', item.id)
                formData.append('style', data.writing_style)
                const headers = {'Content-Type': 'application/json', 'Accept': 'text/plain'};


                api.post('/api/generate_story',formData,{ headers })
                    .then((response) => {
                        console.log(response)
                        setData((data) => ({
                            ...data,
                            gptData: [
                                ...data.gptData,
                                response.data,
                            ],
                            finished: true
                        }))
                    })
                    .catch( (error) => {
                        console.log(error);
                        setData((data) => ({
                            ...data,
                            finished: true
                        }))
                    });

            })
        }
    }, [data.aylienData, data.loading])

    return (
        <main className="wrap dashboard">
            <Header />
            <section className="profile page mvp_filters">
                <div className="profile_wrapper">
                    <div className="profile_sticky_wrapper">
                        <div className="my_profile">
                            <div className="profile_header">
                                <h1 className="page_title">Filters</h1>
                            </div>
                            <hr />
                            <Filters onResult={handleResult} finished={data.finished} onLoading={handleLoading}/>
                        </div>
                    </div>
                </div>
                
                <div className="my_projects mvp_articles">
                    <div className="profile_sticky_wrapper">
                        <div className="profile_header">
                            <h1 className="page_title">Articles</h1>
                            <div className="articles_selection">
                                <div className={'one_articles_type ' + (data.currentType == 'original' ? 'active' : '')} onClick={e => changeType('original')}>
                                    <div className="article_type_icon"><GlobeIcon /></div>
                                    <div className="article_type_title">Original</div>
                                </div>
                                <div className={'one_articles_type ' + (data.currentType == 'ai' ? 'active' : '')} onClick={e => changeType('ai')}>
                                    <div className="article_type_icon"><BrainIcon /></div>
                                    <div className="article_type_title">AI Generated</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="articles_wrap list_wrapper big">
                        {data.currentType == 'original' ?
                            data.loading == true ? <PostsListSkeleton count={data.total}/> : 
                                data.aylienData.length > 0 ? data.aylienData.map((item, index) => <PostsItem key={item.id} data={item} typeGPT={false}/>) : <NoProjects />
                            : 
                            data.currentType == 'ai' ?
                                data.finished == false ? <PostsListSkeleton count={data.total}/> : 
                                    data.gptData.length > 0 ? data.gptData.map((item, index) => <PostsItem key={item.id + 'gpt'} data={item} typeGPT={true} />) : <NoProjects />
                            : <NoProjects />
                        }
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}