
import { AuthForm } from "../components/form.component";
import { initSignedCall } from '../libs/clevertap-signedcall.module'
import clevertap from 'clevertap-web-sdk'
import { useRef, useState } from "react";
import { CallForm } from "../components/callform.wrapper";
import { CardRow } from "../components/card.component";
import { useStateWithCB } from "../hooks/useStateWithCallback";
import { generateCuid } from "../utils/cuid.generator";
import toast, { Toaster } from 'react-hot-toast';
export const EntryPage = () => {

  const [dcClient, setDcClient] = useState(null)
  const [isConnected, setIsConnected] = useState(false)
  const [showCaller, setShowCaller] = useStateWithCB(false, () => {
    callerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
  })
  const [showReceiver, setShowReceiver] = useStateWithCB(false, () => {
    receiverRef.current.scrollIntoView({
      behavior: 'smooth', block: 'center'
    })
  })
  const [cuid, setCuid] = useState(generateCuid(7))
  const cardRef = useRef(null)
  const callerRef = useRef(null)
  const receiverRef = useRef(null)

  clevertap.privacy.push({ optOut: false })
  clevertap.privacy.push({ useIP: false })
  clevertap.init('679-8Z7-W66Z', 'sk1')
  window.clevertap = clevertap


  // signin and validate the options
  const onSubmit = (initOptions) => {
    console.log("hit on connect")
    setCuid(initOptions.cuid)
    try {
      // clevertap.privacy.push({ optOut: false })
      // clevertap.privacy.push({ useIP: false })
      // clevertap.init(initOptions.ctAccId, initOptions.ctRegion)
      let clevertap = window.clevertap
      console.log({initOptions})
      // console.log(clevertap, DirectCallSDK)
      initSignedCall({
        ...initOptions,
        clevertap
      }).then(res => {
        window.signedCallClient = res
        setDcClient(res)
        setIsConnected(res.isEnabled())
        // scroll to card row section

        cardRef.current.scrollIntoView({
          behavior: 'smooth', block: 'center'
        })
      }).catch(err => console.log(err))

    } catch (err) {
      console.log(err)

    }

  }


  const showCallerOrReceiver = (type) => {
    if (type === 'caller') {
      setShowCaller(true)
      setShowReceiver(false)
    } else {
      setShowReceiver(true)
      setShowCaller(false)

    }
  }
 

  const makecall = ({ cuid, context }) => {
    dcClient.call(cuid, context).then(res => console.log(res))
    .catch((error) => {if(error.message !== undefined){toast.error(error.message,
      {position: 'top-center',
      duration: 5000,
      style:{width:"1500px",height:"100px"}})}})
  }
  // disconnects the sdk
  const disconnect = () => {
    dcClient.logout()
    setIsConnected(false)
    setShowReceiver(false)
    setShowCaller(false)
  }

  return (
    <>
      <h1 className="text-6xl	mt-6 pt-28">Signed Call</h1>
      <AuthForm submitFn={onSubmit} connected={isConnected} disconnect={disconnect}/>
      <div className={isConnected ? "block" : "hidden"}>
        <CardRow myref={cardRef} action={showCallerOrReceiver} />
      </div>
      <div className={showCaller ? "block" : "hidden"}>
        <CallForm myref={callerRef} call={makecall} />
      </div>
      <h1 className={`text-4xl pb-6 ${showReceiver ? "block" : "hidden"}`} ref={receiverRef}>Please ask the caller to call you at <i>{cuid}</i></h1>
      <Toaster/>
    </>
  )
}



