interface CardProps {
  title: string;
  value: string;
}

const Card = ({ title, value }: CardProps) => {
  return (
    <div className="bg-neutral-800/70 rounded-xl pl-4 pt-4 pb-4 border border-neutral-700/40">
      <p>{title}</p>
      <p className="pt-2.5 text-3xl">{value}</p>
    </div>
  );
};

export default Card;
