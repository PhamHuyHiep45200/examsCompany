import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import "../styles/table.module.css";
import { ProductType } from "@/types/product";
import Pagination from "./Pagination";
import style from "../styles/tesst.module.css";

const Table = () => {
  const [page, setPage] = useState<{
    limit: number;
    skip: number;
    page: number;
  }>({
    limit: 10,
    skip: 0,
    page: 1,
  });
  const [total, setTotal] = useState<number>(0);
  const ref = useRef<any>();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [search, setSearch] = useState<string>("");
  const getApi = async () => {
    try {
      const res = await axios.get(
        `https://dummyjson.com/products?limit=10&skip=${page.skip}`
      );
      if (res.status === 200) {
        console.log(res);
        setProducts(res.data.products);
        setTotal(res.data.total);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getApi();
  }, [page]);
  const handleSearch = (e: any) => {
    if (e.target.value) {
      clearTimeout(ref.current);
      ref.current = setTimeout(() => {
        setSearch(e.target.value);
        setProducts(
          products.filter((s) => s.description.includes(e.target.value))
        );
      }, 400);
    } else {
      getApi();
    }
  };
  return (
    <div style={{ padding: "0 70px" }}>
      <div className={style.header}>
        <div className={style.name}>
          <span>name</span>
        </div>
        <div className={style.bottom}>
          <span className={style.nameSearch}>search</span>
          <select
            name="cars"
            id="1"
            style={{
              padding: "8px 5px",
              fontSize: "14px",
              margin: "0 20px",
              borderRadius: "5px",
            }}
          >
            <option value="1">Volvo</option>
            <option value="2">Saab</option>
            <option value="3">Mercedes</option>
            <option value="3">Audi</option>
          </select>
          <input
            onChange={handleSearch}
            style={{
              padding: "8px 5px",
              fontSize: "14px",
              margin: "0 20px",
              borderRadius: "5px",
            }}
          />
          <span className={style.searchButton}>search</span>
        </div>
      </div>
      <table id="customers">
        <tr>
          <th>STT</th>
          <th>Name</th>
          <th>Brand</th>
          <th>Description</th>
          <th>Price</th>
          <th>Rating</th>
          <th>Stock</th>
        </tr>
      </table>
      {products.map((product) => (
        <tr key={product.id}>
          <td style={{ borderBottom: "1px solid black" }}>{product.id}</td>
          <td style={{ borderBottom: "1px solid black" }}>{product.title}</td>
          <td style={{ borderBottom: "1px solid black" }}>{product.brand}</td>
          <td
            className="product-item-desc"
            style={{ borderBottom: "1px solid black" }}
          >
            <span>
              {product.description}
            </span>
          </td>
          <td style={{ borderBottom: "1px solid black" }}>{product.price}</td>
          <td style={{ borderBottom: "1px solid black" }}>{product.rating}</td>
          <td style={{ borderBottom: "1px solid black" }}>{product.stock}</td>
        </tr>
      ))}
      <Pagination
        total={total}
        page={page.page}
        onChange={(e) => setPage({ ...page, skip: (e - 1) * 10, page: e })}
      />
    </div>
  );
};

export default Table;
