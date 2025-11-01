import { Text } from 'react-native';
import React, { FC } from 'react';
import CustomSafeAreaScrollView from '../components/global/CustomSafeAreaScrollView';

const HomeScreen: FC = () => {
  return (
    <CustomSafeAreaScrollView>
      <Text>Testing Complete</Text>
    </CustomSafeAreaScrollView>
  );
};

export default HomeScreen;
