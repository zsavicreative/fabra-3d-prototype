import ThreeScene from "../components/ThreeScene";
import UserInterface from "../components/UserInterface";

export default function Home() {
  return (
    <main className='w-full min-h-screen'>
      <UserInterface />
      <ThreeScene />
    </main>
  );
}
