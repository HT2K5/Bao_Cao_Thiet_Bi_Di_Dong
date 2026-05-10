import React from 'react';

import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function ProductCardSmall({ product, onPress, onAddToCart }) {
  const imageUrl = product?.image?.startsWith('http')
    ? product.image
    : `http://192.168.1.5/farmdirect/images/${product.image}`;

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={() => onPress?.(product)}
    >
      <Image
        source={{
          uri: imageUrl,
        }}
        style={styles.image}
      />

      <Text style={styles.origin}>{product.origin?.toUpperCase()}</Text>

      <Text numberOfLines={2} style={styles.name}>
        {product.name}
      </Text>

      <View style={styles.footer}>
        <View>
          <Text style={styles.price}>{Number(product.price).toFixed(1)}$</Text>

          <Text style={styles.unit}>{product.unit}</Text>
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => onAddToCart?.(product)}
        >
          <Text style={styles.plus}>+</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',

    backgroundColor: '#fff',

    borderRadius: 18,

    padding: 10,
    margin: 8,

    shadowColor: '#000',

    shadowOpacity: 0.05,

    shadowRadius: 8,

    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 3,
  },

  image: {
    width: '100%',
    height: 120,

    borderRadius: 14,

    resizeMode: 'cover',

    backgroundColor: '#eee',
  },

  origin: {
    marginTop: 8,

    fontSize: 10,

    color: '#888',

    fontWeight: '600',
  },

  name: {
    marginTop: 4,

    fontSize: 14,

    fontWeight: '700',

    color: '#222',

    minHeight: 40,
  },

  footer: {
    marginTop: 10,

    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',
  },

  price: {
    color: '#1B5E20',

    fontSize: 16,

    fontWeight: '700',
  },

  unit: {
    fontSize: 11,

    color: '#777',
  },

  addButton: {
    width: 30,
    height: 30,

    borderRadius: 15,

    backgroundColor: '#1B5E20',

    justifyContent: 'center',

    alignItems: 'center',
  },

  plus: {
    color: '#fff',

    fontSize: 18,

    fontWeight: '700',
  },
});
