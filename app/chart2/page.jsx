"use client";
import { StaticGantt } from "react-beautiful-gantt";
import React, { useState, useRef } from "react";
import { mockData2 } from "@/app/mock";
import Link from "next/link";
export default function Home() {
  const [dateRange, setDateRange] = useState([
    new Date("2023-04-06"),
    new Date("2024-09-30"),
  ]);
  const [select, setSelect] = useState([]);
  const startDate = useRef(null);
  const endDate = useRef(null);
  console.log(mockData2.staticSimple);
  const tasks = mockData2.staticSimple
    .map((item) => {
      item["startTime"] = new Date(item["startTime"]);
      item["endTime"] = new Date(item["endTime"]);
      return item;
    })
    .filter((item) => {
      return (
        (item["startTime"] < dateRange[0] && item["endTime"] > dateRange[0]) ||
        (item["startTime"] < dateRange[1] && item["endTime"] > dateRange[1]) ||
        (item["startTime"] > dateRange[0] && item["endTime"] < dateRange[1])
      );
    });
  const workers = Array.from(
    new Set([...tasks.map((value) => value.worker)].sort())
  );
  const milestones = mockData2.staticMilestone.map((item) => {
    item["startTime"] = new Date(item["startTime"]);
    item["color"] = "red";
    return item;
  });
  const handleConfirm = () => {
    console.log(startDate.current.value);
    console.log(endDate.current.value);
    setDateRange([
      new Date(startDate.current.value),
      new Date(endDate.current.value),
    ]);
  };
  const handleAddDate = () => {
    setDateRange((olderDate) => {
      return [
        new Date(olderDate[0].getTime() + 604800000),
        new Date(olderDate[1].getTime() + 604800000),
      ];
    });
  };
  const handleReduceDate = () => {
    setDateRange((olderDate) => {
      return [
        new Date(olderDate[0].getTime() - 604800000),
        new Date(olderDate[1].getTime() - 604800000),
      ];
    });
  };

  const handleClick = (ev, value) => {
    // alert(JSON.stringify(value))
    console.log(ev, value);
    setSelect([value.id]);
  };
  return (
    <main className="min-h-screen  p-24">
        {/* <input
        class="rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        type="date"
        ref={startDate}
      /><span>开始时间</span>
      <input
        class="rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        type="date"
        ref={endDate}
      />
      <span>结束时间</span>
      <button
        class="mx-5 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        onClick={handleConfirm}
      >
        确认
      </button> */}
      <Link href={"/"}>
      <button
        class="mx-5 bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
      >
        返回上一页
      </button>
      </Link>

      <button
        class="mx-5 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        onClick={handleAddDate}
      >
        左移一周
      </button>
      <button
        onClick={handleReduceDate}
        class="mx-5 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
      >
        右移一周
      </button>
      <button
        onClick={()=>{
          let today = new Date()

          setDateRange([
            new Date(today.getTime()-1000*60*60*24*14),
            new Date(today.getTime()+1000*60*60*24*14)
          ])
        }}
        class="mx-5 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
      >
        今天
      </button>
      <button
        onClick={()=>{
          let today = new Date()

          setDateRange([
            new Date(today.getTime()-1000*60*60*24*30*3),
            new Date(today.getTime()+1000*60*60*24*30*3)
          ])
        }}
        class="mx-5 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
      >
        前后三个月
      </button>
      <button
        onClick={()=>{
          let today = new Date()

          setDateRange([
            new Date(today.getTime()-1000*60*60*24*30*6),
            new Date(today.getTime()+1000*60*60*24*30*6)
          ])
        }}
        class="mx-5 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
      >
        前后半年
      </button>
      <button
        onClick={()=>{
          let today = new Date()

          setDateRange([
            new Date(today.getTime()-1000*60*60*24*30*9),
            new Date(today.getTime()+1000*60*60*24*30*9)
          ])
        }}
        class="mx-5 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
      >
        前后9个月
      </button>
      <div style={{ marginBottom: 20 }} />
      <StaticGantt
        onClickBackground={() => {
          setSelect([]);
        }}
        onClick={handleClick}
        start={dateRange[0]}
        end={dateRange[1]}
        milestone={milestones}
        data={tasks}
        workers={workers}
        onMonthClick={(e, v) => {
          let d = new Date(v)
          setDateRange([
            new Date(d.getTime()-1000*60*60*24*14),
            new Date(d.getTime()+1000*60*60*24*14)
          ])
        }}
        onDayClick={(e, v) => {
          let d = new Date(v)

          setDateRange([
            new Date(d.getTime()-1000*60*60*24*14),
            new Date(d.getTime()+1000*60*60*24*14)
          ])
        }}
        selectedList={select}
      />
    </main>
  );
}
