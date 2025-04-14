import { redirect } from "next/navigation";

const Home: React.FC = () => {
  redirect('/login')
}

export default Home;