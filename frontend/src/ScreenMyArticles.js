import React, { useState, useEffect } from 'react';
import './App.css';
import { Card, Icon, Modal} from 'antd';
import Nav from './Nav'
import {connect} from 'react-redux';

const { Meta } = Card;

function ScreenMyArticles(props) {

    const [userId, setUserId] = useState(props.user);
    const [myArticle, setMyArticle] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalDescription, setModalDescription] = useState("");


    // Controleur Modal
    const showModal = (title, description) => {
        setIsModalVisible(true);
        setModalTitle(title);
        setModalDescription(description);
      };
    
      const handleOk = () => {
        setIsModalVisible(false);
      };
    
      const handleCancel = () => {
        setIsModalVisible(false);
      };


    // // ver 1. Chargement des article (avec state)
    // useEffect(() => {
    //     setMyArticle(props.articles);
    // },[props]);

    // ver 2. Chargement des article (avec DB)
    useEffect(() => {
        let RechargeArticles = async () => {
            const data = await fetch("/get-article", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded"},
                body: `userId=${userId}`,
            });
    
            const articleData = await data.json();
            console.log(articleData.myArticles)
         if (articleData.myArticles) {   
            console.log("Article est bien chargé")
            setMyArticle(articleData.myArticles)
        } else if (articleData.myArticles.length == 0) {
            console.log("Il n'a pas d'article a charger")
        }
        }
        RechargeArticles();
    }, []);

    // Supprimer un article
    let handleDelete = async (articleTitle) => {
        const rawResponse = await fetch("/delete-article", {
            method: "post",
            headers: { "Content-Type": "application/x-www-form-urlencoded"},
            body: `userId=${userId}&articleTitle=${articleTitle}`,
        });

        const response = await rawResponse.json();

        if (response.result === true) {
            console.log("L'article a été supprimé")
            setMyArticle(response.myArticles)
            // console.log(userData)
        } else {
            console.log(response.error);
        }
    }


  return (
    <div>
            <Nav/>
            <div className="Banner"/>
            <div className="Card">
                {myArticle.map((article, i) => (
    
                    <div key={i} style={{display:'flex',justifyContent:'center'}}>
                      <Card
                        style={{  
                        width: 300, 
                        margin:'15px', 
                        display:'flex',
                        flexDirection: 'column',
                        justifyContent:'space-between' }}
                        cover = {<img alt="example" src={article.urlToImage}/>                        
                        }
                        
                        actions={[<Icon onClick={() => showModal(article.title, article.description)} type="read" key="ellipsis2" />, 
                                  <Icon onClick={() => handleDelete(article.title)} type="delete" key="ellipsis" />        
                        /* <Icon onClick={() => props.DeleteWishList(article.title)} type="delete" key="ellipsis" /> */
                        ]}
                        >
                        <Meta title={article.title} description={article.description}/>
                      </Card>

                      <Modal title={modalTitle} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                        <p>{modalDescription}</p>
                      </Modal>
                    </div>
    ))}
             </div>
      </div>
  );
}


function mapStateToProps (state) {
    return { user: state.user, articles: state.article}
}

function mapDispatchToProps (dispatch) {
    return {
        DeleteWishList: function(title) {
          dispatch( {type: 'DELETE_ARTICLE', title} );
      },
    };
   };

export default connect(mapStateToProps, mapDispatchToProps)(ScreenMyArticles);

