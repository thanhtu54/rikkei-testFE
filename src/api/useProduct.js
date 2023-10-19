import axios from "axios";
import { useState } from "react";

export const useProduct = () => {
  const [loading, setLoading] = useState(false);

  const getCategories = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://mystoreapi.com/catalog/categories");
      setLoading(false);
      return res;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const getProducts = async (category, limit, skip) => {
    try {
      const dataParams = {
        limit: limit,
        skip: skip,
      };

      if (category?.length === 0) {
        setLoading(true);
        const res = await axios.get("https://mystoreapi.com/catalog/products", {
          params: dataParams,
        });
        setLoading(false);
        return res.data;
      } else {
        setLoading(true);
        const res = await axios
          .all(
            category.map((item) =>
              axios
                .get(
                  `https://mystoreapi.com/catalog/category/${item}/products`,
                  {
                    params: dataParams,
                  }
                )
                .then((data) => {
                  return data.data;
                })
            )
          )
          .then((res) => {
            const result = res?.reduce(
              (result, item) => {
                result.products.push(...item.products);
                result.summary.count += item?.summary?.count;
                return result;
              },
              { products: [], summary: { count: 0 } }
            );
            return result;
          });
        setLoading(false);
        return res;
      }
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  return {
    getCategories,
    getProducts,
    loading,
  };
};
