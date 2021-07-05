import React, {useState} from "react";
import { Text, View, TouchableOpacity } from "react-native";
import TableBody from "./TableBody";

export default function TableHead({ styles, itemOuter, handleAlertButton }) {
  const [show, setShow] = useState(true);
  return (
    <View style={styles.tableSectionContainer}>
      <TouchableOpacity style={styles.tableTitleContainer} onPress={() => setShow(prev => !prev)}>
        <Text style={styles.tableSectionTitle}>{itemOuter.section}</Text>
        <Text style={[styles.tableSectionTitle, show ? styles.taken : styles.free]}>{show ? "-" : "+"}</Text>
      </TouchableOpacity>
      <View style={styles.tableWrapper}>
        {show ?
        itemOuter.data.map((itemInner) => (
          <TableBody
            styles={styles}
            itemInner={itemInner}
            section={itemOuter.section}
            handleAlertButton={handleAlertButton}
            key={itemInner.section_details.number}
          />
        ))
        : null}
      </View>
    </View>
  );
}
