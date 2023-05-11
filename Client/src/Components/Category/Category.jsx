import { useParams, NavLink, Link } from "react-router-dom";
import "./Category.css";
import { Typography } from "@mui/material";
function Category() {
  return (
    <div className="category">
      <ul className="categoryUl">
        <hr />
        <li className="categoryLi">
          <Link
            name="category"
            className="categoryLink"
            to="/auctions/auctions"
          >
            <Typography>Auctions</Typography>
          </Link>
        </li>
        <li className="categoryLi">
          <Link name="category" className="categoryLink" to="/auctions/homes">
            <Typography>Homes and real states</Typography>
          </Link>
        </li>
        <li className="categoryLi">
          <Link
            name="category"
            className="categoryLink"
            to="/auctions/furnitures"
          >
            <Typography>Furnitures</Typography>
          </Link>
        </li>
        <li className="categoryLi">
          <Link
            name="category"
            className="categoryLink"
            to="/auctions/jewelerys"
          >
            <Typography>Jewelrys</Typography>
          </Link>
        </li>
        <li className="categoryLi">
          <Link
            name="category"
            className="categoryLink"
            to="/auctions/artworks"
          >
            <Typography>Art works</Typography>
          </Link>
        </li>
        <li className="categoryLi">
          <Link
            name="category"
            className="categoryLink"
            to="/auctions/electronics"
          >
            <Typography>Electronics</Typography>
          </Link>
        </li>
        <li className="categoryLi">
          <Link
            name="category"
            className="categoryLink"
            to="/auctions/manufacturing materials"
          >
            <Typography>Manufacturing materials</Typography>
          </Link>
        </li>
        <hr />
      </ul>
    </div>
  );
}
export default Category;
