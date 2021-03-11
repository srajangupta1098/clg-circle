import React from 'react'
import PostPage from './PostPage'
import Aapbar from './Appbar'
import Placement from './Placement'
import Alumni from './Alumni'
import Club from './Club'
// import Cardpage from './Cardpage'


function UserFrontPage(props){
    const [view,setView] = React.useState(<PostPage/>)

    const changeView = (nextview) =>{
        if(nextview === 'Placement')
        {
            setView(<Placement/>)
        }
        else if(nextview === 'Post')
        {
            setView(<PostPage/>)
        }
        else if(nextview==='alumni')
        {
            setView(<Alumni />)
        }
        else if(nextview==='club')
        {
            setView(<Club />)
        }
    }

    return(
        <div>
            <Aapbar changeView={(nextview)=>changeView(nextview)}/>
            {view}
        </div>
    )
}

export default UserFrontPage