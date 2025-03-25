import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const socket = io("https://deciduous-incongruous-herring.glitch.me/");


const LivePage = () => {
    const [boards, setBoards] = useState(Array(3).fill('').map(() => ({ grid: Array(9).fill(""), blocked: false })));
    const [isMyTurn, setIsMyTurn] = useState(false);
    const [roomId, setRoomId] = useState("");
    const [gameState, setGameState] = useState<"searching" | "playing">("searching");
    const navigate = useNavigate();

    useEffect(() => {
        socket.connect();
        socket.emit("joinGame");

        socket.on("gameStart", (data: { roomId: string; firstTurn: string }) => {
            setRoomId(data.roomId);
            setGameState("playing");
            setIsMyTurn(socket.id === data.firstTurn);
        });

        socket.on("updateBoards", (data: { boards: any[]; nextTurn: string }) => {
            setBoards(data.boards);
            setIsMyTurn(socket.id === data.nextTurn);
        });

        socket.on("gameOver", (data: { loser: string }) => {
            alert(data.loser === socket.id ? "You Lost!" : "You Won!");
            resetGame();
        });

        socket.on("opponentDisconnected", () => {
            alert("Opponent Disconnected! Searching for new match...");
            resetGame();
        });

        return () => { socket.disconnect(); };
    }, []);

    const handleMove = (boardIndex: number, cellIndex: number) => {
        if (!isMyTurn || boards[boardIndex].blocked || boards[boardIndex].grid[cellIndex] !== "" || !roomId) return;
        socket.emit("makeMove", { roomId, boardIndex, cellIndex });
    };

    const resetGame = () => {
        setBoards(Array(3).fill('').map(() => ({ grid: Array(9).fill(""), blocked: false })));
        setGameState("searching");
        socket.emit("joinGame");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4 relative">
            <Navbar/>
            {gameState === "playing" ? (
                <>
                    <div className="text-red-500 text-4xl mb-4 font-['VT323']">
                        {isMyTurn ? "Your Turn" : "Opponent's Turn"}
                    </div>
                    
                    <div className="flex flex-wrap justify-center gap-8 pb-8 max-w-full overflow-auto">
                        {boards.map((board, boardIndex) => (
                            <div 
                                key={boardIndex}
                                className={`w-80 h-80 flex flex-wrap bg-black ${
                                    board.blocked ? "opacity-50 pointer-events-none" : ""
                                }`}
                            >
                                {board.grid.map((cell, cellIndex) => (
                                    <button
                                        key={cellIndex}
                                        className="w-1/3 h-1/3 flex items-center justify-center border border-gray-300 bg-black 
                                            text-red-500 text-6xl font-['VT323'] disabled:opacity-70 disabled:cursor-not-allowed
                                            hover:bg-gray-800 transition-colors"
                                        onClick={() => handleMove(boardIndex, cellIndex)}
                                        disabled={!isMyTurn || board.blocked || cell !== ""}
                                    >
                                        {cell}
                                    </button>
                                ))}
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    <div className="text-white text-2xl font-['VT323']">
                        Searching for opponent...
                    </div>
                </div>
            )}
           
            <div className="fixed bottom-0 w-full bg-red-500 py-3 text-center font-['VT323']">
                <button
                    onClick={()=>navigate("/")} // route back to home page
                    className="text-white text-3xl font-['VT323'] hover:opacity-80 transition-opacity"
                >
                    Leave
                </button>
            </div>
        </div>
    );
};

export default LivePage;