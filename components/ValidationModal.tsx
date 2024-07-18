import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CheckIcon, CloseIcon } from "./IconComponent";

interface ValidationModalProps {
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
}

const ValidationModal: React.FC<ValidationModalProps> = ({
  isVisible,
  onConfirm,
  onCancel,
  message,
}) => {
  return (
    <Modal transparent={true} visible={isVisible} animationType="fade" onRequestClose={onCancel}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>{message}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onConfirm} style={styles.confirmButton}>
              <CheckIcon size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
              <CloseIcon size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 30,
    marginTop: 10,
  },
  confirmButton: {
    padding: 10,
    backgroundColor: "#008000",
    borderRadius: 5,
    marginRight: 10,
  },
  cancelButton: {
    padding: 10,
    backgroundColor: "#FF3B30",
    borderRadius: 5,
  },
});

export default ValidationModal;
