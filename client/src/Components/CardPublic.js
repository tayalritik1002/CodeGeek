import React,{useState} from 'react'
const CardPublic = (props) => {
    const[likecount,setLikecount]=useState(props.publiclike);
    const [dislikecount,setdislikecount]=useState(props.publicdislike);
    const likeadded=async()=>{
        const res=await fetch(`/like/${props.publicid}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            }
        });
        const data=await res.json();
        console.log(data);
        setLikecount(data.Like);
        // setdislikecount(data.Dislike);
        // window.location.reload();
    }
    const dislikeadded=async()=>{
        const res=await fetch(`/dislike/${props.publicid}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            }
        });
        const data=await res.json();
        console.log(data);
        // setLikecount(data.Like);
        setdislikecount(data.Dislike);
        // window.location.reload();
    }
    // console.log(props.name);
    return (
        <>
            <div class="card bg-danger">
            <p className="publicname">{props.publicnamenew}</p>
                <div class="box">
                    <div class="content">
                        <h2>01</h2>
                        <p className="head">QuestionName:</p>
                        <div className="contenttopic">{props.publicquesname}</div>
                        <p className="head">QuestionTag:</p>
                        <h3 className="contenttopic">{props.publicquestag}</h3>
                        <p className="head">QuestionSource:</p>
                        <h3 className="contenttopic">{props.publicquessrc}</h3>
                        <div className="likedislike">
                            <a href={`${props.publicurl}`} target="_blank">Question Url</a>
                            <div onClick={(()=>{
                            //    makepublic(props.quesid)
                            })}>
                            </div>
                            <div className="likesym">
                            <i class="fas fa-thumbs-up fa-2x likes" onClick={likeadded}></i>
                            <span className="likefont">{likecount}</span>
                            </div>
                            <div className="likesym">
                            <i class="fas fa-thumbs-down fa-2x dislikes" onClick={dislikeadded}></i>
                            <span className="likefont">{dislikecount}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardPublic
