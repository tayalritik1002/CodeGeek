import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import { Bar } from 'react-chartjs-2';
import { compare } from 'bcryptjs';
const Compare = () => {
    const [user1name, setuser1name] = useState();
    const [user2name, setuser2name] = useState();
    const [finaluser1name, setfinaluser1name] = useState();
    const [finaluser2name, setfinaluser2name] = useState();
    const [user1rating, setuser1rating] = useState();
    const [user2rating, setuser2rating] = useState();
    const [user1maxrating, setuser1maxrating] = useState();
    const [user2maxrating, setuser2maxrating] = useState();
    const [user1totalcontest, setuser1totalconstest] = useState();
    const [user2totalcontest, setuser2totalconstest] = useState();
    const [user1ratinglevel, setuser1ratinglevel] = useState([]);
    const [user1ratinglevelfreq, setuser1ratinglevelfreq] = useState([]);
    const [user2ratinglevel, setuser2ratinglevel] = useState([]);
    const [user2ratinglevelfreq, setuser2ratinglevelfreq] = useState([]);
    const [user1leveltagdata, setuser1leveltagdata] = useState([]);
    const [user1leveltagdatafreq, setuser1leveltagdatafreq] = useState([]);
    const [user2leveltagdata, setuser2leveltagdata] = useState([]);
    const [user2leveltagdatafreq, setuser2leveltagdatafreq] = useState([]);
    const [flag, setflag] = useState(0);
    const handlename1 = (e) => {
        console.log(e.target.value);
        setuser1name(e.target.value);
    }
    const handlename2 = (e) => {
        console.log(e.target.value);
        setuser2name(e.target.value);
    }
    const minmaxratingcomapre1 = async () => {
        try {
            const user1minmaxrating = await fetch(`https://codeforces.com/api/user.info?handles=${finaluser1name}`);
            const user1minmaxratingdetail = await user1minmaxrating.json();
            console.log(user1minmaxratingdetail);
            setuser1rating(user1minmaxratingdetail.result[0].rating);
            setuser1maxrating(user1minmaxratingdetail.result[0].maxRating);
        } catch (e) {
            console.log(e);
        }
    }
    const minmaxratingcomapre2 = async () => {
        try {
            let user2minmaxrating = await fetch(`https://codeforces.com/api/user.info?handles=${finaluser2name}`);
            let user2minmaxratingdetail = await user2minmaxrating.json();
            console.log(user2minmaxratingdetail);
            setuser2rating(user2minmaxratingdetail.result[0].rating);
            setuser2maxrating(user2minmaxratingdetail.result[0].maxRating);
        } catch (e) {
            console.log(e);
        }
    }
    const totcontest1 = async () => {
        try {
            let user1totcontest = await fetch(`https://codeforces.com/api/user.rating?handle=${finaluser1name}`);
            let user1totcontestdet = await user1totcontest.json();
            setuser1totalconstest(user1totcontestdet.result.length);
        }
        catch (e) {
            console.log(e);
        }
    }
    const totcontest2 = async () => {
        try {
            const user2totcontest = await fetch(`https://codeforces.com/api/user.rating?handle=${finaluser2name}`);
            const user2totcontestdet = await user2totcontest.json();
            console.log(user2totcontestdet);
            setuser2totalconstest(user2totcontestdet.result.length);
        } catch (e) {
            console.log(e);
        }
    }
    const ratingcountuser1 = async () => {
        let s1 = new Set();
        let user1ratingfreq = {};
        let quesrating = [];
        let quesratingfreq = [];
        try {
            let user1ratingcal = await fetch(`https://codeforces.com/api/user.status?handle=${finaluser1name}`);
            let user1ratingcalres = await user1ratingcal.json();
            console.log(user1ratingcalres);
            for (let i = 0; i < user1ratingcalres.result.length; i++) {
                if (user1ratingcalres.result[i].verdict == "OK") {
                    s1.add(user1ratingcalres.result[i].problem.rating);
                    user1ratingfreq[user1ratingcalres.result[i].problem.rating] = user1ratingfreq[user1ratingcalres.result[i].problem.rating] ? user1ratingfreq[user1ratingcalres.result[i].problem.rating] + 1 : 1;
                }
            }
            for (let it of s1) {
                console.log(it);
                quesrating.push(it);
            }
            quesrating.sort(function (a, b) { return a - b });
            for (let i = 0; i < quesrating.length; i++) {
                quesratingfreq.push(user1ratingfreq[quesrating[i]]);
            }
            setuser1ratinglevel(quesrating);
            setuser1ratinglevelfreq(quesratingfreq);
        } catch (e) {
            console.log(e);
        }
    }
    const ratingcountuser2 = async () => {
        let user2ratingfreq = {};
        let s2 = new Set();
        let quesrating2 = [];
        let quesratingfreq2 = [];
        try {
            let user2ratingcal = await fetch(`https://codeforces.com/api/user.status?handle=${finaluser2name}`);
            let user2ratingcalres = await user2ratingcal.json();
            console.log(user2ratingcalres);
            for (let i = 0; i < user2ratingcalres.result.length; i++) {
                if (user2ratingcalres.result[i].verdict == "OK") {
                    s2.add(user2ratingcalres.result[i].problem.rating);
                    user2ratingfreq[user2ratingcalres.result[i].problem.rating] = user2ratingfreq[user2ratingcalres.result[i].problem.rating] ? user2ratingfreq[user2ratingcalres.result[i].problem.rating] + 1 : 1;
                }
            }
            for (let item of s2) {
                quesrating2.push(item);
            }
            quesrating2.sort(function (a, b) { return a - b });
            for (let i = 0; i < quesrating2.length; i++) {
                quesratingfreq2.push(user2ratingfreq[quesrating2[i]]);
            }
            setuser2ratinglevel(quesrating2);
            setuser2ratinglevelfreq(quesratingfreq2)
        } catch (e) {
            console.log(e);
        }
    }
    const leveluser1 = async () => {
        let user1leveltag = new Set();
        let user1leveltagfreq = {}
        let sortuser1leveltag = [];
        let user1leveltagfreqfinal = [];
        try {
            let user1level = await fetch(`https://codeforces.com/api/user.status?handle=${finaluser1name}`);
            let user1leveldetail = await user1level.json();
            console.log(user1leveldetail);
            for (let i = 0; i < user1leveldetail.result.length; i++) {
                if (user1leveldetail.result[i].verdict == "OK") {
                    user1leveltag.add(user1leveldetail.result[i].problem.index);
                    user1leveltagfreq[user1leveldetail.result[i].problem.index] = user1leveltagfreq[user1leveldetail.result[i].problem.index] ? user1leveltagfreq[user1leveldetail.result[i].problem.index] + 1 : 1;
                }
            }
            for (let item of user1leveltag) {
                // console.log(item);
                sortuser1leveltag.push(item);
                // console.log(user1leveltagfreq[item])
            }
            sortuser1leveltag.sort();
            for (let i = 0; i < sortuser1leveltag.length; i++) {
                console.log(sortuser1leveltag[i]);
                user1leveltagfreqfinal.push(user1leveltagfreq[sortuser1leveltag[i]]);
            }
            setuser1leveltagdata(sortuser1leveltag);
            setuser1leveltagdatafreq(user1leveltagfreqfinal);
        } catch (e) {
            console.log("hi");
        }
    }
    const leveluser2 = async () => {
        let user2leveltag = new Set();
        let user2leveltagfreq = {}
        let sortuser2leveltag = [];
        let user2leveltagfreqfinal = [];
        try {
            let user2level = await fetch(`https://codeforces.com/api/user.status?handle=${finaluser2name}`);
            let user2leveldetail = await user2level.json();
            console.log(user2leveldetail);
            for (let i = 0; i < user2leveldetail.result.length; i++) {
                if (user2leveldetail.result[i].verdict == "OK") {
                    user2leveltag.add(user2leveldetail.result[i].problem.index);
                    user2leveltagfreq[user2leveldetail.result[i].problem.index] = user2leveltagfreq[user2leveldetail.result[i].problem.index] ? user2leveltagfreq[user2leveldetail.result[i].problem.index] + 1 : 1;
                }
            }
            for (let item of user2leveltag) {
                // console.log(item);
                sortuser2leveltag.push(item);
                // console.log(user1leveltagfreq[item])
            }
            sortuser2leveltag.sort();
            for (let i = 0; i < sortuser2leveltag.length; i++) {
                console.log(sortuser2leveltag[i]);
                user2leveltagfreqfinal.push(user2leveltagfreq[sortuser2leveltag[i]]);
            }
            setuser2leveltagdata(sortuser2leveltag);
            setuser2leveltagdatafreq(user2leveltagfreqfinal);
        } catch (e) {
            console.log("hi");
        }
    }
    const usercompare = () => {
        setflag(1);
        setfinaluser1name(user1name);
        setfinaluser2name(user2name);
        totcontest1();
        totcontest2();
        // leveluser1();
        // leveluser2();
        // ratingcountuser1();
        // ratingcountuser2();
    }
    const usercompareminmaxrate = () => {
        setfinaluser1name(user1name);
        setfinaluser2name(user2name);
        //    minmaxratingcomapre1();
        // minmaxratingcomapre2();
    }
    const usercomparerating = () => {
        setflag(1);
        setfinaluser1name(user1name);
        setfinaluser2name(user2name);
        ratingcountuser1();
        ratingcountuser2();
    }
    const usercomparetag = () => {
        setflag(1);
        setfinaluser1name(user1name);
        setfinaluser2name(user2name);
        leveluser1();
        leveluser2();
    }
    useEffect(() => {
        // setflag(0);
    }, [flag])
    return (flag) ? (
        <>
            <Navbar />
            <div>
                <label>ENTER USER1 HANDLE NAME</label>
                <input type="text" className="form-control" onChange={handlename1} placeholder="ENTER USER1 NAME"></input>
                <label>ENTER USER2 HANDLE NAME</label>
                <input type="text" className="form-control" onChange={handlename2} placeholder="ENTER USER2 NAME"></input>
            </div>
            <div className="text-center my-5">
                <button className="btn btn-primary" onClick={usercompare}>COMPARE CONTEST</button>
                <button className="btn btn-danger mx-2" onClick={usercomparerating}>COMPARE USER QUESTION RATING</button>
                <button className="btn btn-info mx-2" onClick={usercomparetag}>COMPARE USER QUESTION TAG</button>
            </div>
            <div className="row my-5">
                <h1 className="text-center text-danger">TOTAL CONTEST GIVEN BY THE USER</h1>
                <div className="col-md-12 boxshadowstyle">
                    <Bar
                        data={{
                            labels: [finaluser1name, finaluser2name],
                            datasets: [
                                {
                                    label: finaluser1name,
                                    data: [user1totalcontest, user2totalcontest],
                                    backgroundColor: [
                                        'rgba(255, 99, 132, 0.2)',
                                        'rgba(54, 162, 235, 0.2)',
                                    ],
                                    borderColor: [
                                        'red',
                                        'blue'
                                    ],
                                    borderWidth: 1,
                                    barThickness: 60
                                },
                            ]
                        }}
                        height={400}
                        width={600}
                        options={{
                            maintainAspectRatio: false,
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }
                        }}
                    />
                </div>
            </div>
            <div className="row my-5">
                <h1 className="text-center text-danger">LEVEL OF RATING QUESTION DONE BY USER</h1>
                <div className="col-md-12 boxshadowstyle">
                    <Bar
                        data={{
                            labels: user1ratinglevel,
                            datasets: [
                                {
                                    label: finaluser1name,
                                    data: user1ratinglevelfreq,
                                    backgroundColor: [
                                        'rgba(255, 99, 132, 0.2)'
                                    ],
                                    borderColor: [
                                        'red'
                                    ],
                                    borderWidth: 1,
                                },
                                {
                                    label: finaluser2name,
                                    data: user2ratinglevelfreq,
                                    backgroundColor: [
                                        'rgba(54, 162, 235, 0.2)',
                                    ],
                                    borderColor: [
                                        'blue'
                                    ],
                                    borderWidth: 1,
                                }
                            ]
                        }}
                        height={400}
                        width={600}
                        options={{
                            maintainAspectRatio: false,
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }
                        }}
                    />
                </div>
            </div>
            <div className="row my-5">
                <h1 className="text-center text-danger">TAG OF THE QUESTION DONE BY THE USER</h1>
                <div className="col-md-12 boxshadowstyle">
                    <Bar
                        data={{
                            labels: user1leveltagdata.length > user2leveltagdata ? user1leveltagdata : user2leveltagdata,
                            datasets: [
                                {
                                    label: finaluser1name,
                                    data: user1leveltagdatafreq,
                                    backgroundColor: [
                                        'rgba(255, 99, 132, 0.2)'
                                    ],
                                    borderColor: [
                                        'red'
                                    ],
                                    borderWidth: 1,
                                },
                                {
                                    label: finaluser2name,
                                    data: user2leveltagdatafreq,
                                    backgroundColor: [
                                        'rgba(54, 162, 235, 0.2)',
                                    ],
                                    borderColor: [
                                        'blue'
                                    ],
                                    borderWidth: 1,
                                }
                            ]
                        }}
                        height={400}
                        width={600}
                        options={{
                            maintainAspectRatio: false,
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }
                        }}
                    />
                </div>
            </div>
        </>
    ) : (<>
        <Navbar />
        <div className="row">
          <div className="col-md-6">
          <label>ENTER USER1 HANDLE NAME</label>
            <input type="text" className="form-control" onChange={handlename1} placeholder="ENTER USER1 NAME"></input>
          </div>
          <div className="col-md-6">
          <label>ENTER USER2 HANDLE NAME</label>
            <input type="text" className="form-control" onChange={handlename2} placeholder="ENTER USER2 NAME"></input>
          </div>
        </div>
        <div className="text-center my-5">
            <button className="btn btn-primary" onClick={usercompare}>COMPARE CONTEST</button>
            <button className="btn btn-danger mx-2" onClick={usercomparerating}>COMPARE USER QUESTION RATING</button>
            <button className="btn btn-info mx-2" onClick={usercomparetag}>COMPARE USER QUESTION TAG</button>
        </div>
        <div className="text-center my-5">
            <h1 className="text-danger">COMPARE YOURSELF WITH YOUR FRIEND:)</h1>
        </div>
    </>)
}
export default Compare