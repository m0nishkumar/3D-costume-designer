import React ,{Suspense, useEffect,useState}from 'react'
import { AnimatePresence ,motion} from 'framer-motion'
import { useSnapshot } from 'valtio'
import { state } from '../store/Index'
import { Dallepicker } from '../picker/Dallepicker'
import { Colorpicker } from '../picker/Colorpicker'
import { Imagepicker } from '../picker/Imagepicker'
import { Editortabs } from '../picker/Tabs'
import { Tab } from '../picker/Tab'
import { slideAnimation } from '../config/motion'
import { fadeAnimation } from '../config/motion'
import CustomButton from '../components/CustomButton'
import { FilterTabs } from '../picker/Tabs'
import { DecalTypes } from '../picker/Tabs'
import { Shirt } from '../Canvas/Shirt'
import { Canvas } from '@react-three/fiber'
import { Center, Environment } from '@react-three/drei'
import { Camera } from '@react-three/fiber'
import { CameraRig } from '../Canvas/CameraRig'
import { Backdrop } from '@react-three/drei'
import { Pant } from '../Canvas/Pant'
import { Shoe } from '../Canvas/Shoe'
import { Scene } from '../Canvas/Scene'
import { CameraRigP } from '../Canvas/CameraRigP'
import { CameraRigPC } from '../Canvas/CameraRigPC'
import axios from 'axios'
import google from '../assets/google.png'
import cartoon from '../assets/shoe-cartoon.png'
import { saveAs } from 'file-saver'


export const Customizer = () => {
  const snap=useSnapshot(state);
  const [file, setFile] = useState('');
  const [prompt, setPrompt] = useState('');
  const [image_list, setImage_list] = useState([]);
  const [generatingImg, setGeneratingImg] = useState(false);
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  })
  const [input_img,setInput_img]=useState("");
  const [imageSearch,setImageSearch]=useState(true);

  function importAll(r) {
    return r.keys().map(r);
  }
  
  const images = importAll(require.context('C:/startup/choosy/src/assets/stripes', false, /\.(png|jpe?g|svg|avif|webp)$/));
  const images1 = importAll(require.context('C:/startup/choosy/src/assets/design', false, /\.(png|jpe?g|svg|avif|webp)$/));
  const images2 = importAll(require.context('C:/startup/choosy/src/assets/pattern', false, /\.(png|jpe?g|svg|avif|webp)$/));
