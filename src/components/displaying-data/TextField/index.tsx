interface Props {
  title: string;
  text: string[];
  sessionIds: string[];
}

const TextWithTitle: React.FC<Props> = ({ title, text, sessionIds }) => {
  return (
    <div className="text-with-title">
      <h2 className="title">{title}</h2>
      <div className="text">
        {text.map((t, i) => (
          <p key={i}>{sessionIds[i]}<br/>{t}</p>
        ))}
      </div>
    </div>
  );
};

export default TextWithTitle;
