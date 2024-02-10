import { Image,
   Text, View, ScrollView ,
    Button,Alert,StyleSheet,
   Pressable,StatusBar,
   ActivityIndicator} from "react-native";
   import Greet  from "./components/Greet";
const logoimg =require("./assets/spider.jpg");



export default function App(){
  return (
     <View style={{ flex:1 ,backgroundColor:"plum", padding:60}}>
      <StatusBar backgroundColor={"plum"}/>
      <ActivityIndicator size={"large"} color="midnightblue"/>
      <ScrollView>
    
    
    
    
    
    
    
    
    
    
        <Greet naame='brucee'/>
        <Greet naame='brayan'/>

        <Pressable onPress={()=> console.log("pressed")}>
    <Image source={logoimg} style={{width: 300, height:300}} />
    </Pressable>
    <Text>
      Spider-Man: No Way Home is a 2021 American superhero film based on the 
      Marvel Comics character Spider-Man, co-produced by Columbia Pictures an
      d Marvel Studios, and distributed by Sony Pictures Releasing. It is the 
      sequel to Spider-Man: Homecoming (2017) and Spider-Man: Far From Home 
      (2019), and the 27th film in the Marvel Cinematic Universe (MCU). 
      The film was directed by Jon Watts and written by Chris McKenna and Erik
       Sommers. It stars Tom Holland as Peter Parker / Spider-Man alongside Ze
       ndaya, Benedict Cumberbatch, Jacob Batalon, Jon Favreau, Jamie Foxx, W
       illem Dafoe, Alfred Molina, Benedict Wong, Tony Revolori, Marisa Tomei
       , Andrew Garfield, and Tobey Maguire. In the film, Parker asks Dr. Ste
       phen Strange (Cumberbatch) to use magic to make his identity as Spide
       r-Man a secret again after this was revealed to the world at the end 
       of Far From Home. When the spell goes wrong because of Parker's
       actions, the multiverse is broken open and visitors from alternate re
       alities are brought into Parker's universe.
       
      </Text>
      
      <Button   style={{padding:100}} 
      title="press"
      color="midnightblue"
      
     onPress={()=>Alert.alert ("Invalid data","DOB Incorrect",[
      {text: 'Cancel',
        onPress:()=>console.log("cancel pressed")
      },
      {text: 'okay',
        onPress:()=>console.log("cancel pressed")
      },

     ])}
     />
    
    
  </ScrollView>
</View>
  );
} 

