import { useParams, NavLink, Link } from "react-router-dom";
import "./Category.css";
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
            Auctions
          </Link>
        </li>
        <li className="categoryLi">
          <Link name="category" className="categoryLink" to="/auctions/homes">
            Homes and real states
          </Link>
        </li>
        <li className="categoryLi">
          <Link
            name="category"
            className="categoryLink"
            to="/auctions/furnitures"
          >
            Furnitures
          </Link>
        </li>
        <li className="categoryLi">
          <Link
            name="category"
            className="categoryLink"
            to="/auctions/jewelerys"
          >
            Jewelrys
          </Link>
        </li>
        <li className="categoryLi">
          <Link
            name="category"
            className="categoryLink"
            to="/auctions/artworks"
          >
            Art works
          </Link>
        </li>
        <li className="categoryLi">
          <Link
            name="category"
            className="categoryLink"
            to="/auctions/electronics"
          >
            Electronics
          </Link>
        </li>
        <li className="categoryLi">
          <Link
            name="category"
            className="categoryLink"
            to="/auctions/manufacturing materials"
          >
            Manufacturing materials
          </Link>
        </li>
        <hr />
      </ul>
    </div>
  );
}
export default Category;
