"use client";

function VoteButtons() {
  return (
    <div className="flex space-x-4">
      {/* 버튼 클릭시 투표 퍼센티지(투표 인원) 표시할 것 */}
      <button className="bg-gray-800 text-white px-4 py-2 rounded">👍 GOOD</button>
      <button className="bg-gray-800 text-white px-4 py-2 rounded">👎 BAD</button>
    </div>
  );
}

export default VoteButtons;
