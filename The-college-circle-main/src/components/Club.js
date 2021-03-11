import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import clsx from 'clsx';
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Form from './clubForm'
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography'
import {getclub} from './connection'

const useStyles = makeStyles((theme) => ({
    root:{
        display:"flex",
        flexDirection:"column",
        alignItems:"center"
    },
    buttondesign:{
      display:'flex',
      border:"2px red green",
      marginTop:"2px",
    },
    card: {
        maxWidth: 345,
      },
    media: {
        height: 140,
      },
      expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      },
      expandOpen: {
        transform: 'rotate(180deg)',
      },
    company_card:{
        display:"flex",
        flexDirection:"row",
        marginTop:"4px",
        width:"100%",
        justifyContent:"space-evenly",
        justifyItems:"space-evenly"
    }
  }));
export default function Club(){

    const classes = useStyles()
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const [open, setOpen] = React.useState(false)
    const addClub=()=>{
        var membertype = localStorage.getItem("membertype")
        if(membertype === 'Faculty')
        {
            setOpen(true)
        }
        else
        {
            alert("you are not authorized to add club")
        }
    }
    const [data,setData] = React.useState([])

    const getclubData = React.useCallback(()=>{
        var collegename = localStorage.getItem("collegename")
        getclub(collegename)
        .then(async(res)=>{
            // console.log("L",res)
            await setData(res.data.result)
        })
        .catch(err=>console.log(err))
    },[localStorage.getItem("collegename")])
    React.useEffect(()=>{
        getclubData()
    },[getclubData])

    return(
        <div className={classes.root}>
        <div className={classes.buttondesign}>
            <Button 
              variant="contained" 
              color="secondary"
              onClick={()=>addClub()} 
              >
               Add Club
            </Button>
        </div>
        <div className={classes.company_card}>
            {data.map((value)=>{return(
            <Link to={`${value._id}`}>
                <Card key={value.imgName} className={classes.card}>
                    <CardActionArea>
                        <CardMedia
                        className={classes.media}
                        image={`http://localhost:3001/images/${value.imgName}`}
                        title={value.imgName}
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {value.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {value.desc}
                        </Typography>
                        
                        </CardContent>
                        <CardActions disableSpacing>
                        
                        <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                        >
                        <ExpandMoreIcon />
                        </IconButton>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                        <Typography paragraph>Learn more about the club:</Typography>
                        <Typography paragraph>
                            {value.moredesc}
                        </Typography>
                        <Typography paragraph>Faculty Head</Typography>
                        <Typography variant="body2" color="textSecondary" component="h3">
                            {value.facultyhead}
                        </Typography>
                        <Typography paragraph>Student Head</Typography>
                        <Typography variant="body2" color="textSecondary" component="h3">
                            {value.studenthead}
                        </Typography>
                        <Typography>Would you like to become a member</Typography>
                        </CardContent>
                    </Collapse>
                    </CardActionArea>
                </Card>
            </Link>

            )})}
        </div>
        <Form open={open} setOpen={setOpen}/>
        </div>
    )
}