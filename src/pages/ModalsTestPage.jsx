import React, { useState } from 'react';
import BoardConfigModal from '../components/modals/BoardConfigModal';
import DifficultyModal from '../components/modals/DifficultyModal';
import PlayerNamesModal from '../components/modals/PlayerNamesModal';
import TutorialModal from '../components/modals/TutorialModal';
import WinnerModal from '../components/modals/WinnerModal';

const ModalsTestPage = () => {
  const [isBoardConfigVisible, setIsBoardConfigVisible] = useState(false);
  const [isDifficultyVisible, setIsDifficultyVisible] = useState(false);
  const [isPlayerNamesVisible, setIsPlayerNamesVisible] = useState(false);
  const [isTutorialVisible, setIsTutorialVisible] = useState(false);
  const [isWinnerVisible, setIsWinnerVisible] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <h1 className="text-4xl text-cyan-400 font-['VT323'] mb-8 text-center">Modal Testing Page</h1>
      
      <div className="max-w-md mx-auto space-y-4">
        <button
          onClick={() => setIsBoardConfigVisible(true)}
          className="w-full p-4 bg-cyan-600 text-white rounded font-['VT323'] text-xl hover:bg-cyan-500"
        >
          Show Board Config Modal
        </button>

        <button
          onClick={() => setIsDifficultyVisible(true)}
          className="w-full p-4 bg-cyan-600 text-white rounded font-['VT323'] text-xl hover:bg-cyan-500"
        >
          Show Difficulty Modal
        </button>

        <button
          onClick={() => setIsPlayerNamesVisible(true)}
          className="w-full p-4 bg-cyan-600 text-white rounded font-['VT323'] text-xl hover:bg-cyan-500"
        >
          Show Player Names Modal
        </button>

        <button
          onClick={() => setIsTutorialVisible(true)}
          className="w-full p-4 bg-cyan-600 text-white rounded font-['VT323'] text-xl hover:bg-cyan-500"
        >
          Show Tutorial Modal
        </button>

        <button
          onClick={() => setIsWinnerVisible(true)}
          className="w-full p-4 bg-cyan-600 text-white rounded font-['VT323'] text-xl hover:bg-cyan-500"
        >
          Show Winner Modal
        </button>
      </div>

      {/* Modals */}
      <BoardConfigModal
        visible={isBoardConfigVisible}
        currentBoards={3}
        currentSize={3}
        onConfirm={(boards, size) => {
          console.log('Board Config:', { boards, size });
          setIsBoardConfigVisible(false);
        }}
        onCancel={() => setIsBoardConfigVisible(false)}
      />

      <DifficultyModal
        visible={isDifficultyVisible}
        onSelect={(level) => {
          console.log('Selected Level:', level);
          setIsDifficultyVisible(false);
        }}
        onClose={() => setIsDifficultyVisible(false)}
      />

      <PlayerNamesModal
        visible={isPlayerNamesVisible}
        onSubmit={(player1, player2) => {
          console.log('Players:', { player1, player2 });
          setIsPlayerNamesVisible(false);
        }}
      />

      <TutorialModal
        visible={isTutorialVisible}
        onClose={() => setIsTutorialVisible(false)}
      />

      <WinnerModal
        visible={isWinnerVisible}
        winner="Player 1"
        onPlayAgain={() => {
          console.log('Play Again clicked');
          setIsWinnerVisible(false);
        }}
        onMenu={() => {
          console.log('Main Menu clicked');
          setIsWinnerVisible(false);
        }}
      />
    </div>
  );
};

export default ModalsTestPage;
