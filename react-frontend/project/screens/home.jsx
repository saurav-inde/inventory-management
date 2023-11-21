// HomeScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Card, Button } from 'react-native-paper';

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products after authentication
    fetch('http://172.16.6.100:3000/api/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <View>
      {/* <Text>Welcome to the Home Screen!</Text> */}
      <FlatList
        data={products}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2} // Set the number of columns for a grid layout
        renderItem={({ item }) => (
          <Card style={{ margin: 8, flex: 1 }}>
            <Card.Content>
              <Text>{item.name}</Text>
              <Text>{item.price}</Text>
              <Text>{item.availableQuantity}</Text>
            </Card.Content>
            <Card.Actions style={{ justifyContent: 'center' }}>
              <Button
                mode="contained"
                color="black"
                style={{ borderRadius: 0, width: '100%' }}
                onPress={() => console.log('Add to Cart')}
              >
                Add to Cart
              </Button>
            </Card.Actions>
          </Card>
        )}
      />
    </View>
  );
};

export default HomeScreen;
