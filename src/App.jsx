import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Group from './components/Group';
import PlayerForm from './components/PlayerForm';
import PlayerCard from './components/PlayerCard';
import * as api from './services/api';

const Container = styled.div`
  display: flex;
  padding: 20px;
`;

const GroupsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  flex: 3;
`;

const Sidebar = styled.div`
  flex: 1;
  padding: 20px;
  background: #f4f5f7;
  border-radius: 8px;
  margin-left: 20px;
`;

const PlayerPool = styled.div`
  margin-top: 20px;
  padding: 10px;
  background: white;
  border-radius: 8px;
`;

function App() {
  const [players, setPlayers] = useState([]);
  const [groups, setGroups] = useState(Array(10).fill().map(() => []));

  useEffect(() => {
    loadPlayers();
  }, []);

  const loadPlayers = async () => {
    const response = await api.getPlayers();
    setPlayers(response.data);
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;
    
    // Se moveu para um grupo
    if (destination.droppableId.startsWith('group-')) {
      const groupIndex = parseInt(destination.droppableId.split('-')[1]) - 1;
      const player = players.find(p => p._id === draggableId);
      
      try {
        await api.activatePlayer(player._id);
        const newGroups = [...groups];
        newGroups[groupIndex] = [...newGroups[groupIndex], player];
        setGroups(newGroups);
        
        setPlayers(players.filter(p => p._id !== player._id));
      } catch (error) {
        console.error('Erro ao ativar jogador:', error);
      }
    }
  };

  const handleAddPlayer = async (playerData) => {
    try {
      const response = await api.addPlayer(playerData);
      setPlayers([...players, response.data]);
    } catch (error) {
      console.error('Erro ao adicionar jogador:', error);
    }
  };

  return (
    <Container>
      <DragDropContext onDragEnd={handleDragEnd}>
        <GroupsContainer>
          {groups.map((group, index) => (
            <Group
              key={index}
              groupId={index + 1}
              players={group}
            />
          ))}
        </GroupsContainer>
        <Sidebar>
          <PlayerForm onSubmit={handleAddPlayer} />
          <PlayerPool>
            <h3>Jogadores Disponíveis</h3>
            {players.map((player, index) => (
              <PlayerCard
                key={player._id}
                player={player}
                index={index}
              />
            ))}
          </PlayerPool>
        </Sidebar>
      </DragDropContext>
    </Container>
  );
}

export default App; 