import React,{useEffect} from 'react'
import Public from './Public';
import CardPublic from './CardPublic';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Card = (props) => {
    const history=useHistory();
    const makepublic=async(id,name)=>{
        console.log(id,name);
     const res=await fetch(`/public/${id}`,{
         method:"POST",
         headers:{
             "Content-Type":"application/json"
         },
         body:JSON.stringify({
    
         })
     });
     const publicdata=await res.json();
     publicdata.name=name;
     console.log(publicdata);
     toast.success('QUESTION ADDED IN PUBLIC')
     history.push('/public')
    }
    console.log(props.name);
    return (
        <>
            (<div class="card">
                <div class="box">
                    <div class="content">
                        <h2>01</h2>
                        <p className="head">QuestionName:</p>
                        <div className="contenttopic">{props.quesname}</div>
                        <p className="head">QuestionTag:</p>
                        <h3 className="contenttopic">{props.questag}</h3>
                        <p className="head">QuestionSource:</p>
                        <h3 className="contenttopic">{props.quessource}</h3>
                        <div className="btnicon">
                            <a href={`${props.queslink}`} target="_blank">Question Url</a>
                            <div onClick={(()=>{
                               makepublic(props.quesid,props.name)
                            })}>
                                <i class="fas fa-share-alt fa-2x sharebtn"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card
