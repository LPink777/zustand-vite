import useCount from "./store";

import "./app.scss";

// 输出一个计算器的样式组件 可以使用计算器进行加减操作
function App() {
  const { count, increase, decrease, reset } = useCount();

  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center flex-col text-[28px] font-bold bg-[#769654]">
        <div
          className="border-4 border-solid border-red-600 text-[20px] w-[200px] flex justify-center items-center cursor-pointer"
          onClick={increase}
        >
          increase
        </div>
        <div
          className="border-4 border-solid border-red-600 text-[20px] w-[200px] flex justify-center items-center mt-[20px] cursor-pointer"
          onClick={decrease}
        >
          decrease
        </div>
        <div
          className="border-4 border-solid border-red-600 text-[20px] w-[200px] flex justify-center items-center mt-[20px] cursor-pointer"
          onClick={reset}
        >
          reset
        </div>
        <div className="border-4 border-solid border-red-600 text-[20px] w-[200px] flex justify-center items-center mt-[20px] text-white">
          count: {count}
        </div>
      </div>
    </>
  );
}

export default App;
