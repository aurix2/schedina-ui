import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Alert,TextInput } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
const SchedinaTab = (props) =>{
  const [tableHead, setTableHead] = useState( ['Team 1', 'Team 2', 'Pronostico22']);
  /*const [tableData, setTableData] = useState(await async() => {
  var a =  [
    ['1', '2', '3'],
    ['a', 'b', 'c'],
    ['1', '2', '3'],
    ['a', 'b', 'c']
  ];
  console.log("table Data", a);
return a;});*/
const [tableData, setTableData] = useState([[]]);

 async function setBetterData()
  {
    try{
    var response = await  fetch('https://d0cwfy8ddg.execute-api.eu-central-1.amazonaws.com/dev/schedinaOps');
    var result = await response.json();
    var i = 0;
    var table = [];
    for(i=0; i< result.length; i++){

      table.push([result[i].TEAM1,result[i].TEAM2,result[i].PREDICTION]);

    }
   console.log("table Data", table);
  
   setTableData(table);
  }catch(e){
throw(e);
  }
  }

  useEffect(() => {
    setBetterData();
  }, []);

  const onChangeText = (text)=>{
   console.log('prova');
  } 
  const element = (data, index) => (
    <TextInput
     style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
     onChangeText={text => this.onChangeText(text)}
     value={data}
   />
   );

   return (
    <View style={styles.container}>
      <Table borderStyle={{borderColor: 'transparent'}}>
        <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
        { tableData.map((rowData, index) => (
            <TableWrapper key={index} style={styles.row}>
              {
                rowData.map((cellData, cellIndex) => (
                  <Cell key={cellIndex} data={cellIndex === 2 ? element(cellData, index) : cellData} textStyle={styles.text}/>
                ))
              }
            </TableWrapper>
          ))
        }
      </Table>
    </View>
  )

}
export default class  extends Component {
  constructor(props) {
    super(props);
  };
   

  render() {
   return( <View style={styles.container}>
     <SchedinaTab/>
 </View>);
    
  }
}
 
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#808B97' },
  text: { margin: 6 },
  row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
  btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#fff' }
});
