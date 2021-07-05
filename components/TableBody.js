import React, { useState, useContext } from "react";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import {
  SectionDetailContext,
  HandleToggleSectionTakenStateContext,
  AddExtraInfoContext,
} from "../context/SectionContext";

export default function TableBody({ styles, itemInner, section }) {
  const [active, setActive] = useState(false);
  const { extraInfo, setExtraInfo } = useContext(SectionDetailContext);
  const { handleToggleSectionTakenState } = useContext(HandleToggleSectionTakenStateContext);
  const { addExtraInfo } = useContext(AddExtraInfoContext);

  return (
    <>
      <TouchableOpacity
        style={[styles.tableContentWrapper, itemInner.section_details.taken ? styles.takenBorder : styles.freeBorder]}
        onPress={() => setActive(true)}
        key={itemInner.section_details.number}
      >
        <Text
          style={[
            { width: 10, color: "red", fontWeight: "bold" },
            itemInner.section_details.taken ? styles.taken : styles.free,
          ]}
        >
          {itemInner.section_details.taken ? "X" : "V"}
        </Text>
        <Text style={{ width: 50 }}>{itemInner.section_details.number}</Text>
        <View style={{ width: 200 }}>
          {itemInner.section_details.extra_details.length ? (
            <Text>{itemInner.section_details.extra_details[0]}</Text>
          ) : null}
        </View>
      </TouchableOpacity>
      {active ? (
        <View>
          <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: "#40c204" }]}
              onPress={() => {
                const sectionNumber = itemInner.section_details.number.slice(1);
                handleToggleSectionTakenState(section, sectionNumber, itemInner.section_details.taken);
              }}
            >
              <Text style={styles.btnText}>Zmień state</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActive(false)} style={[styles.btn, { backgroundColor: "#ed1140" }]}>
              <Text style={styles.btnText}>Anuluj</Text>
            </TouchableOpacity>
          </View>
          <View style={{ margin: 5 }}>
            <TextInput
              placeholder="Twój komentarz"
              style={{ borderBottomColor: "grey", borderWidth: 1, borderRadius: 5, padding: 5 }}
              value={extraInfo}
              onChangeText={(extraInfo) => setExtraInfo(extraInfo)}
            />
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: "#edc707", width: "100%" }]}
              onPress={() => {
                const sectionNumber = itemInner.section_details.number.slice(1);
                addExtraInfo(section, sectionNumber);
              }}
            >
              <Text>Dodaj komentarz</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </>
  );
}
