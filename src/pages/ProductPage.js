import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Dummy data for demo
const productsArr = [
  {
    title: "Colors",
    price: 12.99,
    images: [
      "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
      "https://cdn.pixabay.com/photo/2014/10/17/13/42/photo-album-492297_640.jpg",
      "https://cdn.pixabay.com/photo/2021/09/13/23/10/vinyl-6622596_640.jpg",
    ],
    reviews: [
      { user: "Alice", comment: "Great product!" },
      { user: "Bob", comment: "Loved it!" },
    ],
  },
  {
    title: "Black and white Colors",
    price: 9.99,
    images: [
      "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
      "https://cdn.pixabay.com/photo/2024/08/09/01/06/country-8955755_640.png",
    ],
    reviews: [{ user: "Charlie", comment: "Nice!" },
            {user:"Jignesh",comment:"very good product"}
    ],
  },
  {
    title: "Yellow and Black Colors",
    price: 11.99,
    images:[ "https://cdn.pixabay.com/photo/2014/10/17/13/41/photo-album-492296_640.jpg",
            "https://cdn.pixabay.com/photo/2018/02/01/19/21/easter-3123834_640.jpg",
            "https://cdn.pixabay.com/photo/2021/10/02/20/15/comma-6676344_640.jpg"
    ],
    reviews: [{ user: "Charlie", comment: "Nice!" },
        {user:"Mahesh",comment:"Awesome, must be try"},
        {user:"Rahul",comment:"All good but small"}
    ],
  },
  {
    title: "Blue Color",
    price: 14.99,
    images: ["https://cdn.pixabay.com/photo/2021/09/13/23/10/vinyl-6622596_640.jpg",
            "https://cdn.pixabay.com/photo/2022/05/29/03/25/milk-7228322_640.jpg",
            "https://cdn.pixabay.com/photo/2024/02/20/11/34/photographer-8585335_640.png"
    ],
    reviews: [{ user: "Charlie", comment: "Nice!" },
        {user:"Thakur",comment:"Low budget but good product"},
        {user:"Priyanka",comment:"Nice, smooth and fine"}
    ],
  },
];

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Simulate fetching product by ID
    const fetchedProduct = productsArr[id];
    setProduct(fetchedProduct);
  }, [id]);

  if (!product) return <p>Loading product...</p>;

  return (
    <div className="container my-5">
      <h2 className="fw-bold mb-4">{product.title}</h2>

      {/* Product Images */}
      <div className="d-flex gap-3 mb-4 flex-wrap">
        {product.images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`${product.title} ${index}`}
            className="img-fluid rounded shadow"
            style={{ maxWidth: "300px", maxHeight: "300px" }}
          />
        ))}
      </div>

      {/* Reviews */}
      <div>
        <h4>Reviews</h4>
        {product.reviews.length === 0 && <p>No reviews yet.</p>}
        {product.reviews.map((rev, index) => (
          <div key={index} className=" mb-2 p-2 shadow-sm">
            <strong>{rev.user}:</strong> {rev.comment}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
