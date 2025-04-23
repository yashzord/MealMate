import React, { useState, useEffect } from 'react';
import {
  View,
  Platform,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import {
  Card,
  Text,
  TextInput,
  Button,
  FAB,
  Portal,
  Modal,
  Title
} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { db, auth } from '../firebase';
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  Timestamp
} from 'firebase/firestore';

export default function PantryScreen({ navigation }) {
  const [items, setItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [qty, setQty] = useState('');
  const [date, setDate] = useState(new Date());

  // Listen for pantry items
  useEffect(() => {
    const q = query(
      collection(db, 'pantry'),
      where('uid', '==', auth.currentUser.uid)
    );
    return onSnapshot(q, snap =>
      setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    );
  }, []);

  const handleAdd = async () => {
    if (!name || !qty) return;
    await addDoc(collection(db, 'pantry'), {
      uid: auth.currentUser.uid,
      name,
      qty: Number(qty),
      expires: Timestamp.fromDate(date),
      createdAt: Timestamp.now()
    });
    setName(''); setQty(''); setDate(new Date());
    setModalVisible(false);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.select({ ios: 'padding', android: null })}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Title style={styles.header}>My Pantry</Title>

        {items.map(item => (
          <Card key={item.id} style={styles.card}>
            <Card.Content>
              <Text>
                {item.name} — Qty: {item.qty} — Exp: {item.expires.toDate().toLocaleDateString()}
              </Text>
            </Card.Content>
          </Card>
        ))}

        <Portal>
          <Modal
            visible={modalVisible}
            onDismiss={() => setModalVisible(false)}
            contentContainerStyle={styles.modal}
          >
            <TextInput
              label="Item Name"
              mode="outlined"
              value={name}
              onChangeText={setName}
              style={styles.input}
            />
            <TextInput
              label="Quantity"
              mode="outlined"
              keyboardType="number-pad"
              value={qty}
              onChangeText={setQty}
              style={styles.input}
            />
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={(_, d) => d && setDate(d)}
              style={{ width: '100%', marginVertical: 8 }}
            />
            <Button mode="contained" onPress={handleAdd}>
              Add to Pantry
            </Button>
          </Modal>
        </Portal>
      </ScrollView>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 80
  },
  header: {
    marginBottom: 16,
    textAlign: 'center'
  },
  card: {
    marginBottom: 12
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8
  },
  input: {
    marginBottom: 12
  }
});
