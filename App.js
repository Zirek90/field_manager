import React, { useState, useEffect } from "react";
import { Alert, StyleSheet, Text, View, ActivityIndicator, Dimensions } from "react-native";
import Table from "./components/Table";
import {
  SectionDetailContext,
  HandleToggleSectionTakenStateContext,
  AddExtraInfoContext,
} from "./context/SectionContext";


const URL = "";

export default function App() {
  const [sectorData, setSectorData] = useState(null);
  const [progress, setProgress] = useState(false);
  const [extraInfo, setExtraInfo] = useState("");

  async function getData() {
    try {
      setProgress(true);
      const response = await fetch(URL);
      const res = await response.json();

      setSectorData(res.results);
    } catch (err) {
      Alert.alert("Błąd serwera");
    } finally {
      setProgress(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  async function addExtraInfo(section, sectionNumber) {
    try {
      setProgress(true);
      await fetch(URL, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ section, sectionNumber, extraInfo, action: "ChangeNote" }),
      });

      await getData();
    } catch (err) {
      Alert.alert("Błąd serwera add");
    } finally {
      setExtraInfo("")
      setProgress(false);
    }
  }

  async function handleToggleSectionTakenState(section, sectionNumber, state) {
    try {
      setProgress(true);
      await fetch(URL, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ section, sectionNumber, state: !state, action: "ChangeState" }),
      });

      await getData();
    } catch (err) {
      Alert.alert("Błąd serwera toggle");
    } finally {
      setProgress(false);
    }
  }

  //? NOT USABLE WITH WEB, SAVED FOR LATER
  // const handleAlertButton = (section, sectionNumber, state) => {
  //   Alert.alert("Cóż chcesz uczynić?", sectionNumber, [
  //     {
  //       text: "Zmień status",
  //       onPress: () => handleToggleSectionTakenState(section, sectionNumber, !state),
  //     },
  //     {
  //       text: "Anuluj",
  //       onPress: () => console.log("Anulowane"),
  //     },
  //     {
  //       text: "Dodaj komentarz",
  //       onPress: () => {
  //         setDetailsForExtraInfo((prev) => ({
  //           ...prev,
  //           section,
  //           sectionNumber,
  //         }));
  //       },
  //     },
  //   ]);
  // };
  return (
    <View style={styles.container}>
      <ActivityIndicator
        animating={progress}
        size="large"
        color="#0000ff"
        style={[styles.progress, progress ? { zIndex: 999 } : { zIndex: 0 }]}
      />
      <View style={styles.wrapper}>
        <Text style={styles.title}>Sektory</Text>

        <SectionDetailContext.Provider value={{ extraInfo, setExtraInfo }}>
          <HandleToggleSectionTakenStateContext.Provider value={{ handleToggleSectionTakenState }}>
            <AddExtraInfoContext.Provider value={{ addExtraInfo }}>
              <Table styles={styles} data={sectorData} />
            </AddExtraInfoContext.Provider>
          </HandleToggleSectionTakenStateContext.Provider>
        </SectionDetailContext.Provider>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#a8a8a8",
  },
  wrapper: {
    margin: 20,
    marginTop: 50,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#ffffff",
  },
  progress: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  tableContainer: {
    borderColor: "#f0f0f0",
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    marginBottom: 10,
  },
  tableSectionContainer: {
    borderBottomColor: "#f0f0f0",
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  tableTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tableSectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#808080",
  },
  tableWrapper: {
    marginLeft: 15,
    borderRadius: 10,
  },
  tableContentWrapper: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    justifyContent: "space-between",
    backgroundColor: "#f2f2f2",
  },
  commentsContainer: {
    position: "absolute",
    height: 200,
    width: Dimensions.get("screen").width / 1.5,
    margin: 20,
    padding: 5,
    top: 0,
    left: 0,
    right: 0,
    bottom: 50,
    backgroundColor: "#ffffff",
    borderRadius: 10,
  },
  commentsInput: {
    height: 150,
  },
  free: {
    color: "#40c204",
  },
  taken: {
    color: "#ed1140",
  },
  freeBorder: {
    borderColor: "#40c204",
  },
  takenBorder: {
    borderColor: "#ed1140",
  },
  btn: {
    width: 100,
    height: 40,
    borderRadius: 5,
    marginTop: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    fontWeight: "bold",
  },
  textInput: {
    borderBottomColor: "#e0e0e0",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
});
