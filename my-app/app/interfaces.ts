export interface Quiz {
    id: number;
    public: boolean;
    created_at: string;
    questions: {
        decoy: string;
        answer: string;
        question: string;
    }[];
    user_id: string;
    name: string;
    globalPlays: string;
    description: string;
}


export interface QuizQuestionProps {
    handleDeleteQ: () => void;
    handleAddQ: () => void;
    updateMode: boolean;
    displayList: boolean;
    randomArray: any[]; // Update this type to match the actual type
    attempted: boolean;
    currentQIndex: number;
    responseMessage: string;
    handleScore: (score: number) => void;
    score: any[];
    handleEditTyping: (event: React.ChangeEvent<HTMLInputElement>) => void;
    updatedQuizData: any; // Update this type to match the actual type
}
