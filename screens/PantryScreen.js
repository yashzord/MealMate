import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet
} from 'react-native';
import { db, auth } from '../firebase';
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  Timestamp
} from 'firebase/firestore';

export default function PantryScreen() {
  const [items, setItems]     = useState([]);
  const [name, setName]       = useState('');
  const [qty, setQty]         = useState('');
  const [expires, setExpires] = useState('');

  useEffect(() => {
    const q = query(
      collection(db, 'pantry'),
      where('uid', '==', auth.currentUser.uid)
    );
    const unsub = onSnapshot(q, snap =>
      setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    );
    return unsub;
  }, []);

  const handleAdd = async () => {
    if (!name || !qty || !expires) return;
    await addDoc(collection(db, 'pantry'), {
      uid: auth.currentUser.uid,
      name,
      qty: Number(qty),
      expires: Timestamp.fromDate(new Date(expires)),
      createdAt: Timestamp.now()
    });
    setName(''); setQty(''); setExpires('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Pantry</Text>
      <FlatList
        data={items}
        keyExtractor={i => i.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>
              {item.name} — Qty: {item.qty} — Exp:{' '}
              {item.expires.toDate().toLocaleDateString()}
            </Text>
          </View>
        )}
      />
      <TextInput
        style={styles.input}
        placeholder="Item name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantity"
        keyboardType="numeric"
        value={qty}
        onChangeText={setQty}
      />
      <TextInput
        style={styles.input}
        placeholder="Expiry (YYYY-MM-DD)"
        value={expires}
        onChangeText={setExpires}
      />
      <Button title="Add to Pantry" onPress={handleAdd} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:16 },
  header: { fontSize:24, marginBottom:16 },
  input: {
    borderWidth:1, borderRadius:4, padding:8, marginVertical:4
  },
  item: {
    padding:8, borderBottomWidth:1, borderColor:'#ddd'
  }
});
