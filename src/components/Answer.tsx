type AnswerProps = {
    value: number;
    onClick: (value: number) => void;
}

export function Answer({ value, onClick } : AnswerProps) {
    return (
        <li
        onClick={() => onClick(value)}
        className="bg-black
      text-white p-6 text-sm rounded-sm
        w-48 text-center cursor-pointer">{value}</li>
    );
}