import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to={"/"}>
      <img src="/logo.svg" className="block w-full" alt="logotipo" />
    </Link>
  );
}
