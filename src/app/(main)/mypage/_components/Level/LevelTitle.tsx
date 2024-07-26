import React from "react";

function LevelTitle() {
  return (
    <div className="flex flex-row justify-between">
      <p className="text-lg font-bold">내 등급</p>
      <button className="flex flex-row">
        <>🗨️</>
        <p>내 등급이란?</p>
      </button>
    </div>
  );
}

export default LevelTitle;
