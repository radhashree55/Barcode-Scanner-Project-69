import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import scan from '../assets/scanner.jpg';


export default class ScanScreen extends React.Component {
  constructor(){
    super();
    this.state = {
      hasCameraPermissions: null,
      scanned: false,
      scannedData: '',
      buttonState: 'normal'
    }
  }

  getCameraPermissions = async () =>{
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    
    this.setState({
      /*status === "granted" is true when user has granted permission
        status === "granted" is false when user has not granted the permission
      */
      hasCameraPermissions: status === "granted",
      buttonState: 'clicked',
      scanned: false
    });
  }

  handleBarCodeScanned = async({type, data})=>{
    this.setState({
      scanned: true,
      scannedData: data,
      buttonState: 'normal'
    });
  }

  render() {
    const hasCameraPermissions = this.state.hasCameraPermissions;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;

    if (buttonState === "clicked" && hasCameraPermissions){
      return(
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      );
    }

    else if (buttonState === "normal"){
      return(
        <View style={styles.container}>

        <Text style={styles.barcodeText}>Bar Code/QR Code Scanner</Text>
        <Image source={scan}/>

        <Text style={styles.displayText}>{hasCameraPermissions===true
          ? this.state.scannedData: "Request Camera Permission"}</Text>

        <TouchableOpacity
          onPress={this.getCameraPermissions}
          style={styles.scanButton}>
          <Text style={styles.buttonText}>Scan Bar Code/QR Code</Text>
        </TouchableOpacity>
      </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  displayText:{
    fontSize: 18,
    textDecorationLine: 'underline',
    marginBottom:20,
  },
  scanButton:{
    backgroundColor: 'grey',
    padding: 10,
    margin: 10
  },
  buttonText:{
    fontSize: 23,
    fontWeight:'bold'
  },
  barcodeText:{
    backgroundColor: 'gray',
    textAlign:'center',
    fontSize: 38,
    fontWeight:'bold',
    marginBottom:50,
  }
});