import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';

import 'react-slideshow-image/dist/styles.css'
import { toast } from 'react-toastify';
const spanStyle = {
    padding: '20px',
    background: '#efefef',
    color: '#000000'
  }
const divStyle = {
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
backgroundSize: 'cover',
height: '400px'
}
const slideImages = [
{
    url: 'images/11.jpg',
    caption: 'Slide 1'
},
{
    url: 'images/22.jpg',
    caption: 'Slide 2'
},
{
    url: 'images/44.jpg',
    caption: 'Slide 3'
},
];
const Home = () => {
    const [prodsdata,setprodsdata] = useState([]);
    const fetchfeaturedprods=async()=>
        {
            try
            {
                const apiresp=await axios.get(`${process.env.REACT_APP_APIURL}/api/getfeatprods`)
                if(apiresp.status===200)
                {
                    if(apiresp.data.code===1)
                    {
                        setprodsdata(apiresp.data.productsdata)
                    }
                    else
                    {
                        toast.warning("No featured products found")
                        setprodsdata([]);
                    }
                }
            }
            catch(e)
            {
                toast.error(e.message)
            }
        }
    
        useEffect(()=>
        {
            fetchfeaturedprods();
        },[])


    return (
        <>
            <div className="slide-container">
            <Slide>
                {slideImages.map((slideImage, index)=> (
                    <div key={index}>
                    <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
                    </div>
                    </div>
                ))} 
                </Slide>
            </div>
            <div className="login">
                <div className="container">
                {
                    prodsdata.length>0?
                    <>
                    <h2>Featured Products</h2><br/>
                    {
                        prodsdata.map((pdata,i)=>
                        <div class="col-md-4 top_brand_left" key={i}>
                            <div class="hover14 column">
                                <div class="agile_top_brand_left_grid">
                                    <div class="agile_top_brand_left_grid1">
                                        <figure>
                                            <div class="snipcart-item block" >
                                                <div class="snipcart-thumb">
                                                <Link to={`/details?pid=${pdata._id}`}>
                                                    <img height='125' title=" " alt=" " src={`uploads/${pdata.picture}`} />
                                                    <p>{pdata.prodname}</p>
                                                </Link>	
                                                </div>
                                            </div>
                                        </figure>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )
                    }
                    </>:<h2>No Products found</h2>
                }
                </div>
            </div>
        </>
    )
}
export default Home;