import React from 'react';
import styled from 'styled-components';

const classColors = {
  melee: '#ff4444',
  tank: '#8B4513',
  healer: '#90EE90',
  arco: '#4682B4',
  fire: '#FF8C00',
  desruptor: '#9370DB'
};

const classIcons = {
  melee: '⚔️',
  tank: '🛡️',
  healer: '💚',
  arco: '🏹',
  fire: '🔥',
  desruptor: '💫'
};

const Card = styled.div`
  padding: 10px;
  margin: 5px;
  background-color: ${props => classColors[props.playerClass]};
  border-radius: 5px;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PlayerCard = ({ player, isDragging }) => {
  return (
    <Card playerClass={player.class} isDragging={isDragging}>
      <span>{classIcons[player.class]}</span>
      <div>
        <div>{player.nickname}</div>
        <small>{player.primaryWeapon} / {player.secondaryWeapon}</small>
      </div>
    </Card>
  );
};

export default PlayerCard; 