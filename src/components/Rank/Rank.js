import React from "react";

const Rank = ({ name, count }) => {
  return (
    <div className="mt-5">
      <div className="text-center text-primary">{`${name}, your current entry count is...`}</div>
      <div className="text-center text-primary">#{count}</div>
    </div>
  );
};

export default Rank;
