import React, { useState, useEffect } from 'react'
// import useDidMountEffect from 'components/parts/useDidMountEffect'
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
import PostsItemSkeleton from 'components/parts/PostsItemSkeleton'
import SuccessIcon from 'components/icons/SuccessIcon'
import ErrorIcon from 'components/icons/ErrorIcon'
import ModalClose from 'components/parts/ModalClose'
import { Modal } from 'react-responsive-modal'

export default function App(){
    const [openSmall, setOpenSmall] = useState(false)
    const [showMessage, setShowMessage] = useState({
        warn: null,
        failLoad: false,
        successIcon: false,
        errorIcon: false
    })
    const [data , setData] = useState({
        aylienData: [],
        gptData: [],
        currentType: 'original',
        loading: false,
        finished: true,
        total: 0,
        writing_style: ''
    })

    const handleResult = (response) => {
        if(response.status == 200){
            // console.log(response.data)
            setData((data) => ({
                ...data,
                currentType: 'original',
                aylienData: response.data,
                gptData: Array.from({ length: response.data.length }, (item, index) => ({
                    id: response.data[index].id,
                    loading: true
                }))
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
        const sendGptRequests = async () => {
            if (data.aylienData.length > 0 && data.loading === false) {
                for (const item of data.aylienData) {
                    const gptItemExist = data.gptData.find(obj => parseInt(obj.id) === parseInt(item.id))
                    console.log(item.id, data.writing_style)

                    if (gptItemExist && gptItemExist.loading === true) {
                        let formData = new FormData();
                        formData.append('id', item.id)
                        formData.append('style', data.writing_style)
                        const headers = { 'Content-Type': 'application/json', 'Accept': 'text/plain' };

                        try {
                            const response = await api.post('/api/generate_story', formData, { headers });
                            const index = data.gptData.findIndex(gptItem => gptItem.id === item.id);
                            console.log(response);

                            setData((data) => {
                                if (index !== -1) {
                                    // found an existing object with the same id, update its properties
                                    const updatedItem = {
                                        ...data.gptData[index],
                                        loading: false,
                                        ...response.data
                                    };
                                    const updatedGptData = [...data.gptData];
                                    updatedGptData[index] = updatedItem;

                                    return {
                                        ...data,
                                        gptData: updatedGptData,
                                        currentType: 'ai'
                                    };
                                } else {
                                    // no object with the specified id was found, do nothing
                                    return data;
                                }
                            });
                        } catch (error) {
                            console.log(error);
                            if (error) {
                                setShowMessage((showMessage) => ({
                                    ...showMessage,
                                    warn: error,
                                    failLoad: true,
                                    successIcon: false,
                                    errorIcon: true
                                }));
                                setOpenSmall(true);

                                setData((data) => ({
                                    ...data,
                                    finished: true,
                                    gptData: []
                                }))
                            }
                        }
                    }
                }
            }
        };
        sendGptRequests();
    }, [data.aylienData, data.loading]);

    useEffect(() => {
        const isAllLoaded = data.gptData.length > 0 && data.gptData.every(obj => obj.loading === false);
        if (isAllLoaded) {
            setData((data) => ({
                ...data,
                finished: true
            }))
            setShowMessage((showMessage) => ({
                ...showMessage,
                warn: 'All requested articles are generated',
                failLoad: false,
                successIcon: true,
                errorIcon: false
            }));
            setOpenSmall(true)

            setTimeout(() => {
                setOpenSmall(false)
            }, 2000)
        }
    }, [data.gptData]);

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
                                data.gptData.length > 0 ? data.gptData.map((item, index) => 
                                    item.loading == true ? <PostsItemSkeleton key={index} /> : <PostsItem key={index} data={item} typeGPT={true} />
                                )
                                : <NoProjects />
                            : null
                        }
                    </div>
                </div>
            </section>
            <Footer />

            <Modal 
                open={openSmall} 
                onClose={() => setOpenSmall(false)} 
                center={true} 
                classNames={{
                    overlayAnimationOut: 'modal-overlay-out',
                    root: 'auth',
                    modalAnimationOut: 'modal-popup-out'
                }}
                showCloseIcon={false} 
                closeOnOverlayClick={true} 
                closeOnEsc={true}
            >
                <h2 className="modal_title">Generation proccess</h2>
                <ModalClose onChange={() => setOpenSmall(false)}/>
                <div className="modal_icon">{showMessage.successIcon ? <SuccessIcon /> : <ErrorIcon />}</div>
                <div className="modal_content with_icon" dangerouslySetInnerHTML={{__html: showMessage.warn}}></div>
            </Modal>
        </main>
    );
}