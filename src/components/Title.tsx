import "./Title.css";

interface TitleProps {
  str: string;
}

export const Title = ({ str }: TitleProps) => {
  return (
    <h1 className="app-title">{str}</h1>
  );
};
