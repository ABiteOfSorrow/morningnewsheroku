export default function(articleList = [], action) {
    switch (action.type) {
        case 'ADD_ARTICLE': 
            var articleListCopy = [...articleList];
            var findDuplicate = articleListCopy.find((e) => e.title == action.article.title);
            
            if (findDuplicate == undefined) {
            articleListCopy.push(action.article);
        } return articleListCopy;

        case 'DELETE_ARTICLE': 
            var articleListDeleteCopy = [...articleList];
            console.log(articleListDeleteCopy)
            console.log(action)
            var position = null;

            for (let i=0; i < articleListDeleteCopy.length; i++){
                if (articleListDeleteCopy[i].title == action.title ){
                    position = i;
                }}

            if (position != null) {
                articleListDeleteCopy.splice(position, 1);
        } return articleListDeleteCopy;

       default : 
            return articleList;
    }
}