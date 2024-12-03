// import { Fragment } from "react";
// import Wrapper from "../components/wrapper/Wrapper";
// import Section from "../components/Section";
// import { products, discoutProducts } from "../utils/products";
// import SliderHome from "../components/Slider";
// import useWindowScrollToTop from "../hooks/useWindowScrollToTop";

// const Home = () => {
//   const newArrivalData = products.filter(
//     (item) => item.category === "mobile" || item.category === "wireless"
//   );
//   const bestSales = products.filter((item) => item.category === "sofa");
//   useWindowScrollToTop();
//   return (
//     <Fragment>
//       <SliderHome />
//       <Wrapper />
//       <Section
//         title="Big Discount"
//         bgColor="#f6f9fc"
//         productItems={discoutProducts}
//       />
//       <Section
//         title="New Arrivals"
//         bgColor="white"
//         productItems={newArrivalData}
//       />
//       <Section title="Best Sales" bgColor="#f6f9fc" productItems={bestSales} />
//     </Fragment>
//   );
// };

// export default Home;





import { Fragment, useEffect, useState } from "react";
import Wrapper from "../components/wrapper/Wrapper";
import Section from "../components/Section";
import SliderHome from "../components/Slider";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [discountProducts, setDiscountProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error state

  useWindowScrollToTop();

  // Fetch products and discount products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");  // Correct endpoint
        const allProducts = response.data;

        setProducts(allProducts);
        setDiscountProducts(allProducts.filter((item) => item.discount > 0)); // Adjusted for numerical discount
      } catch (error) {
        setError("Error fetching products.");
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false); // Set loading to false when data is fetched
      }
    };

    fetchProducts();
  }, []);

  // Filter data for sections
  const newArrivalData = products.filter(
    (item) => item.category === "mobile" || item.category === "wireless"
  );
  const bestSales = products.filter((item) => item.category === "sofa");

  return (
    <Fragment>
      <SliderHome />
      <Wrapper />

      {isLoading ? (
        <div>Loading...</div> // Show loading state while fetching data
      ) : error ? (
        <div>{error}</div> // Show error message if there's an error
      ) : (
        <>
          <Section
            title="Big Discount"
            bgColor="#f6f9fc"
            productItems={discountProducts}
          />
          <Section
            title="New Arrivals"
            bgColor="white"
            productItems={newArrivalData}
          />
          <Section title="Best Sales" bgColor="#f6f9fc" productItems={bestSales} />
        </>
      )}
    </Fragment>
  );
};

export default Home;
