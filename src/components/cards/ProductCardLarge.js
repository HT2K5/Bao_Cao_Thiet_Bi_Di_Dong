import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function ProductCardLarge({ product, onPress, onAddToCart }) {
  return (
    <TouchableOpacity
      activeOpacity={0.95}
      style={styles.container}
      onPress={() => onPress?.(product)}
    >
      <Image source={product.image} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.origin}>{product.origin?.toUpperCase()}</Text>

        <Text style={styles.name}>{product.name}</Text>

        <View style={styles.bottomRow}>
          <View>
            <Text style={styles.price}>{product.price.toFixed(1)}$</Text>

            <Text style={styles.unit}>{product.unit}</Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => onAddToCart?.(product)}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 24,
    backgroundColor: '#f7f7f7',
    borderRadius: 24,
    overflow: 'hidden',
  },

  image: {
    width: '100%',
    height: 240,
    resizeMode: 'cover',
  },

  content: {
    padding: 16,
  },

  origin: {
    fontSize: 11,
    color: '#777',
    fontWeight: '600',
  },

  name: {
    marginTop: 4,
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
  },

  bottomRow: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  price: {
    color: '#1B5E20',
    fontWeight: '700',
    fontSize: 20,
  },

  unit: {
    marginTop: 2,
    fontSize: 12,
    color: '#777',
  },

  button: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#1B5E20',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },
});
