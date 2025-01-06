import { useState } from "react"
import { Create, DeleteData, Fetch } from "../endpoints/expenseapi";
import { useEffect } from "react";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";


export const Home = () => {
  const [storedata, setStoreData] = useState([]);
  const [expense, setExpense] = useState('');
  const [budget, setBudget] = useState('');
  const [description, setDescription] = useState('');
  const [showmore, setShowMore] = useState(false);
  const [searchquery,setSearchQuery] = useState('');

  const Handledata = async (e) => {
    e.preventDefault();

    const expensedata = { expense, budget, description }
    const getdata = await Create(expensedata);
    setStoreData([...storedata, getdata]);
    setExpense('');
    setBudget('');
    setDescription('');
  }

  useEffect(() => {
    const HandleFetchAll = async () => {
      const data = await Fetch();
      setStoreData(data);
    }
    HandleFetchAll();
  }, [])

  const balance = storedata.length > 0
    ? storedata.reduce((accum, item) => accum + (parseFloat(item.budget) - parseFloat(item.expense)), 0)
    : 0;

  const DeletId = async (id) => {
    await DeleteData(id);
    const filterdata = storedata.filter(item => item._id !== id);
    setStoreData(filterdata);
  }

   const Filterdata = storedata.filter((item)=>item.description.toLowerCase().includes(searchquery.toLowerCase()))

  return (
    <div className="h-auto font-serif w-full flex justify-center mt-[15px]">
      <div className="bg-gray-100 h-auto w-[500px] border-2 border-gray-400 rounded-2xl p-[10px]" id="animate">
        <h1 className="text-center font-bold text-xl text-blue-800" id="txt">WELCOME TO OUR <br />EXPENSE TRACKER APP</h1>
        <hr />
        <div>
          <div className="flex justify-between mt-[15px]">
            <h1 className="text-xl font-semibold font-sans">Balance: {balance}</h1>
            {!showmore ? (
              <button type="button" className="text-xl p-2 w-[70px] text-white font-bold rounded-lg outline-none
                 shadow-md shadow-gray-900 hover:scale-105 duration-300 bg-sky-500" onClick={() => setShowMore(true)}>ADD</button>
            ) : (
              <button type="button" className="text-xl p-2 w-[100px] text-white font-bold rounded-lg outline-none
                shadow-md shadow-gray-900 hover:scale-105 duration-300 bg-sky-500" onClick={() => setShowMore(false)}>CANCEL</button>
            )}
          </div>
          {showmore && (
            <div>
              <div className="mt-[20px]">
                <form onSubmit={Handledata}>
                  <div className="flex justify-between gap-x-2">
                  <div className="relative">
                      <label className="font-semibold text-xl">Expense:</label>
                      <input type="text" placeholder="Enter Expense Here:-" value={expense} onChange={(e) => setExpense(e.target.value.replace(/[^0-9.]/g, ''))}
                        className="mt-2 p-2 font-sans border-2 border-gray-500 hover:scale-105 duration-300 rounded-lg shadow-md shadow-gray-500 outline-none pl-8" />
                      <RiMoneyRupeeCircleLine className="absolute top-[60px] left-2 transform -translate-y-1/2 text-xl text-gray-500" />
                    </div>
                    <div className="relative">
                      <label className="font-semibold text-xl">Budget:</label>
                      <input type="text" placeholder="Enter Budget Here:-" value={budget} onChange={(e) => setBudget(e.target.value.replace(/[^0-9.]/g, ''))}
                        className="mt-2 font-sans p-2 border-2 border-gray-500 hover:scale-105 duration-300 rounded-lg shadow-md shadow-gray-500 outline-none pl-8" />
                      <RiMoneyRupeeCircleLine className="absolute top-[60px] left-2 transform -translate-y-1/2 text-xl text-gray-500" />
                    </div>
                  </div>
                  <div className="mt-[15px]">
                    <label className="font-semibold text-xl">Description:</label><br />
                    <input type="text" placeholder="Enter Description Here:-" value={description} onChange={(e) => setDescription(e.target.value)}
                      className="mt-2 p-2 border-2 border-gray-500 hover:scale-105 duration-300 rounded-lg shadow-md shadow-gray-500 outline-none" />
                  </div>
                  <div>
                    <button type="submit" className="text-xl p-2 w-[100px] text-white font-bold rounded-lg
                shadow-md shadow-gray-900 hover:scale-105 duration-300 bg-sky-500 mt-[10px]">Submit</button>
                  </div>
                </form>
              </div><br />
            </div>
          )}<br />
          <hr /><br />
          <div>
            <h1 className="font-semibold text-xl">Transactions:</h1><br />
            <div className="flex justify-center items-center">
              <input type="text" placeholder="Search Here:-"
              value={searchquery} onChange={(e)=>setSearchQuery(e.target.value)}
                className="w-full outline-none border-2 border-gray-500 p-2 rounded-xl shadow-md shadow-gray-900" />
            </div><br />
            <div>
              {Filterdata.length > 0 ? (
               Filterdata.map((item, index) => (
                  <div key={index} className="shadow-md shadow-gray-950 animate-pulse flex flex-wrap justify-around border-2 border-gray-400 mb-2 p-2 items-center font-medium rounded-xl">
                    <div className="w-full">
                      <h1 className="text-lg">{item.description}</h1>
                    </div>
                    <div className="w-full sm:w-auto">
                      <h1 className="font-sans text-lg"><RiMoneyRupeeCircleLine className="text-2xl inline-flex"/>{item.budget}</h1>
                    </div>
                    <div className="w-full sm:w-auto">
                      <h1 className="font-sans text-sm">{new Date(item.date).toLocaleDateString()}</h1>
                    </div>
                    <div className="w-full sm:w-auto mt-2">
                      <button type="button" onClick={() => DeletId(item._id)} className="text-xl p-2 w-[120px] text-white font-bold rounded-lg shadow-md shadow-gray-900 hover:scale-105 duration-300 bg-sky-500">
                        REMOVE
                      </button>
                    </div>
                  </div>
                ))
              ) : (
               <div>
                 <p className="text-center text-xl font-serif font-bold
                 text-red-600">No data Available</p>
               </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}