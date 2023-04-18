import React from "react";
interface PaginationProps {
  total: number;
  page: number;
  onChange?: (value: number) => void;
}
function Pagination({ total, page, onChange }: PaginationProps) {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", alignItems: "ceter",marginTop:'20px' }}
    >
      <div
        style={{
          width: "40px",
          height: "40px",
          display: "flex",
          justifyContent: "center",
          alignItems:'center'
        }}
      >
        <a href="#">&laquo;</a>
      </div>
      {new Array(total / 10).fill(null).map((_,i) => (
        <div
          key={i}
          onClick={() => onChange?.(i+1)}
          style={{
            margin:'0 5px',
            color: page === i+1 ? "white" : "black",
            backgroundColor: page === i+1 ? "black" : "#f5f5f5",
            borderRadius:'3px',
            width: "40px",
            cursor:'pointer',
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {i+1}
        </div>
      ))}
      <div
        style={{
          width: "40px",
          height: "40px",
          display: "flex",
          justifyContent: "center",
          alignItems:'center'
        }}
      >
        <a href="#">&raquo;</a>
      </div>
    </div>
  );
}

export default Pagination;
