import styles from "./IconBar.module.css";
export default function IconBar({
  value,
  max,
  icon,
}: {
  value: number;
  max: number;
  icon: React.ReactNode;
}) {
  return (
    <div
      className={styles.IconBar}
      title={`
      ${value}/${max}`}
    >
      {Array.from({ length: max }, (x, i) => (
        <div data-lost={i < value} key={i}>{icon}</div>
      ))}
    </div>
  );
}
