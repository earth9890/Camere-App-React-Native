import React,{useState} from "react";
import { Text, View,StyleSheet,TouchableOpacity,Button,Image, ImageBackground } from 'react-native';

import { RNCamera } from "react-native-camera";


const PrendingView = () =>
(
  <View style={
    {
      flex: 1,
      justifyContent: "center",
      alignItems : "center",
    }
  }>
    <Text style= {{fontSize:30,color :"red"}}>Loading...</Text>
  </View>

  )
const App = () => {

  const [image, setImage] = useState(null);

  const takePicture = async (camera) => {
    try {
      const optins = { quality: 0.9, base64: false }
      const data = await camera.takePictureAsync(optins)
      setImage(data.uri);


    } catch (error) {
      console.warn(error);
    }
   

  };


   return (
        
      <View style = {styles.container}>
       {image ? (
         <View style = {styles.preview}>
           <Text style={styles.camtext}>
         Here Is your new Profile Pic 
           </Text>
             <Image style = {styles.click} source={{uri: image ,width : '100%',height : '80%'}}/>
           </View>) :
         (
           <RNCamera style={styles.preview} type={RNCamera.Constants.Type.back}
             captureAudio={false}
             flashMod={RNCamera.Constants.FlashMode.auto}
             androidCameraPermissionOptions={
               {
                 title: "Premission to use Camera",
                 message: "longer text to use Camera",
                 buttonPositive: "OK",
                   buttonNagative : "Cancel"
               }
             }
             androidRecordAudioPermissionOptions={{
                title: "Premission to use Audio",
                 message: "longer text to use Audio",
                 buttonPositive: "OK",
                   buttonNagative : "Cancel"
             
             }}
           > 
             {({camera, status}) => {
               if (status !== 'READY')
                 return<PrendingView/>
               return (
                 <View style={{
                   flex: 0,
                   justifyContent: "center",
                   flexDirection: "row",
                 }}>
                   <TouchableOpacity   onPress={() => takePicture(camera)}
                    style = {styles.captuer}
                    >
                     <Text>
                       Snap
                     </Text>
                   </TouchableOpacity>
                 </View>
               )
             }}
            
           </RNCamera>
         )}  
      </View>
    )
};


const styles = StyleSheet.create(
  {
    container: 
    {
      flex: 1,
      backgroundColor :"#0A79DF"
      
    },
    preview:
    {
      flex: 1,
      justifyContent: "space-around",
      alignItems : "center",
    },
    captuer:
    {
      flex: 0,
      backgroundColor: "orange",
      padding: 20,
      alignSelf: "center",

      
    },
    camtext:
    {
      backgroundColor: "#3498DB",
      color: "#FFFFFF",
      marginBottom: 10,
      width: '100%',
      textAlign: "center",

      fontSize: 25,
      
      
    },
    click: 
    {
      width: 300,
      height: 300,
      borderRadius: 150,
      
    }
  }
)
export default App;


