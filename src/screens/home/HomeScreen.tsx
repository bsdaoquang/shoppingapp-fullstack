import {Section} from '@bsdaoquang/rncomponent';
import React from 'react';
import {Container, TextComponent} from '../../components';
import {FlatList} from 'react-native';

const HomeScreen = () => {
  return (
    <Container
      isScroll={false}
      back
      title="Home screen"
      right={<TextComponent text="Search" />}>
      <FlatList
        data={Array.from({length: 20})}
        renderItem={({item, index}) => (
          <Section key={`item${index}`}>
            <TextComponent text="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt nihil asperiores quia tenetur alias architecto rerum at fuga saepe placeat, nisi distinctio, minus earum reiciendis error ab accusantium iusto odio." />
          </Section>
        )}
      />
    </Container>
  );
};

export default HomeScreen;
