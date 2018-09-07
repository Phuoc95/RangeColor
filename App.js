import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Slider,
  TextInput,
} from 'react-native';


// create component  ColorControl
class  ColorControl extends Component {
  constructor(props){
    super(props);
    this.state = props
  }
  render(){
    return(
      <View style={{ flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center' }} >
        <Text>{this.props.title}</Text>
        <Slider onValueChange={ (val) => {
            this.props.onValueChanged(val)
            // bat su kien truyen bien qua  props
            // this.setState({value:val})
        } } value={ this.props.value } step={1}  minimumValue={0} maximumValue={255}  style={{ width:200, marginLeft: 5, marginRight: 5}}></Slider>
                      {/* cần DL là 1 số */}
        <View>
          <TextInput value={ `${this.props.value}` } style={ styles.textInput }></TextInput>
                           {/* cần DL là 1 chuỗi -> dùng phép nối */}
        </View>
      </View>
    )
  }
}
// End component  ColorControl


type Props = {};
export default class App extends Component<Props> {
 
  constructor(props){
    super(props);
    this.state  = {
      red:100,
      green:150,
      blue:20
    };
  }
  onSlideValueChanged = (color) => {
    this.setState(color);
     console.log(color);
  }   
  renderHeader = () => {
    return (
      <View style={ styles.header } >
          <Text style={ styles.headerText} > Color Picker </Text>
      </View>
    )
  }
  render() {
    return (
      <View style={styles.container}>
       { this.renderHeader() }  
      
        <View style={{ flex:1, alignItems:'center', justifyContent:'center',}}>
           <View style={{width:300, height:450, flexDirection:'column'}} >

            {/*  Choose color    */}
              <View style={{flex:1}} >
                <ColorControl title="R" value={this.state.red} onValueChanged={ (val)=>{  // dat teb props tuong ung
                  const currentColor = this.state;
                  const newColor  = { ...currentColor,red:val}
                  this.onSlideValueChanged(newColor) ;
                } }/>    

                <ColorControl title="G" value={this.state.green} onValueChanged={ (val)=>{
                  const currentColor = this.state;
                  const newColor  = { ...currentColor,green:val}
                  this.onSlideValueChanged(newColor) ;
                } } />
                
                <ColorControl title="B" value={this.state.blue} onValueChanged={ (val)=>{
                  const currentColor = this.state;
                  const newColor  = { ...currentColor,blue:val}
                  this.onSlideValueChanged(newColor) ;
                } }/>         
              </View>
            {/* END Choose color    */}

            {/* do component cha quan ly -> phai dung dan xuat hamf      */}
              <View style={{flex:1,backgroundColor:`rgb( ${ this.state.red}, ${this.state.green}, ${this.state.blue} )`}} ></View>
           </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  header:{
    backgroundColor:'#ECEFF1',
    height:65,alignItems:'center',
    justifyContent:'center',
    shadowColor:'gray',
    elevation:5
  },
  headerText:{
    fontSize:17,
    ...Platform.select({
      ios:{
        marginTop:15
      },
      android:{
        marginTop:0
      }
    })
  },
  textInput:{
    width:50,
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,    
    ...Platform.select({
      ios:{
        paddingBottom: 10,
      },
      android:{
        paddingBottom: 5,
      }
    })
  },
});
