
import { Link } from "react-router-dom";
import useFetchCategories from "./useFetchCategories";

const Categories = () => 
{
    const {allcat} = useFetchCategories();

    return (
        <>
           <div className="breadcrumbs">
		<div className="container">
			<ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
				<li><Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
				<li className="active">Categories</li>
			</ol>
		</div>
	</div>
            <div className="login">
                <div className="container">
                <h2>Categories</h2><br/>
                {
                    allcat.length>0?
                    allcat.map((cdata,i)=>
                    <div class="col-md-4 top_brand_left" key={i}>
                        <div class="hover14 column">
                            <div class="agile_top_brand_left_grid">
                                <div class="agile_top_brand_left_grid1">
                                    <figure>
                                        <div class="snipcart-item block" >
                                            <div class="snipcart-thumb">
                                            <Link to={`/subcategories?cid=${cdata._id}`}>
                                                <img height='125' title=" " alt=" " src={`uploads/${cdata.catpic}`} />
                                                <p>{cdata.catname}</p>
                                            </Link>	
                                            </div>
                                        </div>
                                    </figure>
                                </div>
                            </div>
                        </div>
                    </div>
                    ):null
                }
                </div>
            </div>
        </>
    )
}
export default Categories;