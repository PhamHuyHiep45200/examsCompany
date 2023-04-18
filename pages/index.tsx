import React from "react";
import style from "../styles/tesst.module.css";
import Table from "@/components/Table";

function index() {
  return (
    <div className={style.container}>
      <div>
        <Table/>
      </div>
    </div>
  );
}

export default index;