const imagesAll={"Stripes":images,"Pattern":images1,"Design":images2}
  function Loading() {
    return <div>Loading...</div>;
  }
  console.log(images)
  const getContrastingColor = (color) => {
    // Remove the '#' character if it exists
    const hex = color.replace("#", "");
  
    // Convert the hex string to RGB values
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
  
    // Calculate the brightness of the color
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  
    // Return black or white depending on the brightness
    return brightness > 128 ? "black" : "white";
  };

  const handleSubmit = async (type) => {
    if(!prompt) return alert("Please enter a prompt");

    try {
      setGeneratingImg(true);

      const response = await fetch('http://localhost:8080/api/v1/dalle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt,
        })
      })

      const data = await response.json();

      handleDecals(type,`data:image/png;base64,${data.photo}`)
    } catch (error) {
      alert(error)
    } finally {
      setGeneratingImg(false);
      setActiveEditorTab("");
    }
  }
  const [activeEditorTab, setActiveEditorTab] = useState("");
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <Colorpicker/>
      case "filepicker":
        return <Imagepicker
        file={file}
        setFile={setFile}
        readFile={readFile}
      />
      case "aipicker":
        return <Dallepicker
        prompt={prompt}
        setPrompt={setPrompt}
        generatingImg={generatingImg}
        handleSubmit={handleSubmit}
      />
      default:
        return null;
    }
  }

  const handleActiveFilterTab = (tabName) => {
    console.log(tabName)
    switch (tabName) {
      case "logoShirt":
          state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
        console.log(snap.isFullTexture)
          state.isFullTexture = !activeFilterTab[tabName];
          console.log(snap.isFullTexture)
          console.log("stylish" )
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }
    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName]
      }
    })}

  const readFile = (type) => {
    console.log(file)
    reader(file)
      .then((result) => {
        console.log(result)
        handleDecals(type, result);
        setActiveEditorTab("");
        console.log(result)
      })
  }

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];
    if(type=="full"){
      if(snap.shoe_active){state.fullDecalS=result;state.isFullTextureS=true}else{if(snap.pant_active){state.fullDecalP=result;state.isFullTextureP=true}else{state[decalType.stateProperty] = result
      console.log("hii")}
    }}
    else{
      state[decalType.stateProperty] = result;
    }

    if(!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab)
    }
  }

  const get_image=()=>{
    axios.get("http://localhost:5000/related",{
      params:{
        text:input_img
      }
    })
    .then((res)=>{
      console.log(res.data)
      setImage_list(res.data)
    })
  }

  const downloadImage = (url) => {
    console.log(url)
    axios.get("http://localhost:5000/download",{
      params:{
        img:url
      }
    })
  }
  

  const reader = (file) =>
  new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.readAsDataURL(file);
  })

  return (
    <div className=''>
      
      <AnimatePresence>
        {
          !snap.intro && (
            <div>
            <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation('left')}
          >
<div className="flex items-center min-h-[88vh]">
            <div className='editortabs-container tabs'>
                {
                  Editortabs.map((tab)=>{
                    return(
                      <Tab 
                      key={tab.name}
                      tab={tab}
                      handleClick={() => setActiveEditorTab(tab.name)}
                      />
                    )
                  })
                }
                {generateTabContent()}
              </div>
              </div>
             
            </motion.div>

            <motion.div
            className='filtertabs-container'
            {...slideAnimation("up")}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => handleActiveFilterTab(tab.name)
                }
                statee={imageSearch}
                setStatee={setImageSearch}
              />
            ))}
          </motion.div>

      <motion.div
            className="absolute z-10 top-5 left-5"
            {...fadeAnimation}
          >
            <CustomButton 
              type="filled"
              title="Go Back"
              handleClick={() => state.intro = true}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>

          <motion.div
            className="absolute z-10 bottom-5 left-5 "
            {...fadeAnimation}
          >
            <button className='bg-black p-3 py-2.5 rounded-lg text-white font-semibold' onClick={()=>{
              state.pngg=true
            }}>Download</button>
          </motion.div>

      <motion.div
            className="absolute z-10 top-0 right-0 h-full w-fit m-2"
            {...fadeAnimation}
          >

 {
(!imageSearch)?    
<div className='flex flex-col h-full w-fit'>
<div className='editortabs-container1 h-full flex flex-col justify-start items-start'>
<div className='h-[95%]' onClick={()=>{
  state.shirt_active=true
  state.pant_active=false
  state.shoe_active=false
}}>
    <Canvas
        shadows
        camera={{ position: [0,0,0], fov:20 }}
        gl={{ preserveDrawingBuffer: true }}
        className="w-full max-w-full h-full transition-all ease-in"
      >
        <ambientLight intensity={0.5} />
        <Environment preset="city" />
        <CameraRig>
          <Center>
            <Shirt stat={false} />
          </Center>
        </CameraRig>
      </Canvas> 
      </div>
      
<div className='h-[110%]' onClick={()=>{
  state.shirt_active=false
  state.pant_active=true
  state.shoe_active=false
}}>

      <Canvas
        shadows
        camera={{ position: [0,0,1000]}}
        gl={{ preserveDrawingBuffer: true }}
        className="w-full max-w-full h-full transition-all ease-in"
      >
        <ambientLight intensity={0.5} />
        <Environment preset="city" />
        <CameraRigPC>
          <Center>
            <Scene stat={false}/>
          </Center>
        </CameraRigPC>
      </Canvas>
      </div>

      
<div className='h-[20%]' onClick={()=>{
  state.shirt_active=false
  state.pant_active=false
  state.shoe_active=true
}}>
      <Canvas
        shadows
        camera={{ position: [0,0,0], fov:40 }}
        gl={{ preserveDrawingBuffer: true }}
        className="w-full max-w-full h-full transition-all ease-in"
      >
        <ambientLight intensity={0.5} />
        <Environment preset="city" />
        <CameraRig>
          <Center>
            <Shoe stat={false}/>
          </Center>
        </CameraRig>
      </Canvas>
      </div>

              </div>

              </div>
              :
              <div className='editortabs-container2 px-5 w-[470px] max-h-[85vh] flex flex-col items-center'>
                <div className='inputWithButton flex flex-row space-x-1 items-center pt-2'>
                  <img src={google} className='w-9 h-9'/>
                <input type='text' value={input_img} placeholder='Search images...' className='w-[360px] editortabs-container2 shadow-2xl px-5 text-black h-10' onChange={(e)=>{
setInput_img(e.target.value)
                }}/>
                <div onClick={()=>{
get_image() }}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 z-50">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"  />
</svg></div></div>

<div className='flex flex-row space-x-2 mt-2 px-5 justify-start items-start w-full'>
  <button className='bg-white p-1 px-2 rounded-xl'>Stripes</button>
  <button className='bg-white p-1 px-2 rounded-xl'>Design</button>
  <button className='bg-white rounded-xl p-1 px-2'>Pattern</button>
  <button className='bg-white rounded-xl p-1 px-2'>Plain</button>
  <button className='bg-white rounded-xl p-1 px-2'>Gradient</button>
</div>

<div className="overflow-auto scrollbar-hide no-scrollbar flex flex-row flex-wrap gap-5 justify-center items-center my-5">
{(image_list.length>0)?
<h1 className="text-lg w-full px-5 self-start" style={{fontFamily:"poppins"}}>Find your perfect design🤩</h1>:<></>}
{
  image_list.map((i)=>{
    return(
      <div onClick={(event) => {
        event.preventDefault();
        downloadImage(i)
      }}>
        <img src={i} className='h-[200px] w-[180px] rounded-sm' />
      </div>
    )
  })
}

  <h1 className="text-lg w-full px-5 self-start" style={{fontFamily:"poppins"}}>Choose from Stripe Materials🤩</h1>

  {
    imagesAll["Stripes"].map((i)=>{
      return(
<div onClick={(event) => {
  event.preventDefault();
  handleDecals("full",i)
}}>
  <img src={i} className='h-[200px] w-[180px] rounded-sm' />
</div>
      )
    })
  }
  <h1 className="text-lg w-full px-5 self-start" style={{
                  fontFamily:"poppins"
                }}>Choose from Pattern Materials🤩</h1>
 {
      imagesAll["Design"].map((i)=>{
        return(
  <div onClick={(event) => {
    event.preventDefault();
    handleDecals("full",i)
  }}>
    <img src={i} className='h-[200px] w-[180px] rounded-sm' />
  </div>
        )
      })
 }
<h1 className="text-lg w-full px-5 self-start" style={{
                  fontFamily:"poppins"
                }}>Choose from Design Materials🤩</h1>
{
   imagesAll["Pattern"].map((image, index)=>{
      return(
        <div onClick={() => {
          handleDecals("full",image)
        }}>

  <img key={index} src={image} alt="info" className='h-[200px] w-[180px] rounded-sm'></img>
  </div>)
    })
  }
</div>
              </div>}


          </motion.div>

            </div>
          )
        }

      </AnimatePresence>

    </div>
  )
}
