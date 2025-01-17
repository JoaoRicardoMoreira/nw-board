import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import PlayerCard from './PlayerCard';

const GroupContainer = styled.div`
  background: #f4f5f7;
  border-radius: 8px;
  width: 250px;
  padding: 8px;
  margin: 8px;
`;

const Title = styled.h3`
  padding: 8px;
  background: #2c3e50;
  color: white;
  border-radius: 4px;
  margin-bottom: 8px;
`;

const PlayerList = styled.div`
  min-height: 100px;
  background: ${props => props.isDraggingOver ? '#e2e4e9' : 'white'};
  border-radius: 4px;
  padding: 8px;
`;

const Group = ({ groupId, players }) => {
  return (
    <GroupContainer>
      <Title>Grupo {groupId}</Title>
      <Droppable droppableId={`group-${groupId}`}>
        {(provided, snapshot) => (
          <PlayerList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {players.map((player, index) => (
              <PlayerCard key={player._id} player={player} index={index} />
            ))}
            {provided.placeholder}
          </PlayerList>
        )}
      </Droppable>
    </GroupContainer>
  );
};

export default Group; 