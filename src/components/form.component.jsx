import { useState } from "react"
import { ctAccountAndRegions } from "../utils/constants";
import Select from 'react-dropdown-select';


function randomString(length, chars) {
  var result = '';
  for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}


const generateRandomCuid = () => (
  randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
)

/**
 * 
 * @returns 
 */
export const AuthForm = ({ submitFn, connected, disconnect }) => {
  const [cuid, setCuid] = useState(generateRandomCuid)
  const [ctAccId, setCtAccId] = useState("")
  const[scAccountId, setScAccountId] = useState('')
  const[scApikey, setScApikey] = useState('')
  const [ctRegion, setCTRegion] = useState("in1")

  const onRegionChange = (value) => {
    setCTRegion(value[0]?.label)
    // setCtAccId(value[0]?.value)
  }
  
  const submit = (e) => {
    e.preventDefault();
    if (!connected) {
      submitFn({
        cuid: cuid,
        accountId: scAccountId,
        apikey: scApikey,
        ctAccId,
        ctRegion
      })
    } else {
      disconnect()
    }
  }

  return (
    <>
      <div className="m-auto mt-10 sm:mt-0 w-5/12 pt-20">
        <div className="mt-5 md:mt-0 md:col-span-2">
          <form action="#" className="text-left" onSubmit={submit}>
            <div className="shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 bg-white sm:p-6">
               
                <div className="grid gap-6 ">
                  <div className="col-span-12 sm:col-span-12">
                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                      CT Account Id *
                    </label>
                    <input
                      type="text"
                      name="dc-accountid"
                      id="dc-accountid"
                      placeholder="Clevertap's account id available in the dashboard"
                      autoComplete="family-name"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      required={true}
                      value={ctAccId}
                      // disabled={true}
                      onChange={e => setCtAccId(e.target.value)}
                    />
                  </div>

                  <div className="col-span-12 sm:col-span-12">
                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                      SC Account Id *
                    </label>
                    <input
                      type="text"
                      name="dc-accountid"
                      id="dc-accountid"
                      placeholder="Signed Call's account id available in the dashboard"
                      autoComplete="family-name"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      required={true}
                      value={scAccountId}
                      // disabled={true}
                      onChange={e => setScAccountId(e.target.value)}
                    />
                  </div>

                  <div className="col-span-12 sm:col-span-12">
                    <label htmlFor="dc-api-key" className="block text-sm font-medium text-gray-700">
                      SC Api Key *
                    </label>
                    <input
                      type="text"
                      name="sc-api-key"
                      id="sc-api-key"
                      autoComplete="dc-apikey"
                      placeholder="Signed Call's api key available in the dashboard"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      required={true}
                      value={scApikey}
                      // disabled={true}
                      onChange={e => setScApikey(e.target.value)}
                    />
                  </div>
                  {/* <div className="col-span-6">
                    <label htmlFor="cc" className="block text-sm font-medium text-gray-700">
                      CC
                    </label>
                    <input
                      type="number"
                      name="cc"
                      id="cc"
                      autoComplete="cc"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      value={cc}
                      min="1"
                      onChange={e => setCC(e.target.value)}
                    />
                  </div> */}

                  {/* <div className="col-span-6 sm:col-span-6 lg:col-span-6">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <input
                      name="phone"
                      id="phone"
                      autoComplete="address-level2"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      value={phone}
                      min="1"
                      type="number"
                      onChange={e => setPhone(e.target.value)}
                    />
                  </div> */}
                </div>
                <br/>
                <div className="grid gap-6 mb-6">
                  <div className="col-span-12 sm:col-span-12">
                    <label htmlFor="cuid" className="block text-sm font-medium text-gray-700">
                      Cuid 
                    </label>
                    <div>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="text"
                          name="cuid"
                          id="cuid"
                          autoComplete="cuid"
                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
                          required={true}
                          value={cuid}
                          onChange={e => setCuid(e.target.value)}
                          placeholder="email@clevertap.com"
                        />
                        <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                          @clevertap.com
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-12 sm:col-span-12" style={{"paddingBottom": 100}}>
                    <label htmlFor="sc-region" className="block text-sm font-medium text-gray-700">
                      Select Region
                    </label>
                    <Select
                      options={ctAccountAndRegions}
                      id="sc-region"
                      onChange={(values) => onRegionChange(values)}
                    />
                  </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 mt-5">
                {
                  connected ? <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
                  >
                    Disconnect
                  </button> : <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Connect
                  </button>
                }

              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}