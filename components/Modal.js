import React, { useState } from "react";
import { TextInput, Button, View } from "react-native";
import Modal from "react-native-modal";

export default function CommentModal({
  styles,
  showAddCommentSection,
  setShowAddCommentSection,
  detailsForExtraInfo,
  setDetailsForExtraInfo,
  addExtraInfo,
}) {
  return (
    <Modal
      animationIn="slideInUp"
      animationOut="slideOutDown"
      isVisible={showAddCommentSection}
      style={styles.commentsContainer}
      onBackdropPress={() => {
        setShowAddCommentSection((prev) => !prev);
        setDetailsForExtraInfo({
          section: null,
          sectionNumber: null,
          extraInfo: "",
          action: "ChangeNote",
        });
      }}
    >
      <View >
        <TextInput
          style={styles.commentsInput}
          placeholder="Your comments"
          value={detailsForExtraInfo.extraInfo}
          onChangeText={(extraInfo) =>
            setDetailsForExtraInfo((prev) => ({
              ...prev,
              extraInfo,
            }))
          }
        />
        <Button title="Dodaj komentarz" onPress={addExtraInfo} />
      </View>
    </Modal>
  );
}
