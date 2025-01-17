import React, { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  background: white;
  border-radius: 8px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Select = styled.select`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  background: #2c3e50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const PlayerForm = ({ onSubmit }) => {
  const [player, setPlayer] = useState({
    nickname: '',
    class: 'melee',
    primaryWeapon: 'espada_escudo',
    secondaryWeapon: 'lanca'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(player);
    setPlayer({
      nickname: '',
      class: 'melee',
      primaryWeapon: 'espada_escudo',
      secondaryWeapon: 'lanca'
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        placeholder="Nickname"
        value={player.nickname}
        onChange={e => setPlayer({...player, nickname: e.target.value})}
      />
      <Select
        value={player.class}
        onChange={e => setPlayer({...player, class: e.target.value})}
      >
        {['melee', 'tank', 'healer', 'arco', 'fire', 'desruptor'].map(c => (
          <option key={c} value={c}>{c}</option>
        ))}
      </Select>
      <Select
        value={player.primaryWeapon}
        onChange={e => setPlayer({...player, primaryWeapon: e.target.value})}
      >
        {['espada_escudo', 'lanca', 'machadinha', 'martelo', 'machado', 'fire', 'ice', 'void', 'lifestaf', 'flail', 'bacamarte', 'mosquete'].map(w => (
          <option key={w} value={w}>{w}</option>
        ))}
      </Select>
      <Select
        value={player.secondaryWeapon}
        onChange={e => setPlayer({...player, secondaryWeapon: e.target.value})}
      >
        {['espada_escudo', 'lanca', 'machadinha', 'martelo', 'machado', 'fire', 'ice', 'void', 'lifestaf', 'flail', 'bacamarte', 'mosquete'].map(w => (
          <option key={w} value={w}>{w}</option>
        ))}
      </Select>
      <Button type="submit">Adicionar Jogador</Button>
    </Form>
  );
};

export default PlayerForm; 