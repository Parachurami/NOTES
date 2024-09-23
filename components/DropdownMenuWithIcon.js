import React, { useState } from 'react';
import { View, TouchableOpacity, Modal, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Assuming you're using Expo

const DropdownMenuWithIcon = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  const options = [
    { label: 'Option 1', value: 'option1', icon: 'home' },
    { label: 'Option 2', value: 'option2', icon: 'work' },
    { label: 'Option 3', value: 'option3', icon: 'star' },
  ];

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSelectOption = (value) => {
    setSelectedValue(value);
    setShowDropdown(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownButton}>
        {selectedValue ? (
          <MaterialIcons name={selectedValue.icon} size={24} color="black" />
        ) : (
          <Text>Select an option</Text>
        )}
        <MaterialIcons name="arrow-drop-down" size={24} color="black" />
      </TouchableOpacity>
      <Modal visible={showDropdown} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          {options.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={styles.option}
              onPress={() => handleSelectOption(option)}>
              <MaterialIcons name={option.icon} size={24} color="black" />
              <Text style={styles.optionLabel}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
  },
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  optionLabel: {
    marginLeft: 10,
  },
});

export default DropdownMenuWithIcon;
