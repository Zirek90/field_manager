import React from "react";
import { ScrollView } from "react-native";
import TableHead from "./TableHead";

export default function Table({ styles, data }) {
  return (
    <ScrollView contentContainerStyle={styles.tableContainer}>

      {data &&
        data.map((itemOuter) => (
          <TableHead
            styles={styles}
            itemOuter={itemOuter}
            key={itemOuter.section}
          />
        ))}
    </ScrollView>
  );
}
