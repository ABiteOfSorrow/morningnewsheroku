import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './App.css';
import { List, Avatar} from 'antd';
import Nav from './Nav'

const API_KET = process.env.REACT_APP_NEWS_API_KEY

function ScreenSource(props) {

    const [sourceList, setSourceList] = useState([]);

    useEffect(() => {
        async function loadData() {
            let rawResponse = await fetch(
                `https://newsapi.org/v2/top-headlines/sources?country=fr&language=fr&apiKey=${API_KET}`
            );
            let response = await rawResponse.json();
            setSourceList(response.sources)
        }
        loadData();
    }, [])
    // console.log(props)
    // console.log(sourceList)
    

  return (
    <div>
        <Nav/>
       
       <div className="Banner"/>

       <div className="HomeThemes">
          
              <List
                  itemLayout="horizontal"
                  dataSource={sourceList}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src={`/images/${item.category}.png`} />}
                        title={<Link to={`/ScreenArticlesBySource/${item.id}`}>{item.name} </Link>}
                        description={item.description}
                      />
                    </List.Item>
                  )}
                />

          </div>
                 
      </div>
  );
}

function mapStateToProps (state) {
    return { user: state.user}
}

export default connect(mapStateToProps, null)(ScreenSource);

