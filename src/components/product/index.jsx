import { Breadcrumb, Select, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useProduct } from "../../api/useProduct";

const Product = () => {
  const [listProduct, setListProduct] = useState([]);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(0);
  const [value, setValue] = useState([]);
  const [listCategories, setListCategories] = useState([]);
  const [tableScrollHeight, setTableScrollHeight] = useState(0);
  const { getCategories, getProducts, loading } = useProduct();
  const { Title } = Typography;

  useEffect(() => {
    getProducts(value, limit, skip).then((res) => {
      setListProduct(res.products);
      setTotal(res.summary.count);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, limit, skip]);

  useEffect(() => {
    getCategories().then((res) => {
      setListCategories(
        res.data.categories
          ?.filter((value) => value.category !== null && value.category !== "")
          ?.map((item) => {
            return {
              label: item?.category,
              value: item?.category,
            };
          })
      );
    });

    const windowHeight = window.innerHeight;
    const subtractValue = 385;
    const calculatedHeight = windowHeight - subtractValue;
    setTableScrollHeight(calculatedHeight);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (page) => {
    setLimit(page.pageSize);
    setSkip((page.current - 1) * 10);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
  ];

  const handleSelect = (value) => {
    console.log(value);
    setValue(value);
  };

  return (
    <div className="wrapper-hompage">
      <Breadcrumb
        items={[{ title: <Link to="/">Homepage</Link> }, { title: "Product" }]}
      ></Breadcrumb>
      <Title level={2}>Products List</Title>
      <Select
        mode="multiple"
        allowClear
        style={{
          minWidth: "200px",
          marginBottom: "15px",
        }}
        placeholder="Please select"
        onChange={handleSelect}
        options={listCategories}
      />
      <Table
        columns={columns}
        dataSource={listProduct}
        onChange={handleChange}
        rowKey={(listProduct) => listProduct.id}
        pagination={{
          position: ["topRight"],
          total: total,
        }}
        scroll={{
          y: tableScrollHeight,
        }}
        loading={loading}
      />
    </div>
  );
};

export default Product;
